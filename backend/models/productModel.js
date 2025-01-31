import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: Array, required: true },
    bestseller: { type: Boolean },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    active: {
        type: Boolean,
        default: true
    },
});
const productModel = mongoose.models.product || mongoose.model('product', productSchema);
export default productModel;
