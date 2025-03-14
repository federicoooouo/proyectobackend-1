import express from 'express';
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import __dirname from "./utils.js"
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import viewsRouter from './routes/viewsRouter.js';


const app = express();
const port = 8080;
const httpServer = app.listen(port, () => {
    console.log("Servidor activo: " + port);
})
const socketServer = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

socketServer.on("connection", socket => {


})