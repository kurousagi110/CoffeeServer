var express = require('express');
var router = express.Router();
const userServices = require('../components/User/ServiceUser');
const jwt = require('jsonwebtoken');
const AuthenWeb = require('../components/MiddleWare/AuthenWeb');
/* GET users listing. */

// http://localhost:3000/
// hiển thị trang chủ
router.get('/',[AuthenWeb], async(req, res, next) => {
  res.render('sanpham/sanpham');
});
//http://localhost:3000/login
//hiển thị trang login
router.get('/login',[AuthenWeb], async(req, res, next) => {
  res.render('login');
});

//http://localhost:3000/them-san-pham
router.get('/them-san-pham',[AuthenWeb], async function (req, res, next) {
  res.render('sanpham/themsanpham');
});

//login
router.post('/login', async (req, res, next) => {
  try {
     const {username, password} = req.body;
     const result = await userServices.loginCpanel(username, password);
     if (result) {
        const token = jwt.sign({_id: result._id, role : result.status}, 'secret', {expiresIn: '3h'});
        req.session.token = token;
        return res.redirect('/cpanel/san-pham');
     }else{
        return res.redirect('/login');
     }
  } catch (error) {
    console.log(error);
      return res.redirect('/login');
  }
});
//logout
router.get('/logout', async(req, res, next) => {
  try {
    res.session.destroy();
    return res.redirect('/login');
  } catch (error) {
    console.log('logout error', error);
      return res.redirect('/login');
  }
});


module.exports = router;
