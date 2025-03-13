import { Router } from "express";
import ProductManager from "../clases/ProductManager.js";

const productsRouter = Router();
const PM = new ProductManager();

productsRouter.get("/", (req, res) => {
    let products = PM.getProducts();
    
    res.send(products)
})

productsRouter.get("/:pid", (req, res) => {
    let pid = req.params.pid;
    let product = PM.getProductById(pid);
    res.send(product)
})

productsRouter.post("/", (req, res) => {
    const {title, description, code, price, status, category, thumbnails} = req.body;

    if(!title){
        res.status(404).send({"ERROR": "OK", "mensaje": "Falta el campo title, esta vacio"});
        return false
    }
    if(!description){
        res.status(404).send({"ERROR": "OK", "mensaje": "Falta el campo description, esta vacio"});
        return false
    }
    if(!code){
        res.status(404).send({"ERROR": "OK", "mensaje": "Falta el campo code, esta vacio"});
        return false
    }
    if(!price){
        res.status(404).send({"ERROR": "OK", "mensaje": "Falta el campo price, esta vacio"});
        return false
    }
    if(!status){
        res.status(404).send({"ERROR": "OK", "mensaje": "Falta el campo status, esta vacio"});
        return false
    }
    if(!category){
        res.status(404).send({"ERROR": "OK", "mensaje": "Falta el campo category, esta vacio"});
        return false
    }

    let product = {title, description, code, price, status, category, thumbnails};
    PM.addProduct(product);
    res.send({"estado": "OK", "mensaje": "producto agregado correctamente"})
    
})
productsRouter.put("/:pid", (req, res) => {
    const pid = req.params.pid;
    const {title, description, code, price, status, category, thumbnails} = req.body;

    if(!title){
        res.status(404).send({"ERROR": "OK", "mensaje": "Falta el campo title, esta vacio"});
        return false
    }
    if(!description){
        res.status(404).send({"ERROR": "OK", "mensaje": "Falta el campo description, esta vacio"});
        return false
    }
    if(!code){
        res.status(404).send({"ERROR": "OK", "mensaje": "Falta el campo code, esta vacio"});
        return false
    }
    if(!price){
        res.status(404).send({"ERROR": "OK", "mensaje": "Falta el campo price, esta vacio"});
        return false
    }
    if(!status){
        res.status(404).send({"ERROR": "OK", "mensaje": "Falta el campo status, esta vacio"});
        return false
    }
    if(!category){
        res.status(404).send({"ERROR": "OK", "mensaje": "Falta el campo category, esta vacio"});
        return false
    }

    let product = {title, description, code, price, status, category, thumbnails};
    PM.editProduct(pid, product);
    res.send({"estado": "OK", "mensaje": "El producto se actualizo correctamente"})
    
})

productsRouter.delete("/:pid", (req, res) => {
    const pid = req.params.pid;
    PM.deleteProduct(pid);
    res.send({"estado": "OK", "mensaje": "El producto se elimino correctamente"})
    
})


export default productsRouter