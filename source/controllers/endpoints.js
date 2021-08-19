module.exports = {
  'GET /api': {
    description:
      'serves up a json representation of all the available endpoints of the api',
  },
  'GET /api/categories': {
    description: 'serves an array of all categories',
    queries: [],
    exampleResponse: {
      categories: [
        {
          description: "Players attempt to uncover each other's hidden role",
          slug: 'Social deduction',
        },
      ],
    },
  },
  'GET /api/users': {
    description: 'serves an array of all users',
    queries: [],
    exampleResponse: {
      users: [
        {
          username: 'dav3rid',
          name: 'dave',
          avatar_url:
            'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
        },
      ],
    },
  },
  'GET /api/reviews/:review_id': {
    description: 'serves a review object for given id',
    queries: [],
    exampleResponse: {
      review: {
        review_id: 2,
        title: 'JengARRGGGH!',
        review_body:
          "Few games are equiped to fill a player with such a defined sense of mild-peril, but a friendly game of Jenga will turn the mustn't-make-it-fall anxiety all the way up to 11! Fiddly fun for all the family, this game needs little explaination. Whether you're a player who chooses to play it safe, or one who lives life on the edge, eventually the removal of blocks will destabilise the tower and all your Jenga dreams come tumbling down.",
        designer: 'Leslie Scott',
        review_img_url:
          'https://images.pexels.com/photos/4009761/pexels-photo-4009761.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        votes: 5,
        category: 'dexterity',
        owner: 'grumpy19',
        created_at: '2021-01-18T10:01:41.251Z',
      },
    },
  },
  'PATCH /api/reviews/:review_id': {
    description:
      'updates a review and serves an updated review object for given id',
    queries: [],
    exampleRequest: {
      inc_votes: 1,
    },
    exampleResponse: {
      review: {
        review_id: 2,
        title: 'JengARRGGGH!',
        review_body:
          "Few games are equiped to fill a player with such a defined sense of mild-peril, but a friendly game of Jenga will turn the mustn't-make-it-fall anxiety all the way up to 11! Fiddly fun for all the family, this game needs little explaination. Whether you're a player who chooses to play it safe, or one who lives life on the edge, eventually the removal of blocks will destabilise the tower and all your Jenga dreams come tumbling down.",
        designer: 'Leslie Scott',
        review_img_url:
          'https://images.pexels.com/photos/4009761/pexels-photo-4009761.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
        votes: 6,
        category: 'dexterity',
        owner: 'grumpy19',
        created_at: '2021-01-18T10:01:41.251Z',
      },
    },
  },
  'GET /api/reviews': {
    description: 'serves an array of all reviews',
    queries: ['category', 'sort_by', 'order'],
    exampleResponse: {
      reviews: [
        {
          title: 'One Night Ultimate Werewolf',
          designer: 'Akihisa Okui',
          owner: 'happyamy2016',
          review_img_url:
            'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
          category: 'hidden-roles',
          created_at: '2021-02-05T11:27:26.563Z',
          votes: 5,
        },
      ],
    },
  },
  'GET /api/reviews/:review_id/comments': {
    description: 'serves an array of comments for given review id',
    queries: [],
    exampleResponse: {
      comments: [
        {
          comment_id: 7,
          votes: 3,
          created_at: '2021-03-27T19:48:58.110Z',
          body: 'Quis duis mollit ad enim deserunt.',
          author: 'jessjelly',
        },
      ],
    },
  },
  'POST /api/reviews/:review_id/comments': {
    description:
      'adds a comment and serves a newly created comment object for given review id',
    queries: [],
    exampleRequest: {
      username: 'grumpy19',
      body: 'test body',
    },
    exampleResponse: {
      comment: {
        comment_id: 62,
        author: 'grumpy19',
        review_id: 3,
        votes: 0,
        created_at: '2021-06-18T10:57:31.389Z',
        body: 'test body',
      },
    },
  },
  'DELETE /api/comments/:comment_id': {
    description:
      'deletes a comment and serves a deleted comment object for given comment id',
    queries: [],
    exampleResponse: {
      deletedComment: {
        body: 'My dog loved this game too!',
        comment_id: 2,
        review_id: 3,
        created_at: '2021-01-18T10:09:05.410Z',
        author: 'mallionaire',
        votes: 13,
      },
    },
  },
  'GET /api/users/:username': {
    description: 'serves a user object for given username',
    queries: [],
    exampleResponse: {
      user: {
        username: 'bainesface',
        name: 'sarah',
        avatar_url:
          'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
      },
    },
  },
  'PATCH /api/comments/:comment_id': {
    description:
      'updates a comment and serves an updated comment object for given id',
    queries: [],
    exampleRequest: {
      inc_votes: 1,
    },
    exampleResponse: {
      patchedComment: {
        body: 'My dog loved this game too!',
        comment_id: 2,
        review_id: 3,
        created_at: '2021-01-18T10:09:05.410Z',
        author: 'mallionaire',
        votes: 13,
      },
    },
  },
};
