import { Router } from "express";
import CartManager from "../clases/CartManager.js";

const cartsRouter = Router();
const CM = new CartManager();


cartsRouter.get("/", async (req,res) => {
    const carts = await CM.getCarts();
    res.send(carts)
})

cartsRouter.post("/", async (req, res) => {
await CM.createCart();
    res.send({"estado": "OK", "mensaje": "se creo el carrito correctamente"});
})

cartsRouter.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const cart = await CM.getCartById(cid);
    res.send(cart);
})
cartsRouter.post("/:cid/product/:pid", async (req, res) => {
    const cid = req.params.cid;
    const pid = req.params.pid;
    await CM.addCartProduct(cid, pid);
    res.send({"estado": "OK", "mensaje": "Se agrego el producto al carrito"});
})
export default cartsRouter