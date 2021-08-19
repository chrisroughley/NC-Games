const request = require('supertest');
const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const app = require('../app');
const endpoints = require('../source/controllers/endpoints');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/anything', () => {
  test('status 404 - responds with route not found', async () => {
    const response = await request(app).get('/anything').expect(404);
    expect(response.body.msg).toBe('route not found');
  });
});

describe('/api', () => {
  test('GET - status 200 - responds with JSON describing all the available endpoints', async () => {
    const response = await request(app).get('/api').expect(200);
    expect(response.body.endpoints).toEqual(endpoints);
  });
});

describe('/api/categories', () => {
  test('GET - status 200 - responds with an array of categories', async () => {
    const response = await request(app).get('/api/categories').expect(200);
    expect(Array.isArray(response.body.categories)).toBe(true);
    expect(response.body.categories).toHaveLength(4);
    response.body.categories.forEach((category) => {
      expect(category).toEqual(
        expect.objectContaining({
          slug: expect.any(String),
          description: expect.any(String),
        })
      );
    });
  });
});

describe('/api/reviews/:review_id', () => {
  describe('GET', () => {
    test('GET - status 200 - responds with a review object', async () => {
      const response = await request(app).get('/api/reviews/3').expect(200);
      expect(response.body.review).toEqual({
        review_id: 3,
        title: 'Ultimate Werewolf',
        designer: 'Akihisa Okui',
        owner: 'bainesface',
        comment_count: 1,
        review_body: "We couldn't find the werewolf!",
        category: 'social deduction',
        created_at: '2021-01-18T10:01:41.251Z',
        votes: 5,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      });
    });
    test('GET - status 404 - responds with bad request: valid id type but out of range', async () => {
      const response = await request(app).get('/api/reviews/1000').expect(404);
      expect(response.body.msg).toBe(
        'bad request: valid id type but out of range'
      );
    });
    test('GET - status 400 - responds with bad request: invalid id type', async () => {
      const response = await request(app).get('/api/reviews/hello').expect(400);
      expect(response.body.msg).toBe('bad request: invalid id type');
    });
  });
  describe('PATCH', () => {
    test('PATCH - status 200 - responds with patched object', async () => {
      const response = await request(app)
        .patch('/api/reviews/3')
        .send({ inc_votes: 1 })
        .expect(200);
      expect(response.body.patchedReview).toEqual({
        review_id: 3,
        title: 'Ultimate Werewolf',
        designer: 'Akihisa Okui',
        owner: 'bainesface',
        review_body: "We couldn't find the werewolf!",
        category: 'social deduction',
        created_at: '2021-01-18T10:01:41.251Z',
        votes: 6,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      });
    });
    test('PATCH - status 404 - responds with bad request: valid id type but out of range', async () => {
      const response = await request(app)
        .patch('/api/reviews/1000')
        .send({ inc_votes: 1 })
        .expect(404);
      expect(response.body.msg).toBe(
        'bad request: valid type but out of range'
      );
    });
    test('PATCH - status 400 - responds with bad request: invalid id type', async () => {
      const response = await request(app)
        .patch('/api/reviews/hello')
        .send({ inc_votes: 1 })
        .expect(400);
      expect(response.body.msg).toBe('bad request: invalid id type');
    });
    test('PATCH - status 400 - responds with bad request: invalid request body', async () => {
      let response = await request(app)
        .patch('/api/reviews/2')
        .send({})
        .expect(400);
      expect(response.body.msg).toBe('bad request: invalid request body');
      response = await request(app)
        .patch('/api/reviews/2')
        .send({ inc_votes: 'cat' })
        .expect(400);
      expect(response.body.msg).toBe('bad request: invalid request body');
    });
    test('ignores unnecessary keys', async () => {
      const response = await request(app)
        .patch('/api/reviews/3')
        .send({ inc_votes: 1, test_key: 'test' })
        .expect(200);
      expect(response.body.patchedReview).toEqual({
        review_id: 3,
        title: 'Ultimate Werewolf',
        designer: 'Akihisa Okui',
        owner: 'bainesface',
        review_body: "We couldn't find the werewolf!",
        category: 'social deduction',
        created_at: '2021-01-18T10:01:41.251Z',
        votes: 6,
        review_img_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      });
    });
  });
});

