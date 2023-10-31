var express = require('express');
var router = express.Router();
const LoaiSanPhamController = require('../../components/Favorite/ControllerFavorite');
const AuthenToken = require('../../components/MiddleWare/AuthenToken');



//lấy danh sách sản phẩm yêu thích theo user
//http://localhost:3000/api/favorite/lay-danh-sach-san-pham-yeu-thich
router.get('/lay-danh-sach-san-pham-yeu-thich/:id_user', AuthenToken, async function (req, res, next) {
    try {
        const { id_user } = req.params;
        const result = await LoaiSanPhamController.layDanhSachSanPhamYeuThich(id_user);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Lấy danh sách sản phẩm yêu thích thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Lấy danh sách sản phẩm yêu thích thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

//thêm danh sách yêu thích
//http://localhost:3000/api/favorite/them-danh-sach-yeu-thich
router.post('/them-danh-sach-yeu-thich', AuthenToken, async function (req, res, next) {
    try {
        const { id_user, id_san_pham } = req.body;
        const result = await LoaiSanPhamController.themDanhSachYeuThich(id_user, id_san_pham);
        if (result == 100) {
            res.status(200).json({
                status: true,
                message: 'Thêm danh sách yêu thích thành công!',
                result: result,
                id_san_pham: id_san_pham
            });
        }
        else if (result == 10) {
            res.status(200).json({
                status: false,
                message: 'Xóa danh sách yêu thích thành công!',
                result: result,
                id_san_pham: id_san_pham
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Thêm danh sách yêu thích thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

//lấy danh sách yêu thích
//http://localhost:3000/api/favorite/lay-danh-sach-yeu-thich
router.post('/lay-danh-sach-yeu-thich', AuthenToken, async function (req, res, next) {
    try {
        const { id_user } = req.body;
        const result = await LoaiSanPhamController.layDanhSachYeuThich(id_user);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Lấy danh sách yêu thích thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Lấy danh sách yêu thích thất bại!'
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