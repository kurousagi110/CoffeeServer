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
    let { ten_vong_quay, mo_ta, ten_voucher ,ma_voucher ,diem ,gia_tri, giam_gia } = req.body;
    let files = req.files; // 'files' since you used upload.array
    let hinh_anh;
    console.log("file upload: " + files);
    if (files && files.length > 0) {
      try {
        const keys = await Promise.all(files.map(async (file) => {
          try {
            const uploadResult = await uploadImageToS3(file.path);
            return uploadResult;
          } catch (error) {
            console.error(`Error uploading file ${file.originalname}:`, error);
            return null; // or handle the error in a way that suits your application
          }
        }));
        console.log("All uploads completed. Keys:", keys);
        hinh_anh = keys[0];
        console.log("hinh anh vong quay: " + hinh_anh_vong_quay);
      } catch (error) {
        console.log("Error:", error);

      }
    }
    const result = await vongQuayService.themVongQuay(ten_vong_quay, mo_ta, ten_voucher ,ma_voucher ,diem ,gia_tri, hinh_anh, giam_gia);
    if (result) {
        res.redirect("/cpanel/vong-quay");
    }
    res.redirect("/cpanel/vong-quay/them-vong-quay");
  } catch (error) {
    console.log(error);
    res.redirect("/cpanel/vong-quay/them-vong-quay");
  }
});








module.exports = router;