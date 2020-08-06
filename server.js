const express = require('express');
require('dotenv').config();

const server = express();

const normalizePort = () => {
  const port = parseInt(process.env.PORT, 10);
  if (Number.isNaN(port)) return process.env.PORT;
  if (port >= 0) return port;
  return 3000;
};

const port = normalizePort();
const hostname = process.env.HOSTNAME || 'localhost';

server.get('/', (req, res) => res.send('Welcome to Tboy-AK Blog API'));

// eslint-disable-next-line no-console
server.listen(port, () => console.log(`Server listening on ${hostname}:${port}`));
