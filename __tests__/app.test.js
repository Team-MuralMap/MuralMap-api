const matchers = require("jest-extended");
expect.extend(matchers);
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
      .get("/api/users/12345")
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

describe("GET /api/users/:user_id/postlikes", () => {
  test("returns array of postlike ids given a user", () => {
    return request(app)
      .get("/api/users/1/postlikes")
      .expect(200)
      .then((response) => {
        const likes = response.body.likes;

        expect(Array.isArray(likes)).toBe(true);
        for (const like of likes) {
          expect(like).toMatchObject({
            like_id: expect.any(Number),
            post_id: expect.any(Number),
            user_id: 1,
          });
        }
      });
  });

  test("returns 404 error message if user ID does not exist", () => {
    return request(app)
      .get("/api/users/12345/postlikes")
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });

  test("returns 400 error message if given ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/users/hello/postlikes")
      .expect(400)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
});

describe("GET /api/users/:user_id/postlikes/:post_id", () => {
  test("returns a postlike id given a user and post id", () => {
    return request(app)
      .get("/api/users/1/postlikes/4")
      .expect(200)
      .then((response) => {
        const like = response.body.like;

        expect(like).toMatchObject({
          like_id: expect.any(Number),
          post_id: 4,
          user_id: 1,
        });
      });
  });

  test("returns 404 error message if user ID does not exist", () => {
    return request(app)
      .get("/api/users/12345/postlikes/1")
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });

  test("returns 400 error message if user ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/users/hello/postlikes/1")
      .expect(400)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });

  test("returns 404 error message if post ID does not exist", () => {
    return request(app)
      .get("/api/users/1/postlikes/99481")
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });

  test("returns 400 error message if post ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/users/1/postlikes/hello")
      .expect(400)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
});

describe("GET /api/users/:user_id/commentlikes", () => {
  test("returns array of commentlike ids given a user", () => {
    return request(app)
      .get("/api/users/1/commentlikes")
      .expect(200)
      .then((response) => {
        const likes = response.body.likes;

        expect(Array.isArray(likes)).toBe(true);
        for (const like of likes) {
          expect(like).toMatchObject({
            comment_like_id: expect.any(Number),
            comment_id: expect.any(Number),
            user_id: 1,
          });
        }
      });
  });

  test("returns 404 error message if user ID does not exist", () => {
    return request(app)
      .get("/api/users/12345/commentlikes")
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });

  test("returns 400 error message if user ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/users/hello/commentlikes")
      .expect(400)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
});

describe("GET /api/users/:user_id/commentlikes/:comment_id", () => {
  test("returns a commentlike id given a user and comment id ", () => {
    return request(app)
      .get("/api/users/1/commentlikes/1")
      .expect(200)
      .then((response) => {
        const like = response.body.like;

        expect(like).toMatchObject({
          comment_like_id: expect.any(Number),
          comment_id: 1,
          user_id: 1,
        });
      });
  });

  test("returns 404 error message if user ID does not exist", () => {
    return request(app)
      .get("/api/users/12345/commentlikes/1")
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });

  test("returns 400 error message if user ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/users/hello/commentlikes/1")
      .expect(400)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });

  test("returns 404 error message if post ID does not exist", () => {
    return request(app)
      .get("/api/users/1/commentlikes/99481")
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });

  test("returns 400 error message if post ID is incorrectly formatted", () => {
    return request(app)
      .get("/api/users/1/postlikes/hello")
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
          expect(site).toMatchObject({
            site_id: expect.any(Number),
            latitude: expect.any(Number),
            longitude: expect.any(Number),
          });
        }
      });
  });
  test("returns an array where each site object has a preview url", () => {
    return request(app)
      .get("/api/sites")
      .expect(200)
      .then((response) => {
        const sites = response.body.sites;

        for (const site of sites) {
          expect(site).toMatchObject({
            site_preview_url: expect.toBeOneOf([expect.any(String), null]),
          });
        }
        expect(sites.find(({ site_id }) => (site_id = 1))).toMatchObject({
          site_preview_url: expect.any(String),
        });
      });
  });
  test.todo("site_preview_url is the most popular of the site's photos");
});

describe("GET /api/sites/:site_id", () => {
  test("returns site object with given ID and correct properties", () => {
    return request(app)
      .get("/api/sites/1")
      .expect(200)
      .then((response) => {
        const site = response.body.site;

        expect(typeof site).toBe("object");

        expect(site).toMatchObject({
          site_id: 1,
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        });
      });
  });
  test("returns 404 error message if site ID does not exist", () => {
    return request(app)
      .get("/api/sites/12345")
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
  test("returns object with a preview url", () => {
    return request(app)
      .get("/api/sites/1")
      .expect(200)
      .then((response) => {
        const site = response.body.site;

        expect(site).toMatchObject({
          site_preview_url: expect.any(String),
        });
      });
  });
  test.todo("preview_url is the most popular of the site's photos");
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
            user_id: expect.any(Number),
            img_url: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            site_id: expect.any(Number),
          });
        }
      });
  });
});

