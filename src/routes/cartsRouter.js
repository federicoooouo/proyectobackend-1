import { Router } from "express";
import CartManager from "../clases/CartManager.js";

const cartsRouter = Router();
const CM = new CartManager();

cartsRouter.get("/", async (req, res) => {
    const carts = await CM.getCarts();
    res.send(carts);
})
cartsRouter.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const cart = await CM.getCartById(cid);
    
    res.send(cart);
})
cartsRouter.post("/", async (req, res) => {
    await CM.createCart();
    res.send({"estado":"OK", "mensaje":"carrito creado correctamente"});
})
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    await CM.addProductToCart(cid, pid);
    res.send({"estado":"OK", "mensaje":"se agrego el producto al carrito"});
})
cartsRouter.put("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const products = req.body;    
    const quantity = req.body.quantity;    

    await CM.addProductsToCart(cid, products);
    res.send({"estado":"OK", "mensaje":"carrito actualizado"});
})
cartsRouter.put("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    const quantity = req.body.quantity;    
    await CM.updateProductFromCart(cid, pid, quantity);
    res.send({"estado":"OK", "mensaje":"carrito actualizado!"});
})
cartsRouter.delete("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    await CM.deleteProductFromCart(cid, pid);
    res.send({"estado":"OK", "mensaje":"producto eliminado del carrito!"});
})
cartsRouter.delete("/:cid", async (req, res) => {
    const cid = req.params.cid;
    await CM.deleteProductsFromCart(cid);
    res.send({"estado":"OK", "mensaje":"se vacio el carrito correctamente!"});
})

export default cartsRouter