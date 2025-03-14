import { Router } from "express";
import ProductManager from "../clases/ProductManager.js";

const viewsRouter = Router();
const PM = new ProductManager();
viewsRouter.get("/", (req, res) => {
    let products = PM.getProducts();


    res.render("home", {products: products});
})

export default viewsRouter;