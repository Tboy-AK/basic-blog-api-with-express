const express = require('express');
const { RootRouter } = require('./routes/root-route');
const { UsersRouter } = require('./routes/users-route');
const { AuthsRouter } = require('./routes/auths-route');
const { BlogsRouter } = require('./routes/blogs-route');
require('dotenv').config();

const { urlencoded, json } = express;

const server = express();
server.use([urlencoded({ extended: true }), json()]);

server.use('/', RootRouter);

server.use('/api/v1.0.0', [
  UsersRouter,
  AuthsRouter,
  BlogsRouter,
]);

const normalizePort = () => {
  const port = parseInt(process.env.PORT, 10);
  if (Number.isNaN(port) && typeof process.env.PORT !== 'undefined') return process.env.PORT;
  if (port >= 0) return port;
  return 3000;
};

const port = normalizePort();
const hostname = process.env.HOSTNAME || 'localhost';

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Server listening on ${hostname}:${port}`));
