var express = require('express');
var router = express.Router();
const giohangController = require('../../components/GioHang/ControllerGioHang');


//thêm danh sách giỏ hàng
//http://localhost:3000/api/gio-hang/them-gio-hang
router.post('/them-gio-hang', async function (req, res, next) {
    try {
        const { id_user, id_san_pham, size, so_luong } = req.body;
        const result = await giohangController.themDanhSachGioHang(id_user, id_san_pham, size, so_luong);
        if (result == 100) {
            res.status(200).json({
                status: true,
                message: 'Thêm danh sách giỏ hàng thành công!',
                result: result
            });
        }
        else if (result == 10) {
            res.status(200).json({
                status: true,
                message: 'Cập nhật số lượng sản phẩm thành công!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Thêm danh sách giỏ hàng thất bại!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

//xóa sản phẩm giỏ hàng
//http://localhost:3000/api/gio-hang/xoa-gio-hang
router.post('/xoa-gio-hang', async function (req, res, next) {
    try {
        const { id_user, id_san_pham, size } = req.body;
        const result = await giohangController.xoaSanPhamGioHang(id_user, id_san_pham, size);
        if (result == 100) {
            res.status(200).json({
                status: true,
                message: 'Xóa sản phẩm giỏ hàng thành công!',
                result: result
            });
        }
        else if (result == 10) {
            res.status(200).json({
                status: true,
                message: 'Xóa sản phẩm giỏ hàng thất bại!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Xóa sản phẩm giỏ hàng thất bại!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

//lấy danh sách giỏ hàng
//http://localhost:3000/api/gio-hang/lay-danh-sach-gio-hang
router.post('/lay-danh-sach-gio-hang', async function (req, res, next) {
    try {
        const { id_user } = req.body;
        const result = await giohangController.layDanhSachGioHang(id_user);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Lấy danh sách giỏ hàng thành công!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Lấy danh sách giỏ hàng thất bại!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

//cập nhật số lượng sản phẩm giỏ hàng
//http://localhost:3000/api/gio-hang/cap-nhat-so-luong-san-pham-gio-hang
router.post('/cap-nhat-gio-hang', async function (req, res, next) {
    try {
        const { id_user, id_san_pham, size, so_luong } = req.body;
        const result = await giohangController.capNhatSoLuongSanPhamGioHang(id_user, id_san_pham, size, so_luong);
        if (result == 100) {
            res.status(200).json({
                status: true,
                message: 'Cập nhật số lượng sản phẩm thành công!',
                result: result
            });
        }
        else if (result == 10) {
            res.status(200).json({
                status: true,
                message: 'Cập nhật số lượng sản phẩm thất bại!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Cập nhật số lượng sản phẩm thất bại!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});





module.exports = router;