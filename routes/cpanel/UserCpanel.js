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
        const user = await serviceUser.layThongTinAdminChiNhanh();

        let stt = 1;
        let ten_chi_nhanh = "";
        for (let i = 0; i < user.length; i++) {
            user[i].stt = stt;
            if (user[i].ma_khach_hang) {
                ten_chi_nhanh = await serviceChiNhanh.layChiNhanhTheoID(
                    user[i].ma_khach_hang
                );
                user[i].ten_chi_nhanh = ten_chi_nhanh.ten_chi_nhanh;
            } else {
                user[i].ten_chi_nhanh = "Admin";
            }
            stt++;
        }
        console.log('user: ', user);
        res.render("user/user", { user });

    } catch (error) {
        console.log(error);
        throw error;
    }
});

//hien thi trang them user
router.get("/them-user", AuthenWeb, async function (req, res) {
    try {
        const chi_nhanh = await serviceChiNhanh.layDanhSachChiNhanh();
        res.render("user/themuser", { chi_nhanh });
    } catch (error) {
        console.log(error);
        throw error;
    }
});

//them user
router.post("/them-user", AuthenWeb, async function (req, res) {
    try {
        const { tai_khoan, mat_khau, id_chi_nhanh } = req.body;
        console.log('req.body: ', req.body);

        const user = await serviceUser.dangKyAdminChiNhanh( tai_khoan, mat_khau, id_chi_nhanh);
        if (user) {
            res.status(200).json({ result: 'success' });
        } else {
            res.status(300).json({ result: 'fail' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: 'fail' });
    }
});

//chuyển trang sửa user
router.get("/sua-user/:id", AuthenWeb, async function (req, res) {
    try {
        const { id } = req.params;
        const user = await serviceUser.layThongTinUser(id);
        console.log('id: ', id);
        console.log('user: ', user);
        const chi_nhanh = await serviceChiNhanh.layDanhSachChiNhanh();
        res.render("user/suauser", { user, chi_nhanh, id });
    } catch (error) {
        console.log(error);
        throw error;
    }
});


//sửa user
router.post("/sua-user/:id", AuthenWeb, async function (req, res) {
    try {
        const { id } = req.params;
        const { tai_khoan, mat_khau, id_chi_nhanh } = req.body;

        const user = await serviceUser.suaThongTinAdminChiNhanh(id, mat_khau);
        if (user) {
            res.status(200).json({ result: 'success' });
        } else {
            res.status(300).json({ result: 'fail' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: 'fail' });
    }
});

//xóa user
router.get("/xoa-user/:id", AuthenWeb, async function (req, res) {
    try {
        const { id } = req.params;
        const user = await serviceUser.xoaUser(id);
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