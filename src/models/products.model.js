import mongoose from "mongoose"


const productsSchema = new mongoose.Schema({
    title:String,
    description:String,
    code:String,
    price:String,
    status:Boolean,
    category:String,
    thumbnails:Array

})

export const productsModel = mongoose.model("products", productsSchema);