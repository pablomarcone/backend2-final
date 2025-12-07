import express from 'express';
import config from './config/config.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import http from 'http';
import mongoose from 'mongoose';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import initPassport from './config/passport.config.js';
import { productRepository } from './service/factory.js';
import router from './routes/index.js';

const app = express();

const server = http.createServer(app);
const io = new Server(server);

mongoose
    .connect(config.mongo_uri)
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.log(err));

app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        defaultLayout: 'main',
        helpers: {
            eq: (a, b) => a === b,
            gt: (a, b) => a > b,
            lt: (a, b) => a < b,
            sub: (a, b) => a - b,
            and: (a, b) => a && b,
            unless: (a) => !a,
        },
    }));
app.set('view engine', 'hbs');
app.set('views', config.paths.views);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

initPassport();
app.use(passport.initialize());

app.use(express.static(config.paths.public));
app.use('/', router);

io.on('connection', async (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);

    io.emit('getProducts', await productRepository.getProducts({ query: { limit: -1 } }));

    socket.on('deleteProduct', async (productId) => {
        try {
            await productRepository.deleteProduct(productId);  
            io.emit('getProducts', await productRepository.getProducts({ query: { limit: -1 } }));
        } catch (error) {
            console.log(error);
        }
    });

    socket.on('addProduct', async (newProduct) => {
        try {
            await productRepository.addProduct(newProduct);
            io.emit('getProducts', await productRepository.getProducts({ query: { limit: -1 } }));
        } catch (error) {
            console.log(error);
        }
    });

    socket.on("disconnect", () => {
        console.log(`Cliente desconectado: ${socket.id}`);
    });
});

export default server;