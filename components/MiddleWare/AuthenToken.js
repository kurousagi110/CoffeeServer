const jwt = require('jsonwebtoken');

function AuthenToken(req, res, next) {
    const author = req.headers['authorization'];

    // Kiểm tra xem authorization header có tồn tại không
    if (!author) {
        return res.status(401).json({ message: 'Authorization header not found' });
    }
    // Bearer token
    const token = author.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }
    const key = "iloveyou";
    jwt.verify(token, key, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalid' });
        }
        console.log(err);
        next();
    });
}

module.exports = AuthenToken;