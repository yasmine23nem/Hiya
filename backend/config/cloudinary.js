import { v2 as cloudinary } from 'cloudinary';

const connectCloudinary = () => {
    try {
        cloudinary.config({
            cloud_name: "dbsbykdpq",
            api_key: "749125181233119",
            api_secret: "sH5hD-sPciAOg5CgOAg6SgSspBY"
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