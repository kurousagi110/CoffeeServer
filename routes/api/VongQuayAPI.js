var express = require('express');
var router = express.Router();
const serviceVongQuay = require('../../components/VongQuay/ServiceVongQuay');
const AuthenToken = require('../../components/MiddleWare/AuthenToken');

//su dung vong quay
//http://localhost:3000/api/vong-quay/su-dung-vong-quay/:id_user
router.get('/su-dung-vong-quay/:id_user',AuthenToken, async function (req, res, next) {
    try {
        const { id_user } = req.params;
        const result = await serviceVongQuay.suDungVongQuay(id_user);
        if(result){
            res.status(200).json({
                status: true,
                message: 'Sử dụng vòng quay thành công!',
            });
        }
        else{
            res.status(200).json({
                status: false,
                message: 'Sử dụng vòng quay thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});

//thêm voucher / điểm cho user trúng vòng quay
//http://localhost:3000/api/vong-quay/them-voucher-user
router.post('/them-voucher-user',AuthenToken, async function (req, res, next) {
    try {
        const { id_user, id_vong_quay } = req.body;
        const result = await serviceVongQuay.themVoucherUser(id_user, id_vong_quay);
        if(result === 10){
            res.status(200).json({
                status: true,
                message: 'Thêm điểm thành công!',
                result: result
            });
        }
        else if(result === 100){
            res.status(200).json({
                status: true,
                message: 'Thêm voucher thành công!',
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

//lấy danh sách vòng quay
//http://localhost:3000/api/vong-quay/lay-danh-sach-vong-quay
router.get('/lay-danh-sach-vong-quay',AuthenToken, async function (req, res, next) {
    try {
        const result = await serviceVongQuay.layDanhSachVongQuay();
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Lấy danh sách vòng quay thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Lấy danh sách vòng quay thất bại!',
                result:[]
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});


//thêm vòng quay
//http://localhost:3000/api/vong-quay/them-vong-quay
router.post('/them-vong-quay', async function (req, res, next) {
    try {
        const { ten_vong_quay, mo_ta, ten_voucher ,ma_voucher ,diem ,gia_tri, hinh_anh } = req.body;
        const result = await serviceVongQuay.themVongQuay(ten_vong_quay, mo_ta, ten_voucher ,ma_voucher ,diem ,gia_tri, hinh_anh );
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Thêm vòng quay thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Thêm vòng quay thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});


//cập nhật vòng quay
//http://localhost:3000/api/vong-quay/cap-nhat-vong-quay
router.post('/cap-nhat-vong-quay', async function (req, res, next) {
    try {
        const { id_vong_quay, ten_vong_quay, mo_ta, ten_voucher ,ma_voucher ,diem ,gia_tri, hinh_anh } = req.body;
        const result = await serviceVongQuay.suaVongQuay(id_vong_quay, ten_vong_quay, mo_ta, ten_voucher ,ma_voucher ,diem ,gia_tri, hinh_anh);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Cập nhật vòng quay thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Cập nhật vòng quay thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: error.message
        });
    }
});


//xóa vòng quay
//http://localhost:3000/api/vong-quay/xoa-vong-quay
router.post('/xoa-vong-quay', async function (req, res, next) {
    try {
        const { id_vong_quay } = req.body;
        const result = await serviceVongQuay.xoaVongQuay(id_vong_quay);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Xóa vòng quay thành công!',
                result: result
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Xóa vòng quay thất bại!'
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