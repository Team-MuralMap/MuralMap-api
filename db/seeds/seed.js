const format = require("pg-format");
const db = require("../connection");

const seed = ({ data }) => {
  return db
    .query(`DROP TABLE IF EXISTS commentsLikes;`)
    .then(() => db.query(`DROP TABLE IF EXISTS postLikes;`))
    .then(() => db.query(`DROP TABLE IF EXISTS visitsJunction;`))
    .then(() => db.query(`DROP TABLE IF EXISTS comments;`))
    .then(() => db.query(`DROP TABLE IF EXISTS posts;`))
    .then(() => db.query(`DROP TABLE IF EXISTS sites;`))
    .then(() => db.query(`DROP TABLE IF EXISTS users;`))

    .then(() =>
      db.query(`
        CREATE TABLE users (
          user_id INT SERIAL PRIMARY KEY,
          username VARCHAR NOT NULL,
          name VARCHAR NOT NULL,
          avatar_url VARCHAR NOT NULL DEFAULT 'https://images.pexels.com/photos/97050/pexels-photo-97050.jpeg?w=700&h=700'
        );`)
    )
    .then(() =>
      db.query(`
        CREATE TABLE sites (
          site_id SERIAL PRIMARY KEY,
          author_id INT NOT NULL REFERENCES users (user_id),
          latitude DOUBLE NOT NULL,
          longitude DOUBLE NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        );`)
    )
    .then(() =>
      db.query(`
        CREATE TABLE posts (
          post_id SERIAL PRIMARY KEY,
          author_id INT NOT NULL REFERENCES users (user_id),
          latitude DOUBLE NOT NULL,
          longitude DOUBLE NOT NULL,
          body VARCHAR,
          created_at TIMESTAMP DEFAULT NOW()
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
          reply_to INT REFERENCES comments (comment_id)
        );`)
    )
    .then(() => {
      const postLikesTablePromise = db.query(`
        CREATE TABLE postLikes (
          like_id SERIAL PRIMARY KEY,
          post_id INT REFERENCES posts (post_id),
          user_id INT REFERENCES users (user_id)
        );`);
      const visitsJunctionTablePromise = db.query(`
        CREATE TABLE postLikes (
          visit_id SERIAL PRIMARY KEY,
          post_id INT REFERENCES posts (post_id),
          user_id INT REFERENCES users (user_id)
        );`);
      const commentLikesTablePromise = db.query(`
        CREATE TABLE postLikes (
          like_id SERIAL PRIMARY KEY,
          comment_id INT REFERENCES comments (comment_id),
          user_id INT REFERENCES users (user_id)
        );`);
      return Promise.all([
        postLikesTablePromise,
        visitsJunctionTablePromise,
        commentLikesTablePromise,
      ]);
    });

  // .then(() => {
  //   const insertUsersQuery = format(
  //     "INSERT INTO users (username, name, avatar_url)"
  //   );
  // });
};

module.exports = seed;
