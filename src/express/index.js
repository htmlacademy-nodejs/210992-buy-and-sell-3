const app = require(`./app`);

const {getLogger} = require(`./logger`);
const logger = getLogger();

const DEFAULT_PORT = 8090;

app.listen(DEFAULT_PORT, () => {
  logger.info(`Сервер запущен на порту: ${DEFAULT_PORT}`);
}).on(`error`, (err) => {

  logger.error(`Сервер не запустился: ${err}`);
});
