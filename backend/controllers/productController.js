import { cloudinaryInstance } from '../config/cloudinary.js';
import Product from '../models/productModel.js';
import productModel from '../models/productModel.js';
import sharp from 'sharp';



const createProduct = async (req, res) => {
    try {
        console.log('Starting product creation...');
        console.log('Request body:', req.body);

        const { name, price, description, category, countInStock, bestseller } = req.body;

        // Log validation checks
        console.log('Validating required fields:', {
            name: !!name,
            price: !!price,
            description: !!description,
            category: !!category
        });

        if (!name || !price || !description || !category) {
            console.log('Missing required fields');
            return res.status(400).json({
                error: 'Missing required fields',
                details: {
                    name: !name ? 'Name is required' : null,
                    price: !price ? 'Price is required' : null,
                    description: !description ? 'Description is required' : null,
                    category: !category ? 'Category is required' : null
                }
            });
        }

        // Log image validation
        console.log('Files received:', req.files);

        if (!req.files || !req.files.image1) {
            console.log('No images provided');
            return res.status(400).json({ error: 'At least one image is required' });
        }

        const images = [];
        if (req.files.image1) images.push(req.files.image1[0]);
        if (req.files.image2) images.push(req.files.image2[0]);
        if (req.files.image3) images.push(req.files.image3[0]);

        console.log('Processing images:', images.length);

        const uploadToCloudinary = async (file) => {
            console.log('Optimizing image:', file.originalname);
            const optimized = await optimizeImage(file);

            return new Promise((resolve, reject) => {
                console.log('Uploading to Cloudinary:', file.originalname);
                const uploadStream = cloudinaryInstance.uploader.upload_stream(
                    { folder: 'products' },
                    (error, result) => {
                        if (error) {
                            console.error('Cloudinary upload error:', error);
                            reject(error);
                        } else {
                            console.log('Cloudinary upload success:', result.secure_url);
                            resolve(result);
                        }
                    }
                );
                uploadStream.end(optimized);
            });
        };

        console.log('Starting Cloudinary uploads...');
        const cloudinaryResults = await Promise.all(images.map(uploadToCloudinary));
        const imageUrls = cloudinaryResults.map(result => result.secure_url);
        console.log('Image URLs:', imageUrls);

        console.log('Creating product model...');
        const product = new productModel({
            name,
            price: Number(price),
            description,
            category,
            countInStock: Number(countInStock) || 10,
            image: imageUrls,
            bestseller: bestseller === 'true',
            active: true
        });
        console.log('Product model created:', product);

        console.log('Saving product to database...');
        await product.save();
        console.log('Product saved successfully');

        res.status(201).json(product);
    } catch (error) {
        console.error('Create product error:', error);
        console.error('Error stack:', error.stack);
        res.status(500).json({ error: error.message || 'Server error' });
    }
};
const getProducts = async (req, res) => {
    try {
        const products = await productModel.find({ active: true });
        res.json(products);
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
const getProductsAdmin = async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (error) {
        console.error('Get products error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        console.error('Get product by ID error:', error);
        res.status(500).json({ error: 'Server error' });
    }
};
// In updateProduct function
// Add this at the top with other imports
const optimizeImage = async (file) => {
    try {
        const optimized = await sharp(file.path)
            .resize(800, 800, { fit: 'inside' })
            .jpeg({ quality: 80 })
            .toBuffer();
        return optimized;
    } catch (error) {
        console.error('Image optimization error:', error);
        throw error;
    }
};

const uploadToCloudinary = async (file) => {
    const optimized = await optimizeImage(file);
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinaryInstance.uploader.upload_stream(
            { folder: 'products' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        uploadStream.end(optimized);
    });
};

// Replace the existing updateProduct function
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const { name, price, description, category, countInStock, bestseller, keepExistingImages } = req.body;
        let imageUrls = [...product.image];

        // Only handle images if new ones are uploaded and we're not keeping existing ones
        if (req.files && !keepExistingImages) {
            const images = [];
            if (req.files.image1) images.push(req.files.image1[0]);
            if (req.files.image2) images.push(req.files.image2[0]);
            if (req.files.image3) images.push(req.files.image3[0]);

            if (images.length > 0) {
                // Delete old images
                const deletePromises = product.image.map(imageUrl => {
                    const publicId = imageUrl.split('/').pop().split('.')[0];
                    return cloudinaryInstance.uploader.destroy(`products/${publicId}`);
                });
                await Promise.all(deletePromises);

                // Upload new images
                const cloudinaryResults = await Promise.all(images.map(uploadToCloudinary));
                imageUrls = cloudinaryResults.map(result => result.secure_url);
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: name || product.name,
                price: price ? Number(price) : product.price,
                description: description || product.description,
                category: category || product.category,
                countInStock: countInStock ? Number(countInStock) : product.countInStock,
                bestseller: bestseller === 'true',
                image: imageUrls
            },
            { new: true }
        );

        res.json(updatedProduct);
    } catch (error) {
        console.error('Update product error:', error);
        res.status(500).json({ error: error.message || 'Error updating product' });
    }
};

// ...existing code...
const toggleActive = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        product.active = !product.active;
        await product.save();

        res.json({
            success: true,
            message: `Product ${product.active ? 'activated' : 'deactivated'} successfully`,
            active: product.active
        });
    } catch (error) {
        console.error('Toggle active error:', error);
        res.status(500).json({ error: 'Error toggling product status' });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        if (product.image && product.image.length > 0) {
            const deletePromises = product.image.map(imageUrl => {
                const publicId = imageUrl.split('/').pop().split('.')[0];
                return cloudinaryInstance.uploader.destroy(`products/${publicId}`);
            });
            await Promise.all(deletePromises);
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Delete product error:', error);
        res.status(500).json({ error: 'Error deleting product' });
    }
};

export {
    createProduct,
    getProducts,
    getProductById,
    getProductsAdmin,
    updateProduct,
    deleteProduct,
    toggleActive
};