const { createApp } = require('./app');

const port = process.env.PORT || 3000;
const server = createApp();
server.listen(port, () => {
  console.log(`TaskFlow em execução: http://localhost:${port}`);
});