describe("GET /api/posts queries: fitlering by any valid column", () => {
  test("can be filtered by site_id", () => {
    return request(app)
      .get("/api/posts?site_id=3")
      .expect(200)
      .then((response) => {
        const posts = response.body.posts;

        expect(Array.isArray(posts)).toBe(true);

        expect(posts.length >= 2).toBe(true);
        for (const post of posts) {
          expect(post).toMatchObject({
            post_id: expect.any(Number),
            user_id: expect.any(Number),
            img_url: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            site_id: 3,
          });
        }
      });
  });
  test("can be filtered by user_id", () => {
    return request(app)
      .get("/api/posts?user_id=1")
      .expect(200)
      .then((response) => {
        const posts = response.body.posts;

        expect(Array.isArray(posts)).toBe(true);

        expect(posts.length >= 3).toBe(true);
        for (const post of posts) {
          expect(post).toMatchObject({
            post_id: expect.any(Number),
            user_id: 1,
            img_url: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            site_id: expect.any(Number),
          });
        }
      });
  });
  test("can be sorted by post id and ascending order", () => {
    return request(app)
      .get("/api/posts?sort_by=post_id&&order=asc")
      .expect(200)
      .then((response) => {
        const posts = response.body.posts;
        expect(posts).toBeSortedBy("post_id", { descending: false });
      });
  });
  test("can be sorted by likes in descending order", () => {
    return request(app)
      .get("/api/posts?sort_by=likes_count&&order=Desc")
      .expect(200)
      .then((response) => {
        const posts = response.body.posts;
        expect(posts).toBeSortedBy("likes_count", { descending: true });
      });
  });
  test("ignores invalid column names with 200 response", () => {
    return request(app)
      .get("/api/posts?banana=43")
      .expect(200)
      .then((response) => {
        const posts = response.body.posts;

        expect(Array.isArray(posts)).toBe(true);

        for (const post of posts) {
          expect(post).toMatchObject({
            post_id: expect.any(Number),
            user_id: expect.any(Number),
            img_url: expect.any(String),
            body: expect.any(String),
            created_at: expect.any(String),
            site_id: expect.any(Number),
          });
        }
      });
  });
  test("fails when asc is spelt wrong", () => {
    return request(app)
      .get("/api/posts?sort_by=likes_count&&order=acs")
      .expect(400)
      .then((response) => {
        const posts = response.body.posts;
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
  test("returns 404 error message if filtering id does not exist", () => {
    return request(app)
      .get("/api/posts?user_id=4000")
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });
  test("returns 400 error message if filtering id is incorrectly formatted", () => {
    return request(app)
      .get("/api/posts?site_id=bananas")
      .expect(400)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Bad Request");
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
          user_id: expect.any(Number),
          img_url: expect.any(String),
          body: expect.any(String),
          created_at: expect.any(String),
          site_id: expect.any(Number),
        });
      });
  });
  test("returns 404 error message if post ID does not exist", () => {
    return request(app)
      .get("/api/posts/12345")
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
            user_id: expect.any(Number),
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
          comment_id: expect.any(Number),
          user_id: expect.any(Number),
          post_id: expect.any(Number),
          body: expect.any(String),
          created_at: expect.any(String),
          reply_to: expect.toBeOneOf([expect.any(Number), null]),
        });
      });
  });
  test("returns 404 error message if comment ID does not exist", () => {
    return request(app)
      .get("/api/comments/12345")
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
      email: "testuser@test.com",
      name: "Test User",
      avatar_url: "https://picsum.photos/300",
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
          email: "testuser@test.com",
          name: "Test User",
          avatar_url: "https://picsum.photos/300",
        });
      });
  });

  test("user is added to the database", () => {
    const newUser = {
      username: "test_user",
      email: "testuser@test.com",
      name: "Test User",
      avatar_url: "https://picsum.photos/300",
    };

    return request(app)
      .post("/api/users")
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
              email: "testuser@test.com",
              name: "Test User",
              avatar_url: "https://picsum.photos/300",
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
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
});

