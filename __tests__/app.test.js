const app = require("../app");
const request = require("supertest");

const data = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");
const db = require("../db/connection");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("GET /api/users", () => {
  test("returns array of user objects with correct properties", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then((response) => {
        const users = response.body.users;

        expect(Array.isArray(users)).toBe(true);

        for (const user of users) {
          expect(user).toMatchObject({
            user_id: expect.any(Number),
            username: expect.any(String),
            avatar_url: expect.any(String),
            name: expect.any(String),
          });
        }
      });
  });
});

describe("GET /api/users/:user_id", () => {
  test("returns user object with given ID and correct properties", () => {
    return request(app)
      .get("/api/users/1")
      .expect(200)
      .then((response) => {
        const user = response.body.user;

        expect(typeof user).toBe("object");

        expect(user).toMatchObject({
          user_id: 1,
          username: expect.any(String),
          avatar_url: expect.any(String),
          name: expect.any(String),
        });
      });
  });

  test("returns 404 error message if user ID does not exist", () => {
    return request(app)
      .get("/api/users/123456789")
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });

  test("returns 400 error message if given ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/users/hello")
      .expect(400)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
});

describe("GET /api/sites", () => {
  test("returns array of site objects with correct properties", () => {
    return request(app)
      .get("/api/sites")
      .expect(200)
      .then((response) => {
        const sites = response.body.sites;

        expect(Array.isArray(sites)).toBe(true);

        for (const site of sites) {
          site.latitude = Number(site.latitude);
          site.longitude = Number(site.longitude);
          expect(site).toMatchObject({
            site_id: expect.any(Number),
            latitude: expect.any(Number),
            longitude: expect.any(Number),
            author_id: expect.any(Number),
          });
        }
      });
  });
});

describe("GET /api/sites/:site_id", () => {
  test("returns site object with given ID and correct properties", () => {
    return request(app)
      .get("/api/sites/1")
      .expect(200)
      .then((response) => {
        const site = response.body.site;
        site.latitude = Number(site.latitude);
        site.longitude = Number(site.longitude);

        expect(typeof site).toBe("object");

        expect(site).toMatchObject({
          site_id: 1,
          latitude: expect.any(Number),
          longitude: expect.any(Number),
          author_id: expect.any(Number),
        });
      });
  });
  test("returns 404 error message if site ID does not exist", () => {
    return request(app)
      .get("/api/sites/1234567898")
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });

  test("returns 400 error message if given ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/sites/hello")
      .expect(400)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
});

describe("GET /api/posts", () => {
  test("returns array of post objects with correct properties", () => {
    return request(app)
      .get("/api/posts")
      .expect(200)
      .then((response) => {
        const posts = response.body.posts;

        expect(Array.isArray(posts)).toBe(true);

        for (const post of posts) {
          expect(post).toMatchObject({
            post_id: expect.any(Number),
            author_id: expect.any(Number),
            img_url: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            site_id: expect.any(Number),
          });
        }
      });
  });
});

describe("GET /api/posts/:post_id", () => {
  test("returns post object with given ID and correct properties", () => {
    return request(app)
      .get("/api/posts/1")
      .expect(200)
      .then((response) => {
        const post = response.body.post;

        expect(typeof post).toBe("object");

        expect(post).toMatchObject({
          post_id: 1,
          author_id: expect.any(Number),
          img_url: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          site_id: expect.any(Number),
        });
      });
  });
  test("returns 404 error message if post ID does not exist", () => {
    return request(app)
      .get("/api/posts/123456789")
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });

  test("returns 400 error message if given ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/posts/hello")
      .expect(400)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
});

describe("GET /api/posts/:post_id/comments", () => {
  test("returns array of comment objects belonging to a post with correct properties", () => {
    return request(app)
      .get("/api/posts/1/comments")
      .expect(200)
      .then((response) => {
        const comments = response.body.comments;
        expect(Array.isArray(comments)).toBe(true);

        for (comment of comments) {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),
            author_id: expect.any(Number),
            post_id: 1,
            body: expect.any(String),
            created_at: expect.any(String),
          });
        }
      });
  });
});

describe("GET /api/comments/:comment_id", () => {
  test("returns comment object with given ID and correct properties", () => {
    return request(app)
      .get("/api/comments/1")
      .expect(200)
      .then((response) => {
        const comment = response.body.comment;

        expect(typeof comment).toBe("object");

        expect(comment).toMatchObject({
          comment_id: 1,
          author: expect.any(Number),
          post_id: expect.any(Number),
          body: expect.any(String),
          created_at: expect.any(String),
          reply_to: expect.toBeOneOf([expect.any(Number), null]),
        });
      });
  });
  test("returns 404 error message if comment ID does not exist", () => {
    return request(app)
      .get("/api/comments/123456789876543")
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });

  test("returns 400 error message if given ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/comments/hello")
      .expect(400)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
});

