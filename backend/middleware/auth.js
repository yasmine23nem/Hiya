import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {

    const { token } = req.headers;
    if (!token) {
        return res.status(401).json({ message: 'You are not authorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
export default auth;


