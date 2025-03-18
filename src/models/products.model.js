import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"


const productsSchema = new mongoose.Schema({
    title:String,
    description:String,
    code:String,
    price:String,
    status:Boolean,
    category:String,
    thumbnails:Array

});

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model("products", productsSchema);