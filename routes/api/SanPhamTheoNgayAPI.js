const serviceSanPhamTheoNgay = require('../../components/SanPhamTheoNgay/ServiceSanPhamTheoNgay');
var express = require('express');
var router = express.Router();



//đặt danh sách sản phẩm theo ngày
//http://localhost:3000/api/san-pham-theo-ngay/dat-danh-sach-san-pham-theo-ngay
router.get('/dat-danh-sach-san-pham-theo-ngay', async function (req, res, next) {
    try {
        const result = await serviceSanPhamTheoNgay.datDanhSachSanPhamTheoNgay();
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Đặt danh sách sản phẩm theo ngày thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Đặt danh sách sản phẩm theo ngày thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

//lấy danh sách sản phẩm theo ngày
//http://localhost:3000/api/san-pham-theo-ngay/lay-danh-sach-san-pham-theo-ngay
router.get('/lay-danh-sach-san-pham-theo-ngay', async function (req, res, next) {
    try {
        const result = await serviceSanPhamTheoNgay.layDanhSachSanPhamTheoNgay();
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Lấy danh sách sản phẩm theo ngày thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Lấy danh sách sản phẩm theo ngày thất bại!'
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