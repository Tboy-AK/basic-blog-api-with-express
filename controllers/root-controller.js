const rootController = () => {
  const apiNavigation = (req, res) => {
    const data = [
      {
        url: '/users',
        methods: [
          {
            POST: {
              desc: 'Register new user',
            },
          },
        ],
      },
      {
        url: '/auths',
        methods: [
          {
            POST: {
              desc: 'Sign in user',
            },
            PUT: {
              auth: true,
              desc: 'Change user password',
            },
          },
        ],
      },
      {
        url: '/blogs',
        methods: [
          {
            GET: {
              auth: true,
              desc: 'Read all user files',
            },
          },
          {
            POST: {
              auth: true,
              desc: 'Create new file',
            },
          },
        ],
      },
      {
        url: '/blogs/:blogId',
        methods: [
          {
            GET: {
              auth: true,
              desc: 'Read a file',
            },
          },
          {
            PUT: {
              auth: true,
              desc: 'Update file',
            },
          },
          {
            DELETE: {
              auth: true,
              desc: 'Delete file',
            },
          },
        ],
      },
      {
        url: '/stats',
        methods: [
          {
            GET: {
              desc: 'Read server content details',
            },
          },
        ],
      },
    ];

    res.json(data);
  };

  return { apiNavigation };
};

module.exports = rootController;