describe('/api/reviews', () => {
  test('GET - status 200 - responds with an array of reviews', async () => {
    const response = await request(app).get('/api/reviews').expect(200);
    expect(response.body.reviews).toHaveLength(13);
    response.body.reviews.forEach((review) => {
      expect(review).toEqual({
        review_id: expect.any(Number),
        title: expect.any(String),
        owner: expect.any(String),
        category: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        review_img_url: expect.any(String),
        comment_count: expect.any(Number),
      });
      expect(review.created_at).toMatch(
        /^\d{4}-\d{2}-\d{2}\w{1}\d{2}:\d{2}:\d{2}.\d{3}Z$/
      );
    });
  });
  test('array is sorted by dates in descending order by default', async () => {
    const response = await request(app).get('/api/reviews').expect(200);
    expect(response.body.reviews).toHaveLength(13);
    expect(response.body.reviews).toBeSortedBy('created_at', {
      descending: true,
    });
  });
  test('review objects have correct comment_count', async () => {
    const response = await request(app).get('/api/reviews').expect(200);
    expect(response.body.reviews[5].comment_count).toBe(3);
    expect(response.body.reviews[6].comment_count).toBe(0);
    expect(response.body.reviews[7].comment_count).toBe(3);
  });
});

describe('/api/reviews?sort_by', () => {
  test('GET - status 200 - responds with an array of reviews sorted by column in query', async () => {
    const response = await request(app)
      .get('/api/reviews?sort_by=votes')
      .expect(200);
    expect(response.body.reviews).toHaveLength(13);
    expect(response.body.reviews).toBeSortedBy('votes', { descending: true });
  });
  test('GET - status 200 - responds with an array of reviews sorted by column in query and sorted in order in query', async () => {
    const response = await request(app)
      .get('/api/reviews?sort_by=votes&order=asc')
      .expect(200);
    expect(response.body.reviews).toHaveLength(13);
    expect(response.body.reviews).toBeSortedBy('votes');
  });
  test('GET - status 200 - responds with an array of reviews filtered by category in query', async () => {
    let response = await request(app)
      .get('/api/reviews?category=euro game')
      .expect(200);
    expect(response.body.reviews).toHaveLength(1);
    response = await request(app)
      .get('/api/reviews?category=social deduction')
      .expect(200);
    expect(response.body.reviews).toHaveLength(11);
  });
  test('GET - status 400 - responds with bad request: column does not exist', async () => {
    const response = await request(app)
      .get('/api/reviews?sort_by=hello')
      .expect(400);
    expect(response.body.msg).toBe('bad request: column does not exist');
  });
  test('GET - status 400 - responds with bad request: invalid order query', async () => {
    const response = await request(app)
      .get('/api/reviews?order=up')
      .expect(400);
    expect(response.body.msg).toBe('bad request: invalid order query');
  });
  test('GET - status 404 - responds with bad request: category does not exist', async () => {
    const response = await request(app)
      .get(`/api/reviews?category=hello`)
      .expect(404);
    expect(response.body.msg).toBe('bad request: category does not exist');
  });
  test('GET - status 200 - responds with currently no reviews for this category', async () => {
    const response = await request(app)
      .get(`/api/reviews?category=children's games`)
      .expect(200);
    expect(response.body.reviews).toBe(
      'currently no reviews for this category'
    );
  });
});

