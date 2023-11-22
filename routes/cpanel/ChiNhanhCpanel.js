var express = require("express");
var router = express.Router();
const AuthenWeb = require("../../components/MiddleWare/AuthenWeb");
const chiNhanhController = require("../../components/ChiNhanh/ControllerChiNhanh");
const jwt = require("jsonwebtoken");
const upload = require("../../components/MiddleWare/uploadMultiFile");
const loaiSanPhamController = require("../../components/LoaiSanPham/ControllerLoaiSanPham");
const Swal = require("sweetalert2");
const { uploadImageToS3 } = require('../cpanel/uploadImageToS3FromClient');
const {
  addNotificationToAllUser,
  sendNotificationNewProduct,
} = require("../../components/Notification/ServiceNotification");


//hien thi trang chi nhanh
router.get("/", [AuthenWeb], async (req, res) => {
  let listChiNhanh = await chiNhanhController.layDanhSachChiNhanh();
  let stt = 1;
    for (let i = 0; i < listChiNhanh.length; i++) {
        listChiNhanh[i].stt = stt;
        stt++;
    }
  res.render("chinhanh/chinhanh", { listChiNhanh });
});

//chuyển trang thêm chi nhánh
router.get("/them-chi-nhanh", [AuthenWeb], async (req, res) => {
  res.render("chinhanh/themchinhanh");
});

//thêm chi nhánh
router.post("/them-chi-nhanh", [AuthenWeb], async (req, res) => {
  try {
    let { ten_chi_nhanh, dia_chi, sdt } = req.body;
    
    let chi_nhanh = {
      ten_chi_nhanh,
      dia_chi,
      sdt,
      hinh_anh_cn,
    };

    const result = await chiNhanhController.themChiNhanh(chi_nhanh);
    if (result) {
      res.redirect("/cpanel/chi-nhanh");
    } else {
      res.redirect("/cpanel/chi-nhanh/them-chi-nhanh");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/cpanel/chi-nhanh");
  }
});







module.exports = router;