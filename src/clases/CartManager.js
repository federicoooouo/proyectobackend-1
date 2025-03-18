import { cartModel } from "../models/cart.model.js";

class CartManager{
    constructor(){

    }
    async getCarts(){

        return await cartModel.find().lean();
    }
    async getCartById(id){
        return await cartModel.find({_id:id}).lean();
    }    

    async createCart() {
        await cartModel.create({product:[]});
        }
    

    async addCartProduct(cid, pid) {
            let cart = await cartModel.findOne({_id:cid}).lean();
            let product = cart.products.find(item => item.product == pid);
    
            if(product){
                product.quantity += 1;
            } else {
                let product = {product:pid, quantity:1};
                cart.products.push(product);
            }
        await cartModel.updateOne({_id:cid}, {products: cart.products});
        }
        }
        
    export default CartManager