import { cloudinaryInstance } from '../config/cloudinary.js';
import Product from '../models/productModel.js';
import sharp from 'sharp';
import fs from 'fs/promises';

// Fonction pour optimiser l'image
const optimizeImage = async (filePath) => {
    try {
        const optimizedBuffer = await sharp(filePath)
            .resize(800, 800, { fit: 'inside' }) // Redimensionne sans déformer
            .toFormat('jpeg') // Convertit en JPEG
            .jpeg({ quality: 80 }) // Réduit la taille
            .toBuffer();
        return optimizedBuffer;
    } catch (error) {
        console.error('Image optimization error:', error);
        throw new Error('Image optimization failed');
    }
};

// Fonction pour uploader une image sur Cloudinary
const uploadToCloudinary = async (filePath) => {
    try {
        const optimizedBuffer = await optimizeImage(filePath);

        return new Promise((resolve, reject) => {
            const uploadStream = cloudinaryInstance.uploader.upload_stream(
                { folder: 'products' },
                (error, result) => {
                    if (error) reject(error);
                    else resolve(result);
                }
            );
            uploadStream.end(optimizedBuffer);
        });
    } catch (error) {
        console.error('Cloudinary upload error:', error);
        throw new Error('Cloudinary upload failed');
    }
};

// Fonction pour créer un produit
const createProduct = async (req, res) => {
    try {
        console.log('Starting product creation...');
        const { name, price, description, category, countInStock, bestseller, sizes } = req.body;

        // Vérification des champs obligatoires
        if (!name || !price || !description || !category) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        console.log('Validating images...');
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({ error: 'At least one image is required' });
        }

        const images = [];
        ['image1', 'image2', 'image3'].forEach((key) => {
            if (req.files[key] && req.files[key][0]) {
                images.push(req.files[key][0].path);
            }
        });

        console.log(`Processing ${images.length} images...`);
        const cloudinaryResults = await Promise.all(images.map(uploadToCloudinary));
        const imageUrls = cloudinaryResults.map(result => result.secure_url);

        console.log('Creating product model...');
        const product = new Product({
            name,
            price: Number(price),
            description,
            category,
            countInStock: Number(countInStock) || 10,
            image: imageUrls,
            bestseller: bestseller === 'true',
            sizes: sizes ? JSON.parse(sizes) : [],
            active: true
        });

        await product.save();
        console.log('Product saved successfully');

        // Suppression des fichiers temporaires
        await Promise.all(images.map(filePath => fs.unlink(filePath)));

        res.status(201).json(product);
    } catch (error) {
        console.error('Create product error:', error);
        res.status(500).json({ error: error.message || 'Server error' });
    }
};

export { createProduct };


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

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const {
            name,
            price,
            description,
            category,
            countInStock,
            bestseller,
            keepExistingImages,
            sizes
        } = req.body;
        // Vérification et parsing sécurisé des tailles
        let parsedSizes = [];
        try {
            parsedSizes = sizes ? JSON.parse(sizes) : product.sizes;
            // Vérifie que c'est bien un tableau
            if (!Array.isArray(parsedSizes)) {
                parsedSizes = product.sizes;
            }
        } catch (e) {
            console.error('Error parsing sizes:', e);
            parsedSizes = product.sizes;
        }
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
                sizes: parsedSizes, // Utilisation des tailles parsées
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