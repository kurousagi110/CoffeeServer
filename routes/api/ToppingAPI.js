var express = require('express');
var router = express.Router();
var uploadAnh = require('../../components/MiddleWare/uploadFile');
const serviceTopping = require('../../components/Topping/ServiceTopping');
const AuthenToken = require('../../components/MiddleWare/AuthenToken');


//lấy tất cả topping
//http://localhost:3000/api/topping/lay-tat-ca-topping
router.get('/lay-tat-ca-topping', async function (req, res, next) {
    try {
        const toppings = await serviceTopping.layTatCaTopping();
        res.status(200).json({
            status: true,
            message: 'Lấy tất cả topping thành công!',
            data: toppings
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Lấy tất cả topping thất bại!'
        });
    }
});

//lấy topping theo id
//http://localhost:3000/api/topping/lay-topping-theo-id/:id_topping
router.get('/lay-topping-theo-id/:id_topping', async function (req, res, next) {
    try {
        const { id_topping } = req.params;
        const topping = await serviceTopping.layToppingTheoId(id_topping);
        res.status(200).json({
            status: true,
            message: 'Lấy topping thành công!',
            data: topping
        });
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Lấy topping thất bại!'
        });
    }
});

//thêm topping
//http://localhost:3000/api/topping/them-topping
router.post('/them-topping', async function (req, res, next) {
    try {
        const { ten_topping, gia_topping, hinh_anh,mo_ta } = req.body;
        const result = await serviceTopping.themTopping(ten_topping, gia_topping, hinh_anh, mo_ta);

        if (result) {
            res.status(200).json({
                status: true,
                message: 'Thêm topping thành công!'
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Thêm topping thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Thêm topping thất bại!'
        });
    }
});

//sửa topping
//http://localhost:3000/api/topping/sua-topping
router.post('/sua-topping', async function (req, res, next) {
    try {
        const { id_topping, ten_topping, gia_topping, hinh_anh } = req.body;
        const result = await serviceTopping.suaTopping(id_topping, ten_topping, gia_topping, hinh_anh);

        if (result) {
            res.status(200).json({
                status: true,
                message: 'Sửa topping thành công!'
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Sửa topping thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Sửa topping thất bại!'
        });
    }
});

//xóa topping
//http://localhost:3000/api/topping/xoa-topping
router.post('/xoa-topping', async function (req, res, next) {
    try {
        const { id_topping } = req.body;
        const result = await serviceTopping.xoaTopping(id_topping);

        if (result) {
            res.status(200).json({
                status: true,
                message: 'Xóa topping thành công!'
            });
        }
        else {
            res.status(200).json({
                status: false,
                message: 'Xóa topping thất bại!'
            });
        }
    } catch (error) {
        res.status(400).json({
            status: false,
            message: 'Xóa topping thất bại!'
        });
    }
});



module.exports = router;