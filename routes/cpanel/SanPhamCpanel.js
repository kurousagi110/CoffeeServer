var express = require('express');
var router = express.Router();
const AuthenWeb = require('../../components/MiddleWare/AuthenWeb');
const sanphamController = require('../../components/SanPham/ControllerSanPham');


//http://localhost:3000/cpanel/san-pham
router.get('/',[AuthenWeb], async function (req, res, next) {
    const sanpham = await sanphamController.getAllSanPham();
    res.render('sanpham/sanpham', { sanpham });
});

//http://localhost:3000/cpanel/san-pham/them-san-pham
router.get('/them-san-pham',[AuthenWeb], async function (req, res, next) {
    res.render('sanpham/Branch', { title: 'Thêm sản phẩm' });
});




module.exports = router;