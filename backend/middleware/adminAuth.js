import jwt from 'jsonwebtoken';
import 'dotenv/config';


const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            return res.status(401).json({ error: 'Unauthorized' });

        }
        next();

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}
export default adminAuth;
