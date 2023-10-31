var express = require('express');
var router = express.Router();
const DonHangController = require('../../components/DonHang/ControllerDonHang');
const AuthenToken = require('../../components/MiddleWare/AuthenToken');
const { route } = require('./FavoriteAPI');



//sửa đơn hàng
//http://localhost:3000/api/don-hang/sua-don-hang
router.post('/sua-don-hang', AuthenToken, async function (req, res, next) {
    try {
        const { id_don_hang, id_user, id_chi_nhanh, loai_don_hang, dia_chi, san_pham, ghi_chu, giam_gia, phi_van_chuyen } = req.body;
        const result = await DonHangController.suaDonHang(id_don_hang, id_user, id_chi_nhanh, loai_don_hang, dia_chi, san_pham, ghi_chu, giam_gia, phi_van_chuyen);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Sửa đơn hàng thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Sửa đơn hàng thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

//lấy danh sách sản phẩm chưa đánh giá
//http://localhost:3000/api/don-hang/lay-danh-sach-san-pham-chua-danh-gia
router.get('/lay-danh-sach-san-pham-chua-danh-gia/:id_user', AuthenToken, async function (req, res, next) {
    try {
        const { id_user } = req.params;
        const result = await DonHangController.layDanhSachSanPhamChuaDanhGia(id_user);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Lấy danh sách sản phẩm chưa đánh giá thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Lấy danh sách sản phẩm chưa đánh giá thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
})


//thêm đơn hàng
//http://localhost:3000/api/don-hang/them-don-hang
router.post('/them-don-hang', AuthenToken, async function (req, res, next) {
    try {
        const { id_user, id_chi_nhanh, loai_don_hang, dia_chi, san_pham, ghi_chu, giam_gia, phi_van_chuyen } = req.body;
        const result = await DonHangController.themDonHang(id_user, id_chi_nhanh, loai_don_hang, dia_chi, san_pham, ghi_chu, giam_gia, phi_van_chuyen);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Thêm đơn hàng thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Thêm đơn hàng thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});
//lấy đơn hàng
//http://localhost:3000/api/don-hang/lay-don-hang
router.get('/lay-don-hang/:id_don_hang', AuthenToken, async function (req, res, next) {
    try {
        const { id_don_hang } = req.params;
        const result = await DonHangController.layDonHang(id_don_hang);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Lấy đơn hàng thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Lấy đơn hàng thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

//lấy đơn hàng theo id_user
//http://localhost:3000/api/don-hang/lay-don-hang-theo-id-user
router.get('/lay-don-hang-theo-id-user/:id_user', AuthenToken, async function (req, res, next) {
    try {
        const { id_user } = req.params;
        const result = await DonHangController.layDonHangTheoIdUser(id_user);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Lấy đơn hàng thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Lấy đơn hàng thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

//cập nhật trạng thái
//http://localhost:3000/api/don-hang/cap-nhat-trang-thai
router.post('/cap-nhat-trang-thai', AuthenToken, async function (req, res, next) {
    try {
        const { id_don_hang, ma_trang_thai } = req.body;
        const result = await DonHangController.capNhatTrangThai(id_don_hang, ma_trang_thai);
        if (isNaN(result)) {
            res.status(200).json({
                status: true,
                message: 'Cập nhật trạng thái thành công!',
                result: result
            });
        }else if (result === 10) {
            res.status(200).json({
                status: false,
                message: 'Trùng trạng thái!'
            });
        }else if (result === 100) {
            res.status(200).json({
                status: false,
                message: 'Đơn hàng đã được đánh giá!'
            });
        }else if (result === 1000) {
            res.status(200).json({
                status: false,
                message: 'Không tìm thấy đơn hàng!'
            });
        }else if (result === 10000) {
            res.status(200).json({
                status: false,
                message: 'Không thể chuyển trạng thái qua đánh giá'
            });
        }else if (result === 100000) {
            res.status(200).json({
                status: false,
                message: 'Đơn hàng đã được giao không thể hủy!'
            });
        }

        else {
            res.status(200).json({
                status: false,
                message: 'Trạng thái phải theo thứ tự!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

//danh gia
//http://localhost:3000/api/don-hang/danh-gia
router.post('/danh-gia', AuthenToken, async function (req, res, next) {
    try {
        const { id_don_hang, so_sao, danh_gia, hinh_anh_danh_gia, email, ten_user } = req.body;
        const result = await DonHangController.danhGia(id_don_hang, so_sao, danh_gia, hinh_anh_danh_gia, email, ten_user);
        if (isNaN(result)) {
            res.status(200).json({
                status: true,
                message: 'Đánh giá thành công!',
                result: result
            });
        }else if (result === 10) {
            res.status(200).json({
                status: false,
                message: 'Đơn hàng đã được đánh giá!'
            });
        }else if (result === 100) { 
            res.status(200).json({
                status: false,
                message: 'không tìm thấy đơn hàng!'
            });
         }else if (result === 1000) {
            res.status(200).json({
                status: false,
                message: 'Đơn hàng chưa được giao!'
            });
         }
        else {
            res.status(200).json({
                status: false,
                message: 'Đánh giá thất bại!'
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