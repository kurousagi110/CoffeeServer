const jwt = require('jsonwebtoken');
const User = require('../User/ModelUser'); // Import your user model

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
    jwt.verify(token, key, async (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Token invalid' });
        }

        // Check if user and version are present in the decoded token
        if (!user || !user.version) {
            return res.status(401).json({ message: 'Invalid token format' });
        }

        // Check user.version against the database
        try {
            const foundUser = await User.findOne({ tai_khoan: user.username });
            const foundEmail = await User.findOne({ email: user.username });
            if (!foundUser && !foundEmail) {
                return res.status(401).json({ message: 'User not found' });
            }
            if (foundUser) {
                if (foundUser.version !== user.version) {
                    return res.status(401).json({ message: 'Token expired' });
                }
            } else {
                if (foundEmail.version !== user.version) {
                    return res.status(401).json({ message: 'Token expired' });
                }
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        next();
    });
}

module.exports = AuthenToken;
