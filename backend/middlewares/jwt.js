const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const verifyJWT = asyncHandler(async (req, res, next) => {
    // first check request headers has authorized or not
    if (!req.headers['authorization']) {
        res.status(400);
        throw new Error('No token provider');
    }

    // extract the jwt from request headers 
    const authorization = req.headers['authorization'].split(' ');
    if (authorization[0] !== 'Bearer') {
        res.status(400);
        throw new Error('Invalid Bearer token');
    }
    // verify the jwt
    jwt.verify(authorization[1], process.env.SECRET_ACCESS_KEY, (err, decoded) => {
        if (err) {
            console.log(err);
            res.status(401);
            throw new Error('Invalid token');
        }
        req.account = decoded;
    });
    next();
});

module.exports = verifyJWT;