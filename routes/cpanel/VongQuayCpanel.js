var express = require("express");
var router = express.Router();
const AuthenWeb = require("../../components/MiddleWare/AuthenWeb");
const chiNhanhController = require("../../components/ChiNhanh/ControllerChiNhanh");
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


//hien thi trang vong quay
router.get("/", [AuthenWeb], async (req, res) => {
  try {
    let vong_quay = await vongQuayService.layDanhSachToanBoVongQuay();
    let stt = 1;

    for (let i = 0; i < vong_quay.length; i++) {
      // Calculate the remaining time in hours
      let ngay_ket_thuc = moment(vong_quay[i].ngay_ket_thuc);
      let now = moment();
      let duration = moment.duration(ngay_ket_thuc.diff(now));
      
      // Calculate the remaining days (rounded to the nearest whole number)
      vong_quay[i].ngay_con_lai = Math.round(duration.asHours() / 24);

      vong_quay[i].stt = stt;
      stt++;
    }

    res.render("vongquay/vongquay", { vong_quay });
  } catch (error) {
    console.log(error);
    // Handle the error appropriately, e.g., render an error page or send an error response
    res.status(500).send("Internal Server Error");
  }
});


//hien thi trang them vong quay
router.get("/them-vong-quay", [AuthenWeb], async (req, res) => {
  res.render("vongquay/themvongquay");
});

//them vong quay
router.post("/them-vong-quay", [AuthenWeb, upload], async (req, res) => {
  try {
    let { ten_vong_quay, mo_ta, ten_voucher, ma_voucher, diem, gia_tri, thoi_gian } = req.body;
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

    const result = await vongQuayService.themVongQuay(ten_vong_quay, mo_ta, ten_voucher, ma_voucher, diem, gia_tri, hinh_anh, thoi_gian);

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



//hien thi trang sua vong quay
router.get("/sua-vong-quay/:id", [AuthenWeb], async (req, res) => {
  try {
    let id = req.params.id;
    let vong_quay = await vongQuayService.layDanhSachVongQuayTheoId(id);
    res.render("vongquay/suavongquay", { vong_quay });
  } catch (error) {
    console.log(error);
    res.direct("/cpanel/vong-quay");
  }

});

//sua vong quay
router.post("/sua-vong-quay/:id", [AuthenWeb, upload], async (req, res) => {
  try {
    let id = req.params.id;
    let { ten_vong_quay, mo_ta, ten_voucher, ma_voucher, diem, gia_tri, thoi_gian } = req.body;
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
        // Assuming uploadResult is an object with a 'url' property
        hinh_anh = keys[0];
        console.log("hinh anh vong quay: " + hinh_anh);
      } catch (error) {
        console.log("Error:", error);
      }
    }

    const result = await vongQuayService.suaVongQuay(id, ten_vong_quay, mo_ta, ten_voucher, ma_voucher, diem, gia_tri, hinh_anh, thoi_gian);

    if (result) {
      console.log("sua thanh cong");
      res.status(200).json({ result: "success" });
    } else {
      console.log("sua that bai");
      res.status(300).json({ result: "fail" });
    }
  } catch (error) {

    console.log("lỗi" + error);
    res.status(400).json({ result: "fail" });
  }
});


//xoa vong quay
router.get("/xoa-vong-quay/:id", [AuthenWeb], async (req, res) => {
  try {
    let id = req.params.id;
    const result = await vongQuayService.xoaVongQuay(id);

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