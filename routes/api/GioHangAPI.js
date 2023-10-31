var express = require('express');
var router = express.Router();
const giohangController = require('../../components/GioHang/ControllerGioHang');
const AuthenToken = require('../../components/MiddleWare/AuthenToken');





//thêm topping
//http://localhost:3000/api/gio-hang/them-topping
router.post('/them-topping', AuthenToken, async function (req, res, next) {
    try {
        const { id_user, _id, ten_topping, gia } = req.body;
        const result = await giohangController.themTopping(id_user, _id, ten_topping, gia);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Thêm topping thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Thêm topping thất bại!',
                result: null
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

//xóa topping
//http://localhost:3000/api/gio-hang/xoa-topping
router.post('/xoa-topping', AuthenToken, async function (req, res, next) {
    try {
        const { id_user, id_san_pham, size, ten_topping } = req.body;
        const result = await giohangController.xoaTopping(id_user, id_san_pham, size, ten_topping);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Xóa topping thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Xóa topping thất bại!',
                result: null
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
})



//thêm danh sách giỏ hàng
//http://localhost:3000/api/gio-hang/them-gio-hang
router.post('/them-gio-hang', AuthenToken, async function (req, res, next) {
    try {
        const { id_user, id_san_pham, size, so_luong, ten_san_pham, gia, topping } = req.body;
        const result = await giohangController.themDanhSachGioHang(id_user, id_san_pham, size, so_luong, ten_san_pham, gia, topping);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Thêm danh sách giỏ hàng thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Thêm danh sách giỏ hàng thất bại!',
                result: []
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

//xóa sản phẩm giỏ hàng
//http://localhost:3000/api/gio-hang/xoa-gio-hang
router.post('/xoa-gio-hang', AuthenToken, async function (req, res, next) {
    try {
        const { id_user, _id } = req.body;
        const result = await giohangController.xoaSanPhamGioHang(id_user, _id);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Xóa sản phẩm giỏ hàng thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Xóa sản phẩm giỏ hàng thất bại!',
                result: []
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

//lấy danh sách giỏ hàng
//http://localhost:3000/api/gio-hang/lay-danh-sach-gio-hang
router.get('/lay-danh-sach-gio-hang/:id_user', AuthenToken, async function (req, res, next) {
    try {
        const { id_user } = req.params;
        console.log(id_user);
        const result = await giohangController.layDanhSachGioHang(id_user);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Lấy danh sách giỏ hàng thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Lấy danh sách giỏ hàng thất bại!',
                result: result
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

//cập nhật số lượng sản phẩm giỏ hàng
//http://localhost:3000/api/gio-hang/cap-nhat-gio-hang
router.post('/cap-nhat-gio-hang', AuthenToken, async function (req, res, next) {
    try {
        const { id_user, _id, size, so_luong,topping,gia, ten_san_pham } = req.body;
        const result = await giohangController.capNhatSoLuongSanPhamGioHang(id_user, _id, size, so_luong,topping,gia, ten_san_pham);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Cập nhật số lượng sản phẩm thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Cập nhật số lượng sản phẩm thất bại!',
                result: null
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});





module.exports = router;