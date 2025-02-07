import express from "express";
import {
    getProducts,
    getProductsAdmin,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
    toggleActive
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

// Public routes
productRouter.get('/list', getProducts);
productRouter.get('/:id', getProductById);

// Protected routes (admin only)
productRouter.post('/create',
    adminAuth,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 }
    ]),
    createProduct
);
productRouter.get('/admin/list', getProductsAdmin);

productRouter.put('/:id',
    adminAuth,
    upload.fields([
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 }
    ]),
    updateProduct
);

productRouter.patch('/:id/toggle-active', adminAuth, toggleActive);
productRouter.delete('/:id', adminAuth, deleteProduct);

export default productRouter;