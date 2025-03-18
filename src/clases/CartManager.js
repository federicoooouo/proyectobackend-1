import { cartModel } from "../models/cart.model.js";

class CartManager{
    constructor(){
    /* this.carts = [],
        this.file = "carrito.json",
        this.creatFile()*/
    }

/* creatFile(){
        if(!fs.existsSync(this.file))
            fs.writeFileSync(this.file, JSON.stringify(this.carts))
        }*/

/*getID(){
    this.getCarts();
    let max = 0;
    this.carts.forEach(item => {
        if(item.id > max){
            max = item.id;
        }
    })
    return max + 1;
    }  */
    async getCarts(){
        /*this.carts = JSON.parse(fs.readFileSync(this.file, "utf-8"));
        return this.carts;*/
        return await cartModel.find().lean().populate("products.product");
    }
    async getCartById(id){
        return await cartModel.find({_id:id}).lean();
        /*  this.getCarts();
        let cart = this.carts.find(item => item.id == id);
        return cart ? cart.products : {"error": "No se encontro el carrito"};*/
    }    

    async createCart() {
        await cartModel.create({product:[]});
    
        /* const cart = {id:this.getID(), products:[]};
        this.carts.push(cart);
        this.saveCarts();*/
        }
    

    async addCartProduct(cid, pid) {
        /*  this.getCarts();
            let cart = this.carts.find(item => item.id == cid);
            let product = cart.products.find(item => item.product == pid);
    
            if(product){
                product.quantity += 1;
            } else {
                let product = {product:pid, quantity:1};
                cart.products.push(product);
            }
            this.saveCarts(); */
            let cart = await cartModel.findOne({_id:cid}).lean();
            let product = cart.products.find(item => item.product == pid);
    
            if(product){
                product.quantity += 1;
            } else {
                product = {product:pid, quantity:1};
                cart.products.push(product);
            }
        await cartModel.updateOne({_id:cid}, {products: cart.products});
        }
    /*saveCarts(){
        fs.writeFileSync(this.file, JSON.stringify(this.carts));
    }  */  
        async deleteProductFromCart(cid, pid) {
            let cart = await cartModel.findOne({_id:cid}).lean();
            let products = cart.products.filter(item => item._id != pid);
    
        /*   if(products){
                product.quantity += 1;
            } else {
                let product = {product:pid, quantity:1};
                cart.products.push(product);
            }*/
        await cartModel.updateOne({_id:cid}, {products:products});
        }
        }
        
    export default CartManager