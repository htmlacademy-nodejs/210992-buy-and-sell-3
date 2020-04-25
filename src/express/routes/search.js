'use strict';

const {Router} = require(`express`);
const searchRouter = Router();

searchRouter.get(`/`, (req, res) => res.render(`search-result`));

module.exports = searchRouter;
