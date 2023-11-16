var express = require('express');
var router = express.Router();
const AuthenWeb = require('../../components/MiddleWare/AuthenWeb');
const sanphamController = require('../../components/SanPham/ControllerSanPham');
const jwt = require('jsonwebtoken');
const upload = require('../../components/MiddleWare/uploadMultiFile');
const loaiSanPhamController = require('../../components/LoaiSanPham/ControllerLoaiSanPham');

//http://localhost:3000/cpanel/san-pham
router.get('/', [AuthenWeb], async function (req, res, next) {
    try {
        const sanpham = await sanphamController.getAllSanPham();
        res.render('sanpham/sanpham', { sanpham });
    } catch (err) {
        console.log(err);
        res.render('sanpham/sanpham', { sanpham: [] });
    }
});

//http://localhost:3000/cpanel/san-pham/them-san-pham
router.get('/them-san-pham', [AuthenWeb], async function (req, res, next) {
    try {
        const loai_san_pham = await loaiSanPhamController.layTatCaLoaiSanPham();
        console.log(loai_san_pham);
        res.render('sanpham/themsanpham', { loai_san_pham });
    } catch (err) {
        console.log(err);
        res.render('sanpham/themsanpham');
    }
});

//http://localhost:3000/cpanel/san-pham/them-san-pham
router.post('/them-san-pham', [AuthenWeb, upload], async function (req, res, next) {
    try {
        let { ten_san_pham, loai_san_pham, mo_ta } = req.body;
        let files = req.files; // 'files' since you used upload.array
        let sizes = JSON.parse(req.body.sizes);
        console.log("files", files);
        console.log("size", req.body.sizes);
        console.log("ten_san_pham", sizes);

        if (files && files.length > 0) {
            let hinh_anh_sp = files.map(file => `http://localhost:3000/images/${file.filename}`);

            for (let i = 0; i < req.body.sizes.length; i++) {
                let sizeObject = JSON.parse(req.body.sizes[i]);
                sizes.push(sizeObject);
            }

            console.log("sizes", sizes);
            console.log("hinh_anh_sp", hinh_anh_sp);
            console.log("ten_san_pham", ten_san_pham);
            console.log("loai_san_pham", loai_san_pham);
            console.log("mo_ta", mo_ta);
            const san_pham = {
                ten_san_pham,
                loai_san_pham,
                size: sizes,
                mo_ta,
                hinh_anh_sp,
            };

            console.log(san_pham);

            const sanpham = await themSanPhamAll.createSanPham(san_pham);

            if (sanpham) {
                // Reset mảng sizes sau khi đã sử dụng
                sizes = [];
                res.redirect('/cpanel/san-pham');
            } else {
                res.render('sanpham/themsanpham');
            }
        } else {
            // Handle the case where no files or sizes were provided
            res.render('sanpham/themsanpham');
        }
    } catch (err) {
        console.log(err);
        res.render('sanpham/themsanpham');
    }
});





module.exports = router;