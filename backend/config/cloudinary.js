import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: process.env.CLOUDIANARY_NAME,
            api_key: process.env.CLOUDIANARY_API_KEY,
            api_secret: process.env.CLOUDIANARY_API_SECRET,
        });
        console.log('Cloudinary Connected!!!');
        return cloudinary;
    } catch (error) {
        console.log('Cloudinary Connection Error:', error);
        throw error;
    }
};

export const cloudinaryInstance = connectCloudinary();
export default connectCloudinary;