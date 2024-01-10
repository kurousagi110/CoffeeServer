var express = require('express');
var router = express.Router();
var uploadAnh = require('../../components/MiddleWare/uploadFile');
const LoaiSanPhamController = require('../../components/LoaiSanPham/ControllerLoaiSanPham');
const AuthenToken = require('../../components/MiddleWare/AuthenToken');


//lấy tất cả loại sản phẩm
//http://localhost:3000/api/loai-san-pham/lay-tat-ca-loai-san-pham
router.get('/lay-tat-ca-loai-san-pham', async function (req, res, next) {
    try {
        const loai_san_phams = await LoaiSanPhamController.layTatCaLoaiSanPham();
        res.status(200).json({
            status: true,
            message: 'Lấy tất cả loại sản phẩm thành công!',
            data: loai_san_phams
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Lấy tất cả loại sản phẩm thất bại!'
        });
    }
});

//lấy loại sản phẩm theo id
//http://localhost:3000/api/loai-san-pham/lay-loai-san-pham-theo-id/:id_loai_san_pham
router.get('/lay-loai-san-pham-theo-id/:id_loai_san_pham', async function (req, res, next) {
    try {
        const { id_loai_san_pham } = req.params;
        const loai_san_pham = await LoaiSanPhamController.layLoaiSanPhamTheoId(id_loai_san_pham);
        res.status(200).json({
            status: true,
            message: 'Lấy loại sản phẩm thành công!',
            data: loai_san_pham
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Lấy loại sản phẩm thất bại!'
        });
    }
});

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
            res.status(200).json({
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
            res.status(200).json({
                status: true,
                message: 'Xóa loại sản phẩm thành công!'
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Xóa loại sản phẩm thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
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
            res.status(200).json({
                status: true,
                message: 'Sửa loại sản phẩm thành công!'
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Sửa loại sản phẩm thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Sửa loại sản phẩm thất bại!'
        });
    }
});





module.exports = router;