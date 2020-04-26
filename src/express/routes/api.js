'use strict';

const fs = require(`fs`).promises;
const {Router} = require(`express`);
const apiRouter = Router();

const FILENAME = `mocks.json`;
const {HttpCode} = require(`../../constants`);

/* Все заросы есть в фале api.http в кооне проекта */

apiRouter.get(`/offers`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    res.send(mocks);
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

apiRouter.get(`/offers/:id`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    const id = req.params.id;
    const findedOffer = mocks.find((offer) => offer.id === id);

    if (!findedOffer) {
      return res.status(HttpCode.NOT_FOUND).render(`errors/400`);
    }

    return res.send(findedOffer);

  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

apiRouter.get(`/offers/:id/comments`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    const id = req.params.id;

    const findedOffer = mocks.find((offer) => offer.id === id);

    if (!findedOffer) {
      return res.status(HttpCode.NOT_FOUND).render(`errors/400`);
    }

    return res.send(findedOffer.comments);

  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

apiRouter.get(`/categories`, async (req, res) => {
  try {
    const fileContent = await fs.readFile('./data/categories.txt', `utf8`);
    return res.send(fileContent.split(`\n`));

  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

apiRouter.get(`/search`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);

    const findedOffer = mocks.filter((offer) => offer.title.search(req.query.query) !== -1);

    return res.send(findedOffer);

  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

apiRouter.post(`/offers`, async (req, res) => {
  try {
    if (Object.keys(req.body).length < 6) {

      return res.status(HttpCode.NOT_FOUND).render(`errors/400`);

    } else {

      return res.send(req.body);
    }
  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

apiRouter.post(`/offers/:id/comments`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    const offerId = req.params.id;

    const findedOffer = mocks.find((offer) => offer.id === offerId);
    findedOffer.comments.push(req.body);

    if (!findedOffer) {
      return res.status(HttpCode.NOT_FOUND).render(`errors/400`);
    }

    return res.send(findedOffer.comments);

  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

apiRouter.put(`/offers/:id`, async (req, res) => {
  try {

    if (Object.keys(req.body).length < 6) {

      return res.status(HttpCode.NOT_FOUND).render(`errors/400`);

    } else {

      return res.send(req.body);
    }

  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

apiRouter.delete(`/offers/:id/comments/:commentId`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    const offerId = req.params.id;
    const commentId = req.params.commentId;

    const findedOffer = mocks.find((offer) => offer.id === offerId);
    const findedComment = findedOffer.comments.find((comment) => comment.id === commentId);

    const arrIndexComment = findedOffer.comments.indexOf(findedComment);
    const deletedComment = findedOffer.comments.splice(arrIndexComment,1);

    if (!findedOffer) {
      return res.status(HttpCode.NOT_FOUND).render(`errors/400`);
    }

    return res.send(findedOffer.comments);

  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

apiRouter.delete(`/offers/:id`, async (req, res) => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    const mocks = JSON.parse(fileContent);
    const offerId = req.params.id;

    const findedOffer = mocks.find((offer) => offer.id === offerId);
    const deletedOffer = mocks.splice(mocks.indexOf(findedOffer),1);

    if (!findedOffer) {
      return res.status(HttpCode.NOT_FOUND).render(`errors/400`);
    }

    return res.send(mocks);

  } catch (err) {
    res.status(HttpCode.INTERNAL_SERVER_ERROR).render(`errors/500`);
  }
});

module.exports = apiRouter;
