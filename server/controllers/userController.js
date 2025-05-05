const User = require('../models/User');

// Get user profile information
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Don't send password in response
        const userProfile = {
            _id: user._id,
            username: user.username,
            // Add other user fields as needed
        };
        res.status(200).json(userProfile);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving user profile', error: error.message });
    }
};

// Update user profile information
exports.updateProfile = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Don't send password in response
        const userProfile = {
            _id: updatedUser._id,
            username: updatedUser.username,
            // Add other user fields as needed
        };
        res.status(200).json({ message: 'Profile updated successfully', user: userProfile });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user profile', error: error.message });
    }
};

// Delete user account
exports.deleteUserAccount = async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};