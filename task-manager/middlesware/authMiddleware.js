const User = require('../models/User');

const isAuthenticated = (req, res, next) => {
    console.log('Session:', req.session); // Log the entire session object

    if (req.session.userId) { // Check if there is a userId in the session
        User.findById(req.session.userId) // Find the user by ID from the session
            .then(user => {
                if (!user) {
                    return res.status(401).json({ message: 'User not found' }); // Respond with error if user not found
                }
                req.user = user; // Set req.user to the found user for use in subsequent middleware/routes
                next(); // Call next middleware/route handler
            })
            .catch(err => res.status(500).json({ message: 'Error retrieving user', err })); // Handle errors
    } else {
        res.status(401).json({ message: 'User not authenticated' }); // If userId is not in session, respond with error
    }
};

module.exports = isAuthenticated;
