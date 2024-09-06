const jwt = require('jsonwebtoken');

// Middleware for jwt verification and save role
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('No token provided');
    }

    jwt.verify(token.split(' ')[1], process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send('Failed to authenticate token');
        }

        // Save roleName and other data
        req.user = {
            id: decoded.id,
            userName: decoded.userName,
            roleName: decoded.roleName,
            canAddProduct: decoded.canAddProduct,
            canEditProduct: decoded.canEditProduct,
            canDeleteProduct: decoded.canDeleteProduct,
            canEditInventory: decoded.canEditInventory,
            canViewReports: decoded.canViewReports,
            canModifyUsers: decoded.canModifyUsers
        };

        next();
    });
}

module.exports = verifyToken;
