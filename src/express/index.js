'use strict';

const express = require(`express`);
const path = require(`path`);
const bodyParser = require('body-parser');

const app = express();

const DEFAULT_PORT = 8090;
const PUBLIC_DIR = `public`;

app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

const searchRoutes = require(`./routes/search`);
const registerRoutes = require(`./routes/register`);
const offersRoutes = require(`./routes/offers`);
const loginRouter = require(`./routes/login`);
const myRouter = require(`./routes/my`);
const apiRoutes = require(`./routes/api`);

app.use(`/search`, searchRoutes);
app.use(`/register`, registerRoutes);
app.use(`/offers`, offersRoutes);
app.use(`/login`, loginRouter);
app.use(`/my`, myRouter);
app.use(`/api`, apiRoutes);

app.get(`/`, (req, res) => {
  res.render(`main`, {title: `test`, meta: `test layout`});
});

app.use((req, res) => res.status(400).render(`errors/400`));
app.use((err, req, res, next) => res.status(500).render(`errors/500`));

app.listen(DEFAULT_PORT,
  () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));

