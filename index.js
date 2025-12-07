import server from './src/app.js';
import config from './src/config/config.js';

server.listen(config.PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${config.PORT}`);
});