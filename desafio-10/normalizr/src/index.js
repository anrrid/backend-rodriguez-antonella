import Config from './config';
import Server from './services/server.js';
import { connectToDB } from './services/db.js';
import { initWsServer } from './services/socket.js';

const puerto = Config.PORT;

const init = async () => {
  await connectToDB();
  const io = initWsServer(Server);
  Server.listen(puerto, () => console.log(`SERVER FUNCIONANDO EN PUERTO ${puerto}`));
};

init();
