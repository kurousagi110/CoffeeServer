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
            if (voucher[i].ngay_con_lai < 0) {
                voucher[i].ngay_con_lai = 0;
            }
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
        let { ten_voucher, ma_voucher, mo_ta, ngay_ket_thuc, diem, giam_gia } = req.body;
        let files = req.files;
        let hinh_anh;
        console.log("ngay ket thuc: " + ngay_ket_thuc);
        console.log("ten voucher: " + ten_voucher);
        console.log("ma voucher: " + ma_voucher);

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
        const result = await voucherService.themVoucher(ten_voucher, ma_voucher, mo_ta, ngay_ket_thuc, diem, hinh_anh, giam_gia);
        if (result) {
            res.status(200).json({ result: "success" });
        } else {
            res.status(300).json({ result: "fail" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ result: "fail" });
    }
});


//hien thi trang sua voucher
router.get("/sua-voucher/:id", [AuthenWeb], async (req, res) => {
    try {
        let id = req.params.id;
        let voucher = await voucherService.layThongTinVoucher(id);
        console.log(voucher);
        res.render("voucher/suavoucher", { voucher });
    } catch (error) {
        console.log(error);
        res.status(400).json({ result: "fail" });
    }
});

//sua voucher
router.post("/sua-voucher/:id", [AuthenWeb, upload], async (req, res) => {
    try {
        let id = req.params.id;
        let { ten_voucher, ma_voucher, mo_ta, ngay_ket_thuc, diem, giam_gia } = req.body;
        let files = req.files;
        let hinh_anh;
        console.log("ngay ket thuc: " + ngay_ket_thuc);
        console.log("ten voucher: " + ten_voucher);
        console.log("ma voucher: " + ma_voucher);

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
        const result = await voucherService.suaVoucher(id, ten_voucher, ma_voucher, mo_ta, ngay_ket_thuc, diem, hinh_anh, giam_gia);
        if (result) {
            res.status(200).json({ result: "success" });
        } else {
            res.status(300).json({ result: "fail" });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ result: "fail" });
    }
});

//xoa voucher
router.get("/xoa-voucher/:id", [AuthenWeb], async (req, res) => {
    try {
      let id = req.params.id;
      const result = await voucherService.xoaVoucher(id);
      if (result) {
        res.status(200).json({ result: "success" });
      } else {
        res.status(300).json({ result: "fail" });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ result: "fail" });
    }
  });


module.exports = router;