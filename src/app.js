import express from 'express';
import handlebars from "express-handlebars"
import {Server} from "socket.io"
import __dirname from "./utils.js"
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import ProductManager from './clases/ProductManager.js';
import mongoose from 'mongoose';


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


mongoose.connect("mongodb+srv://federicogmurua12:GaTVqBCq53vxs546@cluster0.bdpst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

socketServer.on("connection",  async socket => {
    const PM = new ProductManager();
    const products = await PM.getProducts();
    
    socket.emit("realtimeproducts", products);

    socket.on("nuevoProducto", async data =>{
        const product = {title:data.title, description:data.description, code:data.code, price:data.price, category:data.category, thumbnails:[data.image]};
        await PM.addProduct(product);
        const products = await PM.getProducts();
        console.log("se agrego un nuevo producto!")
        socket.emit("realtimeproducts", products);

    })

    socket.on("eliminarProducto",  async data =>{
        await PM.deleteProduct(data);
        const products = await PM.getProducts();
        console.log("se elimino el producto!")

        socket.emit("realtimeproducts", products);

    })


})