var express = require('express');
var router = express.Router();
const serviceVoucher = require('../../components/Voucher/ServiceVoucher');
const AuthenToken = require('../../components/MiddleWare/AuthenToken');
const ModelVoucher = require('../../components/Voucher/ModelVoucher');


//lấy danh sách voucher của user
//http://localhost:3000/api/voucher/lay-danh-sach-voucher-user/5f9b9b7b9c9b7c2d0c8b3b1a
router.get('/lay-danh-sach-voucher-user/:id_user',AuthenToken, async (req, res) => {
    try {
        const id_user = req.params.id_user;
        const result = await serviceVoucher.layDanhSachVoucherUser(id_user);
        if (result) {
            res.status(200).json({
                trang_thai : true,
                message: 'Lấy danh sách voucher thành công',
                data: {
                    VoucherHieuLuc: result.VoucherHieuLuc,
                    VoucherHetHieuLuc: result.VoucherHetHieuLuc
                }
            });
        }else{
            res.status(200).json({
                trang_thai : true,
                message: 'Lấy danh sách voucher thất bại',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            trang_thai : false,
            message: 'Lấy danh sách voucher thất bại',
        });
    }
});

//lấy danh sách voucher ai cũng có thể xem trừ voucher đổi điểm
//http://localhost:3000/api/voucher/lay-danh-sach-voucher
router.get('/lay-danh-sach-voucher', async (req, res) => {
    try {
        const result = await serviceVoucher.layDanhSachVoucher();
        if (result) {
            res.status(200).json({
                trang_thai : true,
                message: 'Lấy danh sách voucher thành công',
                data: result
            });
        }else{
            res.status(200).json({
                trang_thai : true,
                message: 'Lấy danh sách voucher thất bại',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            trang_thai : false,
            message: 'Lấy danh sách voucher thất bại',
        });
    }
});

//lấy danh sách voucher đổi điểm
//http://localhost:3000/api/voucher/lay-danh-sach-voucher-doi-diem
router.get('/lay-danh-sach-voucher-doi-diem',AuthenToken, async (req, res) => {
    try {
        const result = await serviceVoucher.layDanhSachVoucherDoiDiem();
        if (result) {
            res.status(200).json({
                trang_thai : true,
                message: 'Lấy danh sách voucher thành công',
                data: result
            });
        }else{
            res.status(200).json({
                trang_thai : true,
                message: 'Lấy danh sách voucher thất bại',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            trang_thai : false,
            message: 'Lấy danh sách voucher thất bại',
        });
    }
});

//lấy thông tin voucher theo id
//http://localhost:3000/api/voucher/lay-thong-tin-voucher/5f9b9b7b9c9b7c2d0c8b3b1a
router.get('/lay-thong-tin-voucher/:id_voucher',AuthenToken, async (req, res) => {
    try {
        const id_voucher = req.params.id_voucher;
        const result = await serviceVoucher.layThongTinVoucher(id_voucher);
        if (result) {
            res.status(200).json({
                trang_thai : true,
                message: 'Lấy thông tin voucher thành công',
                data: result
            });
        }else{
            res.status(200).json({
                trang_thai : true,
                message: 'Lấy thông tin voucher thất bại',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            trang_thai : false,
            message: 'Lấy thông tin voucher thất bại',
        });
    }
});

//đổi điểm thành voucher
//http://localhost:3000/api/voucher/doi-diem-thanh-voucher
router.post('/doi-diem-thanh-voucher',AuthenToken, async (req, res) => {
    try {
        const {id_user, so_diem, id_voucher, ten_voucher, gia_tri, mo_ta , ngay_ket_thuc, ma_voucher, hinh_anh} = req.body;

        const result = await serviceVoucher.doiDiemThanhVoucher(id_user, so_diem, id_voucher, ten_voucher, gia_tri, mo_ta , ngay_ket_thuc, ma_voucher, hinh_anh);
        if (result) {
            res.status(200).json({
                trang_thai : true,
                message: 'Đổi điểm thành công',
            });
        }else{
            res.status(200).json({
                trang_thai : true,
                message: 'Đổi điểm thất bại',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            trang_thai : false,
            message: 'Đổi điểm thất bại',
        });
    }
});

//sử dụng voucher
//http://localhost:3000/api/voucher/su-dung-voucher
router.post('/su-dung-voucher',AuthenToken, async (req, res) => {
    try {
        const {id_user, id_voucher} = req.body;

        const result = await serviceVoucher.suDungVoucher(id_user, id_voucher);
        if (result) {
            res.status(200).json({
                trang_thai : true,
                message: 'Sử dụng voucher thành công',
            });
        }else{
            res.status(200).json({
                trang_thai : true,
                message: 'Sử dụng voucher thất bại',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            trang_thai : false,
            message: 'Sử dụng voucher thất bại',
        });
    }
});

//thêm voucher
//http://localhost:3000/api/voucher/them-voucher
router.post('/them-voucher',AuthenToken, async (req, res) => {
    try {
        const {ten_voucher, ma_voucher, gia_tri, mo_ta, ngay_ket_thuc, diem, hinh_anh } = req.body;
        const result = await serviceVoucher.themVoucher(ten_voucher, ma_voucher, gia_tri, mo_ta, ngay_ket_thuc, diem, hinh_anh);
        if (result) {
            res.status(200).json({
                trang_thai : true,
                message: 'Thêm voucher thành công',
            });
        }else{
            res.status(200).json({
                trang_thai : true,
                message: 'Thêm voucher thất bại',
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            trang_thai : false,
            message: 'Thêm voucher thất bại',
        });
    }
});

//sửa voucher
//http://localhost:3000/api/voucher/sua-voucher
router.post('/sua-voucher',AuthenToken, async (req, res) => {
    try {
        const {id_voucher, ten_voucher, ma_voucher, gia_tri, giam_gia, ngay_ket_thuc, hinh_anh} = req.body;
        const result = await serviceVoucher.suaVoucher(id_voucher, ten_voucher, ma_voucher, gia_tri, giam_gia, ngay_ket_thuc, hinh_anh);
        if(result){
            res.status(200).json({
                trang_thai: true,
                message: "Sửa voucher thành công",
                data: result
            });
        }else{
            res.status(200).json({
                trang_thai: false,
                message: "Sửa voucher thất bại",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            trang_thai: false,
            message: "Sửa voucher thất bại",
        });
    }
});

//xóa voucher
//http://localhost:3000/api/voucher/xoa-voucher
router.post('/xoa-voucher',AuthenToken, async (req, res) => {
    try {
        const {id_voucher} = req.body;
        const result = await ModelVoucher.xoaVoucher(id_voucher);
        if(result){
            res.status(200).json({
                trang_thai: true,
                message: "Xóa voucher thành công",
                data: result
            });
        }else{
            res.status(200).json({
                trang_thai: false,
                message: "Xóa voucher thất bại",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            trang_thai: false,
            message: "Xóa voucher thất bại",
        });
    }
});











module.exports = router;