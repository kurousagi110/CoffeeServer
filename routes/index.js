var express = require('express');
var router = express.Router();
const userServices = require('../components/User/ServiceUser');
const jwt = require('jsonwebtoken');
const AuthenWeb = require('../components/MiddleWare/AuthenWeb');
/* GET users listing. */

// http://localhost:3000/
// hiển thị trang chủ

//http://localhost:3000/login
//hiển thị trang login
router.get('/login', [AuthenWeb], async (req, res, next) => {
  res.render('login');
});


//login
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const result = await userServices.loginCpanel(username, password);

    if (result) {
      const token = jwt.sign({ _id: result._id, role: result.status }, 'secret', { expiresIn: '3h' });
      req.session.token = token;
      res.status(200).json({ token: token });
    } else {
      // Redirect to the login page if the login fails
      res.status(401).redirect('/login');
    }
  } catch (error) {
    console.error(error);
    res.status(500).redirect('/login');
  }
});
//logout
router.get('/logout', async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.log('logout error', err);
        return res.redirect('/login');
      }
      return res.redirect('/login');
    });
  } catch (error) {
    console.log('logout error', error);
    return res.redirect('/login');
  }
});


module.exports = router;