describe("POST /api/users", () => {
  test("returns newly added user object with correct properties", () => {
    const newUser = {
      username: "test_user",
      avatar_url: "https://picsum.photos/300",
      name: "Test User",
    };

    return request(app)
      .post("/api/users")
      .send(newUser)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        const responseUser = response.body.user;

        expect(responseUser).toMatchObject({
          user_id: expect.any(Number),
          username: "test_user",
          avatar_url: "https://picsum.photos/300",
          name: "Test User",
        });
      });
  });

  test("user is added to the database", () => {
    const newUser = {
      username: "test_user",
      avatar_url: "https://picsum.photos/300",
      name: "Test User",
    };

    return request(app)
      .user("/api/users")
      .send(newUser)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        const newUserID = response.body.user.user_id;

        return request(app)
          .get(`/api/users/${newUserID}`)
          .expect(200)
          .then((response) => {
            const responseUser = response.body.user;

            expect(responseUser).toMatchObject({
              user_id: expect.any(Number),
              username: "test_user",
              avatar_url: "https://picsum.photos/300",
              name: "Test User",
            });
          });
      });
  });

  test("returns 400 error message if request body has missing fields", () => {
    const newUser = {
      name: "Missing Fields",
    };

    return request(app)
      .post("/api/users")
      .send(newUser)
      .set("Accept", "application/json")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("POST /api/sites", () => {
  test("returns newly added site object with correct properties", () => {
    const newSite = {
      latitude: 99999,
      longitude: 99999,
      author_id: 1,
    };

    return request(app)
      .post("/api/sites")
      .send(newSite)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        const responseSite = response.body.post;

        expect(responseSite).toMatchObject({
          site_id: expect.any(Number),
          latitude: 99999,
          longitude: 99999,
          author_id: 1,
        });
      });
  });

  test("site is added to the database", () => {
    const newSite = {
      latitude: 99999,
      longitude: 99999,
      author_id: 1,
    };

    return request(app)
      .post("/api/sites")
      .send(newSite)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        const newSiteID = response.body.post.post_id;

        return request(app)
          .get(`/api/sites/${newSiteID}`)
          .expect(200)
          .then((response) => {
            const responseSite = response.body.post;

            expect(responseSite).toMatchObject({
              site_id: expect.any(Number),
              latitude: 99999,
              longitude: 99999,
              author_id: 1,
            });
          });
      });
  });

  test("returns 400 error message if request body has missing fields", () => {
    const newSite = {
      longitude: 99999,
    };

    return request(app)
      .post("/api/sites")
      .send(newSite)
      .set("Accept", "application/json")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("POST /api/posts", () => {
  test("returns newly added post object with correct properties", () => {
    const newPost = {
      author: 1,
      img_url: "https://picsum.photos/300",
      body: "test post",
    };

    return request(app)
      .post("/api/posts")
      .send(newPost)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        const responsePost = response.body.post;

        expect(responsePost).toMatchObject({
          post_id: expect.any(Number),
          author: 1,
          img_url: "https://picsum.photos/300",
          body: "test post",
          created_at: expect.any(String),
          site_id: expect.any(Number),
        });
      });
  });

  test("post is added to the database", () => {
    const newPost = {
      author: 1,
      img_url: "https://picsum.photos/300",
      body: "test post",
    };

    return request(app)
      .post("/api/posts")
      .send(newPost)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        const newPostID = response.body.post.post_id;

        return request(app)
          .get(`/api/posts/${newPostID}`)
          .expect(200)
          .then((response) => {
            const responsePost = response.body.post;

            expect(responsePost).toMatchObject({
              post_id: expect.any(Number),
              author: 1,
              img_url: "https://picsum.photos/300",
              body: "test post",
              created_at: expect.any(String),
              site_id: expect.any(Number),
            });
          });
      });
  });

  test("returns 400 error message if request body has missing fields", () => {
    const newPost = {
      body: "where are all the other fields???",
    };

    return request(app)
      .post("/api/posts")
      .send(newPost)
      .set("Accept", "application/json")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("POST /api/posts/:post_id/comments", () => {
  test("returns newly added comment object with correct properties", () => {
    const newComment = {
      author: 1,
      body: "test comment",
    };

    return request(app)
      .post("/api/posts/1/comments")
      .send(newComment)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        const responseComment = response.body.comment;

        expect(responseComment).toMatchObject({
          comment_id: expect.any(Number),
          author: 1,
          post_id: 1,
          body: "test comment",
          created_at: "2024-09-27T14:52:00.000Z",
          reply_to: null,
        });
      });
  });

  test("comment is added to the database", () => {
    const newComment = {
      author: 1,
      body: "test comment",
    };

    return request(app)
      .post("/api/posts/1/comments")
      .send(newComment)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        const newCommentID = response.body.comment.comment_id;

        return request(app)
          .get(`/api/comments/${newCommentID}`)
          .expect(200)
          .then((response) => {
            const responseComment = response.body.post;

            expect(responseComment).toMatchObject({
              comment_id: expect.any(Number),
              author: 1,
              post_id: 1,
              body: "test comment",
              created_at: "2024-09-27T14:52:00.000Z",
              reply_to: null,
            });
          });
      });
  });

  test("returns 404 error message if given ID does not exist", () => {
    const newComment = {
      author: 1,
      body: "test comment",
    };

    return request(app)
      .post("/api/posts/132456789056/comments")
      .send(newComment)
      .set("Accept", "application/json")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });

  test("returns 400 error message if request body has missing fields", () => {
    const newComment = {
      body: "where are all the other fields???",
    };

    return request(app)
      .post("/api/posts/1/comments")
      .send(newComment)
      .set("Accept", "application/json")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("DELETE /api/users/:user_id", () => {
  test("responds with 204 and no content", () => {
    return request(app)
      .delete("/api/users/1")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });

  test("deletes user from users table", () => {
    return request(app)
      .delete("/api/users/1")
      .expect(204)
      .then(() => {
        return request(app).get("/api/users/1").expect(404);
      });
  });

  test("returns 404 error message if user ID does not exist", () => {
    return request(app)
      .delete("/api/users/1425557834124")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });

  test("returns 400 error message if given ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/users/hello")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("DELETE /api/sites/:site_id", () => {
  test("responds with 204 and no content", () => {
    return request(app)
      .delete("/api/sites/1")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });

  test("deletes site from sites table", () => {
    return request(app)
      .delete("/api/sites/1")
      .expect(204)
      .then(() => {
        return request(app).get("/api/sites/1").expect(404);
      });
  });

  test("returns 404 error message if site ID does not exist", () => {
    return request(app)
      .delete("/api/sites/1425557834124")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });

  test("returns 400 error message if given ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/sites/hello")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("DELETE /api/posts/:post_id", () => {
  test("responds with 204 and no content", () => {
    return request(app)
      .delete("/api/posts/1")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });

  test("deletes post from posts table", () => {
    return request(app)
      .delete("/api/posts/1")
      .expect(204)
      .then(() => {
        return request(app).get("/api/posts/1").expect(404);
      });
  });

  test("returns 404 error message if post ID does not exist", () => {
    return request(app)
      .delete("/api/posts/1425557834124")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });

  test("returns 400 error message if given ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/posts/hello")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("DELETE /api/comments/:comment_id", () => {
  test("responds with 204 and no content", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then((response) => {
        expect(response.body).toEqual({});
      });
  });

  test("deletes comment from comments table", () => {
    return request(app)
      .delete("/api/comments/1")
      .expect(204)
      .then(() => {
        return request(app).get("/api/comments/1").expect(404);
      });
  });

  test("returns 404 error message if comment ID does not exist", () => {
    return request(app)
      .delete("/api/comments/1425557834124")
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });

  test("returns 400 error message if given ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/comments/hello")
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("PATCH /api/posts/:post_id", () => {
  test("responds with updated post", () => {
    const postUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/posts/1")
      .send(postUpdate)
      .expect(200)
      .then((response) => {
        const responsePost = response.body.post;

        expect(typeof responsePost).toBe("object");

        expect(responsePost).toEqual({
          post_id: 1,
          author: expect.any(Number),
          img_url: expect.any(String),
          body: "This is an updated body.",
          created_at: expect.any(String),
          site_id: expect.any(Number),
        });
      });
  });

  test("post has its body property updated", () => {
    const postUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/posts/1")
      .send(postUpdate)
      .expect(200)
      .then((response) => {
        const responsePost = response.body.post;

        expect(responsePost.body).toBe("This is an updated body.");
      });
  });

  test("returns 404 error message if given correctly formatted post ID that does not exist", () => {
    const postUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/posts/1322334432")
      .send(postUpdate)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });

  test("returns 400 error message if given post ID has invalid format", () => {
    const postUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/posts/hello")
      .send(postUpdate)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});

describe("PATCH /api/comments/:comment_id", () => {
  test("responds with updated comment", () => {
    const commentUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/comments/1")
      .send(commentUpdate)
      .expect(200)
      .then((response) => {
        const responseComment = response.body.comment;

        expect(typeof responseComment).toBe("object");

        expect(responseComment).toEqual({
          comment_id: 1,
          author: expect.any(Number),
          post_id: expect.any(Number),
          body: "This is an updated body.",
          created_at: expect.any(String),
          reply_to: expect.toBeOneOf([expect.any(Number), null]),
        });
      });
  });

  test("comment has its body property updated", () => {
    const commentUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/comments/1")
      .send(commentUpdate)
      .expect(200)
      .then((response) => {
        const responseComment = response.body.comment;

        expect(responseComment.body).toBe("This is an updated body.");
      });
  });

  test("returns 404 error message if given correctly formatted comment ID that does not exist", () => {
    const commentUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/comments/1322334432")
      .send(commentUpdate)
      .expect(404)
      .then((response) => {
        expect(response.body.msg).toBe("not found");
      });
  });

  test("returns 400 error message if given comment ID has invalid format", () => {
    const commentUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/comments/hello")
      .send(commentUpdate)
      .expect(400)
      .then((response) => {
        expect(response.body.msg).toBe("bad request");
      });
  });
});
