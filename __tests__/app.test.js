const app = require('../app');
const request = require('supertest');

describe('GET /api/users', () => {
    test('returns array of user objects with correct properties', () => {
        return request(app)
        .get('/api/users')
        .expect(200)
        .then((response) => {
            const users = response.body.users;

            expect(Array.isArray(users)).toBe(users);

            for(user of users) {
                expect(user).toMatchObject({
                    user_id: expect.any(Number),
                    username: expect.any(String),
                    avatar_url: expect.any(String)
                });
            }
        })
    });
});

describe('GET /api/sites', () => {
    test('returns array of site objects with correct properties', () => {
        return request(app)
        .get('/api/sites')
        .expect(200)
        .then((response) => {
            const sites = response.body.sites;

            expect(Array.isArray(sites)).toBe(sites);

            for(site of sites) {
                expect(site).toMatchObject({
                    site_id: expect.any(Number),
                    latitude: expect.any(Number),
                    longitude: expect.any(Number),
                    author: expect.any(String)
                });
            }
        })
    });
});

describe('GET /api/posts', () => {
    test('returns array of post objects with correct properties', () => {
        return request(app)
        .get('/api/posts')
        .expect(200)
        .then((response) => {
            const posts = response.body.posts;

            expect(Array.isArray(posts)).toBe(posts);

            for(post of posts) {
                expect(post).toMatchObject({
                    post_id: expect.any(Number),
                    author: expect.any(String),
                    photo_url: expect.any(String),
                    latitude: expect.any(Number),
                    longitude: expect.any(Number),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    site_id: expect.any(Number)
                });
            }
        })
    });
});

describe('GET /api/posts/:post_id/comments', () => {
    test('returns array of comment objects belonging to a post with correct properties', () => {
        return request(app)
        .get('/api/posts/1/comments')
        .expect(200)
        .then((response) => {
            const comments = response.body.comments;

            expect(Array.isArray(comments)).toBe(comments);

            for(comment of comments) {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    author: expect.any(String),
                    post_id: expect.any(Number),
                    body: expect.any(String),
                    created_at: expect.any(String),
                    reply_to: expect.any(String)
                });
            }
        })
    });
});