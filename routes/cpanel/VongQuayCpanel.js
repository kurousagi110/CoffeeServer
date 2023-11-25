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



//hien thi trang vong quay
router.get("/", [AuthenWeb], async (req, res) => {
  let vong_quay = await vongQuayService.layDanhSachToanBoVongQuay();
  let stt = 1;
  for (let i = 0; i < vong_quay.length; i++) {
    vong_quay[i].stt = stt;
    stt++;
  }
  res.render("vongquay/vongquay", { vong_quay });
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








module.exports = router;