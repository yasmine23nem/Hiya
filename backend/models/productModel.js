import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: Array, required: true },
    bestseller: { type: Boolean },
    category: { type: String, required: true },
    description: {
        type: String,
        required: true,
        maxLength: 6000 // Correct syntax for max length validation
    },
    price: { type: Number, required: true },
    countInStock: { type: Number, required: true },
    active: {
        type: Boolean,
        default: true
    },
    sizes: {
        type: [String],
        default: [],
        enum: ['S', 'M', 'L', 'XL', 'Taille unique']
    },
});
const productModel = mongoose.models.product || mongoose.model('product', productSchema);
export default productModel;
