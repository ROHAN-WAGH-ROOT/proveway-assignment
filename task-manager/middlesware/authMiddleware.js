function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();  // Proceed to the next middleware or route
    } else {
        res.redirect('/login');  // If not authenticated, redirect to login
    }
}

module.exports = isAuthenticated;
