const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  });
};

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ username }, { email }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                message: 'Username or email already exists'
            });
        }

        // Create new user with all required fields
        const newUser = new User({ username, email, password });
        await newUser.save();
        
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user', error: error.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = generateToken(user._id);
        
        // Send user data without sensitive info
        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            ecoImpact: user.ecoImpact,
            badges: user.badges
        };
        
        res.status(200).json({
            message: 'Login successful',
            user: userData,
            token
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
};

exports.logout = async (req, res) => {
    // JWT is stateless, so we don't need to invalidate it on the server
    // The client will remove the token
    res.status(200).json({ message: 'Logout successful' });
};

exports.getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user data without password
        const userData = {
            _id: user._id,
            username: user.username,
            email: user.email,
            ecoImpact: user.ecoImpact,
            badges: user.badges
        };
        
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error: error.message });
    }
};