describe('/api/reviews/:review_id/comments', () => {
  describe('GET', () => {
    test('GET - status 200 - responds with an array of comments', async () => {
      let response = await request(app)
        .get('/api/reviews/3/comments')
        .expect(200);
      expect(response.body.comments).toHaveLength(3);
      response.body.comments.forEach((comment) => {
        expect(comment).toEqual(
          expect.objectContaining({
            comment_id: expect.any(Number),
            votes: expect.any(Number),
            created_at: expect.any(String),
            author: expect.any(String),
            body: expect.any(String),
          })
        );
        expect(comment.created_at).toMatch(
          /^\d{4}-\d{2}-\d{2}\w{1}\d{2}:\d{2}:\d{2}.\d{3}Z$/
        );
      });
    });
    test('GET - status 404 - responds with bad request: valid id type but out of range', async () => {
      const response = await request(app)
        .get('/api/reviews/1000/comments')
        .expect(404);
      expect(response.body.msg).toBe(
        'bad request: valid id type but out of range'
      );
    });
    test('GET - status 400 - responds with bad request: invalid id type', async () => {
      const response = await request(app)
        .get('/api/reviews/hello/comments')
        .expect(400);
      expect(response.body.msg).toBe('bad request: invalid id type');
    });
    test('GET - status 200 - responds with currently no comments for this review', async () => {
      const response = await request(app)
        .get('/api/reviews/1/comments')
        .expect(200);
      expect(response.body.comments).toBe(
        'currently no comments for this review'
      );
    });
  });
  describe('POST', () => {
    test('POST - status 201 - responds with posted object', async () => {
      const response = await request(app)
        .post('/api/reviews/1/comments')
        .send({ username: 'philippaclaire9', body: 'test body' })
        .expect(201);
      expect(response.body.comment).toEqual({
        author: 'philippaclaire9',
        body: 'test body',
        comment_id: 7,
        created_at: expect.any(String),
        review_id: 1,
        votes: 0,
      });
      expect(response.body.comment.created_at).toMatch(
        /^\d{4}-\d{2}-\d{2}\w{1}\d{2}:\d{2}:\d{2}.\d{3}Z$/
      );
    });
    test('POST - status 404 - responds with bad request: valid id type but out of range', async () => {
      const response = await request(app)
        .post('/api/reviews/1000/comments')
        .send({ username: 'philippaclaire9', body: 'test body' })
        .expect(404);
      expect(response.body.msg).toBe(
        'bad request: valid id type but out of range'
      );
    });
    test('POST - status 400 - responds with bad request: invalid id type', async () => {
      const response = await request(app)
        .post('/api/reviews/hello/comments')
        .send({ username: 'philippaclaire9', body: 'test body' })
        .expect(400);
      expect(response.body.msg).toBe('bad request: invalid id type');
    });
    test('POST - status 400 - responds with bad request: missing body', async () => {
      const response = await request(app)
        .post('/api/reviews/3/comments')
        .send({})
        .expect(400);
      expect(response.body.msg).toBe('bad request: missing body');
    });
    test('POST - status 400 - responds with bad request: username does not exist', async () => {
      const response = await request(app)
        .post('/api/reviews/3/comments')
        .send({ username: 'billy', body: 'test body' })
        .expect(400);
      expect(response.body.msg).toBe('bad request: username does not exist');
    });
    test('ignores unnecessary keys', async () => {
      const response = await request(app)
        .post('/api/reviews/3/comments')
        .send({
          username: 'philippaclaire9',
          body: 'test body',
          test_key: 'test',
        })
        .expect(201);
      expect(response.body.comment).toEqual({
        author: 'philippaclaire9',
        body: 'test body',
        comment_id: 7,
        created_at: expect.any(String),
        review_id: 3,
        votes: 0,
      });
      expect(response.body.comment.created_at).toMatch(
        /^\d{4}-\d{2}-\d{2}\w{1}\d{2}:\d{2}:\d{2}.\d{3}Z$/
      );
    });
  });
});

