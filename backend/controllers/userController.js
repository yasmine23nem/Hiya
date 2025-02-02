
import validator from "validator"
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js"

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
    });
};
// route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check user exist
        const user = await userModel
            .findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        const token = createToken(user._id);
        res.status(200).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }

}

// route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if any of the required fields are missing
        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Name, email, and password are required' });
        }

        // Log request data for debugging
        console.log('Request body:', req.body);

        // Check if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        // Validate password strength
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ error: 'Password is weak' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new userModel({ name, email, password: hashedPassword });
        await user.save();

        // Generate a token (you should define the createToken function elsewhere)
        const token = createToken(user._id);

        // Return success response with token
        res.status(201).json({ message: 'User created successfully', token });

        // Optionally, log the token (be careful with logging sensitive data)
        console.log('Generated token:', token);

    } catch (error) {
        console.error('Error in registerUser:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

// route for user logout
const logoutUser = async (req, res) => {
}
// route for user password reset
const resetPassword = async (req, res) => {
}
//route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check user exist
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ token });
        } else {
            res.status(400).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
}


//route for admin registration
export { loginUser, registerUser, logoutUser, resetPassword, adminLogin };