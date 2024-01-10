var express = require("express");
var router = express.Router();
const AuthenWeb = require("../../components/MiddleWare/AuthenWeb");
const serviceUser = require("../../components/User/ServiceUser");
const serviceChiNhanh = require("../../components/ChiNhanh/ServiceChiNhanh");
const jwt = require("jsonwebtoken");
const upload = require("../../components/MiddleWare/uploadMultiFile");
const vongQuayService = require("../../components/VongQuay/ServiceVongQuay");
const Swal = require("sweetalert2");
const { uploadImageToS3 } = require('../cpanel/uploadImageToS3FromClient');
const {
    addNotificationToAllUser,
    sendNotificationNewProduct,
} = require("../../components/Notification/ServiceNotification");
const moment = require('moment');

//lấy danh sách user
router.get("/", AuthenWeb, async function (req, res) {
    try {
        const user = await serviceUser.layThongTinTatCaUser();
        
        let stt = 1;
        
        for (let i = 0; i < user.length; i++) {
            user[i].stt = stt;
            stt++;
        }
        console.log('user: ', user);
        res.render("taikhoan/taikhoan", { user });

    } catch (error) {
        console.log(error);
        throw error;
    }
});

//xóa user
router.get("/xoa-tai-khoan/:id", AuthenWeb, async function (req, res) {
    try {
        const { id } = req.params;
        const user = await serviceUser.xoaTaiKhoan(id);
        if (user) {
            res.status(200).json({ result: 'success' });
        } else {
            res.status(300).json({ result: 'fail' });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
});

//lay danh sach tai khoan bi khoa
router.get("/tai-khoan-bi-khoa", AuthenWeb, async function (req, res) {
    try {
        const user = await serviceUser.layThongTinTaiKhoanBiKhoa();
        let stt = 1;
        for (let i = 0; i < user.length; i++) {
            user[i].stt = stt;
            stt++;
        }
        console.log('user: ', user);
        res.render("taikhoan/unbantaikhoan", { user });

    } catch (error) {
        console.log(error);
        throw error;
    }
});

//unlock user
router.get("/unlock-tai-khoan/:id", AuthenWeb, async function (req, res) {
    try {
        const { id } = req.params;
        const user = await serviceUser.unlockTaiKhoan(id);
        if (user) {
            res.status(200).json({ result: 'success' });
        } else {
            res.status(300).json({ result: 'fail' });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
});




module.exports = router;