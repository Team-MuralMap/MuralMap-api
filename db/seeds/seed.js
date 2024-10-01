const format = require("pg-format");
const db = require("../connection");
const { convertTimestampToDate } = require("../utils/utils");

const seed = ({
  userData,
  postData,
  commentData,
  siteData,
  postLikeData,
  commentLikeData,
  visitsData,
}) => {
  return db
    .query(`DROP TABLE IF EXISTS commentLikes;`)
    .then(() => db.query(`DROP TABLE IF EXISTS postLikes;`))
    .then(() => db.query(`DROP TABLE IF EXISTS visits;`))
    .then(() => db.query(`DROP TABLE IF EXISTS comments;`))
    .then(() => db.query(`DROP TABLE IF EXISTS posts;`))
    .then(() => db.query(`DROP TABLE IF EXISTS sites;`))
    .then(() => db.query(`DROP TABLE IF EXISTS users;`))

    .then(() =>
      db.query(`
        CREATE TABLE users (
          user_id SERIAL PRIMARY KEY,
          username VARCHAR NOT NULL,
          email VARCHAR NOT NULL,
          name VARCHAR NOT NULL,
          avatar_url VARCHAR NOT NULL DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700'
        );`)
    )
    .then(
      () =>
        db.query(`
        CREATE TABLE sites (
          site_id SERIAL PRIMARY KEY,
          author_id INT NOT NULL REFERENCES users (user_id),
          latitude NUMERIC NOT NULL,
          longitude NUMERIC NOT NULL
        );`)
      //   created_at TIMESTAMP DEFAULT NOW()
    )
    .then(() =>
      db.query(`
        CREATE TABLE posts (
          post_id SERIAL PRIMARY KEY,
          img_url VARCHAR,
          author_id INT NOT NULL REFERENCES users (user_id),
          body VARCHAR,
          created_at TIMESTAMP DEFAULT NOW(),
          site_id INT NOT NULL REFERENCES sites (site_id)
        );`)
    )
    .then(() =>
      db.query(`
        CREATE TABLE comments (
          comment_id SERIAL PRIMARY KEY,
          body VARCHAR,
          post_id INT NOT NULL REFERENCES posts (post_id),
          author_id INT NOT NULL REFERENCES users (user_id),
          created_at TIMESTAMP DEFAULT NOW(),
          reply_to INT REFERENCES comments (comment_id) on delete cascade
        );`)
    )
    .then(() => {
      const postLikesTablePromise = db.query(`
        CREATE TABLE postLikes (
          like_id SERIAL PRIMARY KEY,
          post_id INT REFERENCES posts (post_id),
          user_id INT REFERENCES users (user_id)
        );`);
      const visitsTablePromise = db.query(`
        CREATE TABLE visits (
          visit_id SERIAL PRIMARY KEY,
          post_id INT REFERENCES posts (post_id),
          user_id INT REFERENCES users (user_id)
        );`);
      const commentLikesTablePromise = db.query(`
        CREATE TABLE commentLikes (
          comment_like_id SERIAL PRIMARY KEY,
          comment_id INT REFERENCES comments (comment_id),
          user_id INT REFERENCES users (user_id)
        );`);
      return Promise.all([
        postLikesTablePromise,
        visitsTablePromise,
        commentLikesTablePromise,
      ]);
    })

    .then(() => {
      const insertUsersQuery = format(
        "INSERT INTO users (username, email, name, avatar_url) VALUES %L;",
        userData.map(({ username, email, name, avatar_url }) => [
          username,
          email,
          name,
          avatar_url,
        ])
      );
      return db.query(insertUsersQuery);
    })
    .then(() => {
      const insertSitesQuery = format(
        `INSERT INTO sites (author_id, latitude, longitude)
        VALUES %L;`,
        siteData.map(({ author_id, latitude, longitude }) => [
          author_id,
          latitude,
          longitude,
        ])
      );
      return db.query(insertSitesQuery);
    })
    .then(() => {
      const formattedPostData = postData.map(convertTimestampToDate);
      const insertPostsQuery = format(
        `INSERT INTO posts (img_url, author_id, body, created_at, site_id)
      VALUES %L;`,
        formattedPostData.map(
          ({ img_url, author_id, body, created_at, site_id }) => [
            img_url,
            author_id,
            body,
            created_at,
            site_id,
          ]
        )
      );
      return db.query(insertPostsQuery);
    })
    .then(() => {
      const formattedCommentData = commentData.map(convertTimestampToDate);
      const insertCommentQuery = format(
        `INSERT INTO comments (body, post_id, author_id, created_at, reply_to)
      VALUES %L;`,
        formattedCommentData.map(
          ({ body, post_id, author_id, created_at, reply_to }) => [
            body,
            post_id,
            author_id,
            created_at,
            reply_to,
          ]
        )
      );
      return db.query(insertCommentQuery);
    })

    .then(() => {
      const insertLikesQuery = format(
        `INSERT INTO postLikes (user_id, post_id)
      VALUES %L;`,
        postLikeData.map(({ user_id, post_id }) => [user_id, post_id])
      );
      db.query(insertLikesQuery);

      const insertCommentLikesQuery = format(
        `INSERT INTO commentLikes (user_id, comment_id)
      VALUES %L;`,
        commentLikeData.map(({ user_id, comment_id }) => [user_id, comment_id])
      );
      db.query(insertLikesQuery);

      const insertVisitsQuery = format(
        `INSERT INTO visits (user_id, post_id)
      VALUES %L;`,
        visitsData.map(({ user_id, post_id }) => [user_id, post_id])
      );
      db.query(insertLikesQuery);
    });
};

module.exports = seed;
