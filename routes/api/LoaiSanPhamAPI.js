var express = require('express');
var router = express.Router();
var uploadAnh = require('../../components/MiddleWare/uploadFile');
const LoaiSanPhamController = require('../../components/LoaiSanPham/ControllerLoaiSanPham');


//thêm loại sản phẩm
//http://localhost:3000/api/loai-san-pham/them-loai-san-pham
router.post('/them-loai-san-pham', async function (req, res, next) {
    try {
        const { ten_loai_san_pham } = req.body;
        const result = await LoaiSanPhamController.themLoaiSanPham(ten_loai_san_pham);

        if (result) {
            res.status(200).json({
                status: true,
                message: 'Thêm loại sản phẩm thành công!'
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Loại sản phẩm bị trùng!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

//xóa loại sản phẩm
//http://localhost:3000/api/loai-san-pham/xoa-loai-san-pham
router.post('/xoa-loai-san-pham', async function (req, res, next) {
    try {
        const { id_loai_san_pham } = req.body;
        const result = await LoaiSanPhamController.xoaLoaiSanPham(id_loai_san_pham);
        if (result) {
            res.json({
                status: true,
                message: 'Xóa loại sản phẩm thành công!'
            });
        }
        else {
            res.json({
                status: false,
                message: 'Xóa loại sản phẩm thất bại!'
            });
        }
    } catch (error) {
        res.json({
            status: false,
            message: 'Xóa loại sản phẩm thất bại!'
        });
    }
});

//sửa loại sản phẩm
//http://localhost:3000/api/loai-san-pham/sua-loai-san-pham
router.post('/sua-loai-san-pham', async function (req, res, next) {
    try {
        const { id_loai_san_pham, ten_loai_san_pham } = req.body;
        const result = await LoaiSanPhamController.suaLoaiSanPham(id_loai_san_pham, ten_loai_san_pham);
        if (result) {
            res.json({
                status: true,
                message: 'Sửa loại sản phẩm thành công!'
            });
        }
        else {
            res.json({
                status: false,
                message: 'Sửa loại sản phẩm thất bại!'
            });
        }
    } catch (error) {
        res.json({
            status: false,
            message: 'Sửa loại sản phẩm thất bại!'
        });
    }
});





module.exports = router;