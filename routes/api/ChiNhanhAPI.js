var express = require('express');
var router = express.Router();
const chiNhanhController = require('../../components/ChiNhanh/ControllerChiNhanh');

//lấy danh sách chi nhánh
//http://localhost:3000/api/chi-nhanh/lay-danh-sach-chi-nhanh
router.get('/lay-danh-sach-chi-nhanh', async function (req, res, next) {
    try {
        const result = await chiNhanhController.layDanhSachChiNhanh();
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Lấy danh sách chi nhánh thành công!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Lấy danh sách chi nhánh thất bại!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});


//lấy chi nhánh theo id
//http://localhost:3000/api/chi-nhanh/lay-chi-nhanh-theo-id
router.post('/lay-chi-nhanh-theo-id', async function (req, res, next) {
    try {
        const { id_chi_nhanh } = req.body;
        const result = await chiNhanhController.layChiNhanhTheoID(id_chi_nhanh);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Lấy chi nhánh theo id thành công!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Lấy chi nhánh theo id thất bại!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});


//tìm chi nhánh theo tên
//http://localhost:3000/api/chi-nhanh/lay-chi-nhanh-theo-ten
router.post('/lay-chi-nhanh-theo-ten', async function (req, res, next) {
    try {
        const { ten_chi_nhanh } = req.body;
        const result = await chiNhanhController.layChiNhanhTheoTen(ten_chi_nhanh);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Tìm chi nhánh theo tên thành công!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Tìm chi nhánh theo tên thất bại!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

//thêm chi nhánh
//http://localhost:3000/api/chi-nhanh/them-chi-nhanh
router.post('/them-chi-nhanh', async function (req, res, next) {
    try {
        const { ten_chi_nhanh, dia_chi } = req.body;
        const result = await chiNhanhController.themChiNhanh(ten_chi_nhanh, dia_chi);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Thêm chi nhánh thành công!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Thêm chi nhánh thất bại!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});


//cập nhật chi nhánh
//http://localhost:3000/api/chi-nhanh/cap-nhat-chi-nhanh
router.post('/cap-nhat-chi-nhanh', async function (req, res, next) {
    try {
        const { id_chi_nhanh, ten_chi_nhanh, dia_chi } = req.body;
        const result = await chiNhanhController.suaChiNhanh(id_chi_nhanh, ten_chi_nhanh, dia_chi);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Cập nhật chi nhánh thành công!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Cập nhật chi nhánh thất bại!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

//xóa chi nhánh
//http://localhost:3000/api/chi-nhanh/xoa-chi-nhanh
router.post('/xoa-chi-nhanh', async function (req, res, next) {
    try {
        const { id_chi_nhanh } = req.body;
        const result = await chiNhanhController.xoaChiNhanh(id_chi_nhanh);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Xóa chi nhánh thành công!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Xóa chi nhánh thất bại!'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

//thêm bàn
//http://localhost:3000/api/chi-nhanh/them-ban
router.post('/them-ban', async function (req, res, next) {
    try {
        const { id_chi_nhanh, ban } = req.body;
        const result = await chiNhanhController.themBan(id_chi_nhanh,ban);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Thêm bàn thành công!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Thêm bàn thất bại!'
            });
        }
    } catch (error) {
        console.log('themBan error: ', error);
        throw error;
    }
});

//sửa bàn
//http://localhost:3000/api/chi-nhanh/sua-ban
router.post('/sua-ban', async function (req, res, next) {
    try {
        const { id_chi_nhanh, id_ban, khu_vuc, ten_ban, trang_thai } = req.body;
        const result = await chiNhanhController.suaBan(id_chi_nhanh, id_ban, khu_vuc, ten_ban, trang_thai);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Sửa bàn thành công!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Sửa bàn thất bại!'
            });
        }
    } catch (error) {
        console.log('suaBan error: ', error);
        throw error;
    }
});

//xóa bàn
//http://localhost:3000/api/chi-nhanh/xoa-ban
router.post('/xoa-ban', async function (req, res, next) {
    try {
        const { id_chi_nhanh, id_ban } = req.body;
        const result = await chiNhanhController.xoaBan(id_chi_nhanh, id_ban);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Xóa bàn thành công!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Xóa bàn thất bại!'
            });
        }
    } catch (error) {
        console.log('xoaBan error: ', error);
        throw error;
    }
});


//thêm all
//http://localhost:3000/api/chi-nhanh/them-all
router.post('/them-all', async function (req, res, next) {
    try {
        const { ten_chi_nhanh, dia_chi, ban } = req.body;
        const result = await chiNhanhController.themAll(ten_chi_nhanh, dia_chi, ban);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Thêm all thành công!',
                result: result
            });
        }
        else {
            res.status(400).json({
                status: false,
                message: 'Thêm all thất bại!'
            });
        }
    } catch (error) {
        console.log('themAll error: ', error);
        throw error;
    }
});

module.exports = router;