const app = require(`./app`);

const DEFAULT_PORT = 8090;

app.listen(DEFAULT_PORT,
  () => console.log(`Сервер запущен на порту: ${DEFAULT_PORT}`));
