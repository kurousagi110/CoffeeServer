const jwt = require('jsonwebtoken');
const AppConstans = require('./AppConstants');


const AuthenWeb = (req, res, next) => {
    const { session } = req;
    const url = req.originalUrl.toLowerCase();
    if (!session) {
        // nếu chưa login
        if (url.includes('login')) {
            return next();
        } else {
            res.redirect('/login');
        }
    } else {
        const { token } = session;
        if (!token) {
            if (url.includes('login')) {
                return next();
            } else {
                res.redirect('/login');
            }
        } else {
            jwt.verify(token, 'secret', function (error, decoded) {
                if (error) {
                    if (url.includes('login')) {
                        return next();
                    } else {
                        res.redirect('/login');
                    }
                } else {
                    //check role
                    const { role } = decoded;
                    if (role < AppConstans.ROLES.ADMIN) {
                        req.session.destroy();
                        return res.redirect('/login');
                    } else {
                        // nếu đã login
                        if (url.includes('login')) {
                            // qua home
                            res.redirect('/');
                        } else {
                            return next();
                        }
                    }

                }
            })
        }
    }
}

module.exports = AuthenWeb;