describe('/api/comments/:comment_id', () => {
  describe('DELETE', () => {
    test('DELETE - status 200 - responds with deleted comment object', async () => {
      const response = await request(app).delete('/api/comments/2').expect(200);
      expect(response.body.deletedComment).toEqual({
        body: 'My dog loved this game too!',
        comment_id: 2,
        review_id: 3,
        created_at: '2021-01-18T10:09:05.410Z',
        author: 'mallionaire',
        votes: 13,
      });
    });
    test('GET - status 404 - responds with bad request: valid id type but out of range', async () => {
      const response = await request(app)
        .delete('/api/comments/1000')
        .expect(404);
      expect(response.body.msg).toBe(
        'bad request: valid id type but out of range'
      );
    });
    test('GET - status 400 - responds with bad request: invalid id type', async () => {
      const response = await request(app)
        .delete('/api/comments/hello')
        .expect(400);
      expect(response.body.msg).toBe('bad request: invalid id type');
    });
  });
  describe('PATCH', () => {
    test('PATCH - status 200 - responds with patched object', async () => {
      const response = await request(app)
        .patch('/api/comments/3')
        .send({ inc_votes: 1 })
        .expect(200);
      expect(response.body.patchedComment).toEqual({
        comment_id: 3,
        author: 'philippaclaire9',
        review_id: 3,
        votes: 11,
        body: "I didn't know dogs could play games",
        created_at: '2021-01-18T10:09:48.110Z',
      });
    });
    test('PATCH - status 404 - responds with bad request: valid id type but out of range', async () => {
      const response = await request(app)
        .patch('/api/comments/1000')
        .send({ inc_votes: 1 })
        .expect(404);
      expect(response.body.msg).toBe(
        'bad request: valid id type but out of range'
      );
    });
    test('PATCH - status 400 - responds with bad request: invalid id type', async () => {
      const response = await request(app)
        .patch('/api/reviews/hello')
        .send({ inc_votes: 1 })
        .expect(400);
      expect(response.body.msg).toBe('bad request: invalid id type');
    });
    test('PATCH - status 400 - responds with bad request: invalid request body', async () => {
      let response = await request(app)
        .patch('/api/comments/2')
        .send({})
        .expect(400);
      expect(response.body.msg).toBe('bad request: invalid request body');
      response = await request(app)
        .patch('/api/comments/2')
        .send({ inc_votes: 'cat' })
        .expect(400);
      expect(response.body.msg).toBe('bad request: invalid request body');
    });
    test('ignores unnecessary keys', async () => {
      const response = await request(app)
        .patch('/api/comments/3')
        .send({ inc_votes: 1, test_key: 'test' })
        .expect(200);
      expect(response.body.patchedComment).toEqual({
        comment_id: 3,
        author: 'philippaclaire9',
        review_id: 3,
        votes: 11,
        body: "I didn't know dogs could play games",
        created_at: '2021-01-18T10:09:48.110Z',
      });
    });
  });
});

describe('/api/users', () => {
  test('GET - status 200 - responds with an array of users', async () => {
    const response = await request(app).get('/api/users').expect(200);
    expect(Array.isArray(response.body.users)).toBe(true);
    expect(response.body.users).toHaveLength(4);
    response.body.users.forEach((user) => {
      expect(user).toEqual({
        username: expect.any(String),
        name: expect.any(String),
        avatar_url: expect.any(String),
      });
    });
  });
});

describe('/api/users/:username', () => {
  test('GET - status 200 - responds with user object', async () => {
    const response = await request(app)
      .get('/api/users/bainesface')
      .expect(200);
    expect(response.body.user).toEqual({
      username: 'bainesface',
      name: 'sarah',
      avatar_url: 'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
    });
  });
  test('GET - status 404 - responds with bad request: valid id type but out of range', async () => {
    const response = await request(app).get('/api/users/billy').expect(404);
    expect(response.body.msg).toBe('bad request: username does not exist');
  });
});
