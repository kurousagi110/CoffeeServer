var express = require("express");
var router = express.Router();
const AuthenWeb = require("../../components/MiddleWare/AuthenWeb");
const chiNhanhController = require("../../components/ChiNhanh/ControllerChiNhanh");
const jwt = require("jsonwebtoken");
const upload = require("../../components/MiddleWare/uploadMultiFile");
const voucherService = require("../../components/Voucher/ServiceVoucher");
const Swal = require("sweetalert2");
const { uploadImageToS3 } = require('../cpanel/uploadImageToS3FromClient');

const moment = require('moment');




//hien thi trang vocher
router.get("/", [AuthenWeb], async (req, res) => {
    try {
        let voucher = await voucherService.layDanhSachAllVoucher();
        console.log(voucher);
        let stt = 1;

        for (let i = 0; i < voucher.length; i++) {
            // Calculate the remaining time in hours
            let ngay_ket_thuc = moment(voucher[i].ngay_ket_thuc);
            let now = moment();
            let duration = moment.duration(ngay_ket_thuc.diff(now));

            // Calculate the remaining days (rounded to the nearest whole number)
            voucher[i].ngay_con_lai = Math.round(duration.asHours() / 24);

            voucher[i].stt = stt;
            stt++;
        }

        res.render("voucher/voucher", { voucher });
    } catch (error) {
        console.log(error);
        // Handle the error appropriately, e.g., render an error page or send an error response
        res.status(500).send("Internal Server Error");
    }
});


//hien thi trang them voucher
router.get("/them-voucher", [AuthenWeb], async (req, res) => {
    res.render("voucher/themvoucher");
});

//them voucher
router.post("/them-voucher", [AuthenWeb, upload], async (req, res) => {
    try {
        let { ten_voucher, ma_voucher, gia_tri, mo_ta, ngay_ket_thuc, diem, giam_gia } = req.body;
        let files = req.files;
        let hinh_anh;

        if (files && files.length > 0) {
            try {
                const keys = await Promise.all(files.map(async (file) => {
                    try {
                        const uploadResult = await uploadImageToS3(file.path);
                        return uploadResult.url;
                    } catch (error) {
                        console.error(`Error uploading file ${file.originalname}:`, error);
                        return null;
                    }
                }));
                console.log("All uploads completed. Keys:", keys);
                hinh_anh = keys[0];
                console.log("hinh anh vong quay: " + hinh_anh);
            } catch (error) {
                console.log("Error:", error);
            }
        }
        const result = await voucherService.themVoucher(ten_voucher, ma_voucher, gia_tri, mo_ta, ngay_ket_thuc, diem, hinh_anh, giam_gia);
        if (result) {
            res.redirect("/cpanel/voucher");
        } else {
            res.redirect("/cpanel/voucher/them-voucher");
        }
    } catch (error) {
        console.log(error);
        res.redirect("/cpanel/voucher/them-voucher");
    }
});





module.exports = router;