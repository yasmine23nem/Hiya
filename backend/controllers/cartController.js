import userModel from "../models/userModel.js";


export const addToCart = async (req, res) => {
    try {
        const { userId, itemId, quantity } = req.body;
        console.log('Add to cart request:', { userId, itemId, quantity });

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Get existing cart data
        let cartData = userData.cartData || {};

        // Update or add new item
        if (cartData[itemId]) {
            cartData[itemId].quantity += parseInt(quantity);
        } else {
            cartData[itemId] = {
                productId: itemId,
                quantity: parseInt(quantity)
            };
        }
        console.log('Updated cart data:', cartData);

        // Save updated cart
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { cartData } },
            { new: true }
        );

        console.log('Final cart:', updatedUser.cartData);
        return res.status(200).json({
            success: true,
            cartData: updatedUser.cartData
        });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ message: error.message });
    }
};
export const removeFromCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;
        console.log('Remove from cart request:', { userId, itemId });

        if (!userId || !itemId) {
            console.log('Missing fields:', { userId, itemId });
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const userData = await userModel.findById(userId);
        console.log('User found:', userData);

        if (!userData) {
            console.log('User not found:', userId);
            return res.status(404).json({ message: 'User not found' });
        }

        let cartData = userData.cartData || {};
        console.log('Current cart data:', cartData);

        if (cartData[itemId]) {
            if (cartData[itemId].quantity > 1) {
                cartData[itemId].quantity -= 1;
            } else {
                delete cartData[itemId];
            }
            console.log('Updated cart data:', cartData);
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: { cartData: cartData } },
            { new: true }
        );
        console.log('Cart updated successfully:', updatedUser.cartData);

        return res.status(200).json({
            message: 'Product removed from cart',
            cartData: updatedUser.cartData
        });
    } catch (error) {
        console.error('Error in removeFromCart:', error);
        return res.status(500).json({ message: error.message });
    }
};

export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        console.log('Get cart request for user:', userId);

        if (!userId) {
            console.log('Missing userId in request');
            return res.status(400).json({ message: 'User ID is required' });
        }

        const userData = await userModel.findById(userId);
        console.log('User found:', userData);

        if (!userData) {
            console.log('User not found:', userId);
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('Returning cart data:', userData.cartData || {});
        return res.status(200).json(userData.cartData || {});
    } catch (error) {
        console.error('Error in getCart:', error);
        return res.status(500).json({ message: error.message });
    }
};