describe("POST /api/sites", () => {
  test("returns newly added site object with correct properties", () => {
    const newSite = {
      user_id: 1,
      latitude: 99999,
      longitude: 99999,
    };

    return request(app)
      .post("/api/sites")
      .send(newSite)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        const responseSite = response.body.site;

        expect(responseSite).toMatchObject({
          site_id: expect.any(Number),
          latitude: "99999",
          longitude: "99999",
        });
      });
  });

  test("site is added to the database", () => {
    const newSite = {
      user_id: 1,
      latitude: 99999,
      longitude: 99999,
    };

    return request(app)
      .post("/api/sites")
      .send(newSite)
      .set("Accept", "application/json")
      .expect(201)
      .then((response) => {
        const newSiteID = response.body.site.site_id;

        return request(app)
          .get(`/api/sites/${newSiteID}`)
          .expect(200)
          .then((response) => {
            const responseSite = response.body.site;

            expect(responseSite).toMatchObject({
              site_id: expect.any(Number),
              latitude: 99999,
              longitude: 99999,
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
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
});

describe("POST /api/posts", () => {
  test("returns newly added post object with correct properties", () => {
    const newPost = {
      user_id: 1,
      img_url: "https://picsum.photos/300",
      body: "test post",
      site_id: 1,
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
          user_id: 1,
          img_url: "https://picsum.photos/300",
          body: "test post",
          created_at: expect.any(String),
          site_id: expect.any(Number),
        });
      });
  });

  test("post is added to the database", () => {
    const newPost = {
      user_id: 1,
      img_url: "https://picsum.photos/300",
      body: "test post",
      site_id: 1,
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
              user_id: 1,
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
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
});

describe("POST /api/posts/:post_id/comments", () => {
  test("returns newly added comment object with correct properties", () => {
    const newComment = {
      user_id: 1,
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
          user_id: 1,
          post_id: 1,
          body: "test comment",
          created_at: expect.any(String),
          reply_to: null,
        });
      });
  });

  test("comment is added to the database", () => {
    const newComment = {
      user_id: 1,
      body: "testing comment",
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
            const responseComment = response.body.comment;

            expect(responseComment).toMatchObject({
              comment_id: expect.any(Number),
              user_id: 1,
              post_id: 1,
              body: "testing comment",
              created_at: expect.any(String),
              reply_to: null,
            });
          });
      });
  });

  test("returns 404 error message if given ID does not exist", () => {
    const newComment = {
      user_id: 1,
      body: "test comment",
    };

    return request(app)
      .post("/api/posts/12345/comments")
      .send(newComment)
      .set("Accept", "application/json")
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
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
        expect(response.res.statusMessage).toBe("Bad Request");
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
      .delete("/api/users/12345")
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
      .delete("/api/sites/12345")
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
      .delete("/api/posts/12345")
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
      .delete("/api/comments/12345")
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

describe("PATCH /api/posts/:post_id", () => {
  test("responds with updated post", () => {
    const postUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/posts/1")
      .send(postUpdate)
      .expect(202)
      .then((response) => {
        const responsePost = response.body.post;

        expect(typeof responsePost).toBe("object");

        expect(responsePost).toEqual({
          post_id: 1,
          user_id: expect.any(Number),
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
      .expect(202)
      .then((response) => {
        const responsePost = response.body.post;

        expect(responsePost.body).toBe("This is an updated body.");
      });
  });

  test("returns 404 error message if given correctly formatted post ID that does not exist", () => {
    const postUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/posts/12345")
      .send(postUpdate)
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });

  test("returns 400 error message if given post ID has invalid format", () => {
    const postUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/posts/hello")
      .send(postUpdate)
      .expect(400)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
});

describe("PATCH /api/comments/:comment_id", () => {
  test("responds with updated comment", () => {
    const commentUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/comments/1")
      .send(commentUpdate)
      .expect(202)
      .then((response) => {
        const responseComment = response.body.comment;

        expect(typeof responseComment).toBe("object");

        expect(responseComment).toEqual({
          comment_id: 1,
          user_id: expect.any(Number),
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
      .expect(202)
      .then((response) => {
        const responseComment = response.body.comment;

        expect(responseComment.body).toBe("This is an updated body.");
      });
  });

  test("returns 404 error message if given correctly formatted comment ID that does not exist", () => {
    const commentUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/comments/12345")
      .send(commentUpdate)
      .expect(404)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Not Found");
      });
  });

  test("returns 400 error message if given comment ID has invalid format", () => {
    const commentUpdate = { body: "This is an updated body." };

    return request(app)
      .patch("/api/comments/hello")
      .send(commentUpdate)
      .expect(400)
      .then((response) => {
        expect(response.res.statusMessage).toBe("Bad Request");
      });
  });
});
