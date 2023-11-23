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
    const { ten_chi_nhanh, dia_chi, location } = req.body;

    const result = await chiNhanhController.themChiNhanh(ten_chi_nhanh, dia_chi, location);

    if (result) {
        res.status(200).json({ result: 'success' });
    } else {
      res.redirect("/cpanel/chi-nhanh/them-chi-nhanh");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/cpanel/chi-nhanh");
  }
});

//chuyển trang sửa chi nhánh
router.get("/sua-chi-nhanh/:id", [AuthenWeb], async (req, res) => {
  try {
    const { id } = req.params;
    const chiNhanh = await chiNhanhController.layChiNhanhTheoID(id);
    res.render("chinhanh/suachinhanh", { chiNhanh });
  } catch (err) {
    console.log(err);
    res.redirect("/cpanel/chi-nhanh");
  }
});

//sửa chi nhánh
router.post("/sua-chi-nhanh/:id", [AuthenWeb], async (req, res) => {
  try {
    const { id } = req.params;
    const { ten_chi_nhanh, dia_chi, location } = req.body;

    const result = await chiNhanhController.suaChiNhanh(id, ten_chi_nhanh, dia_chi, location);

    if (result) {
        res.status(200).json({ result: 'success' });
    } else {
      res.redirect("/cpanel/chi-nhanh/sua-chi-nhanh/" + id);
    }
  } catch (err) {
    console.log(err);
    res.redirect("/cpanel/chi-nhanh");
  }
});

//xóa chi nhánh
router.get("/xoa-chi-nhanh/:id", [AuthenWeb], async (req, res) => {
  try {
    const { id } = req.params;
    const result = await chiNhanhController.xoaChiNhanh(id);
    if (result) {
      res.status(200).json({ result: 'success' });
    } else {
      res.redirect("/cpanel/chi-nhanh");
    }
  } catch (err) {
    console.log(err);
    res.redirect("/cpanel/chi-nhanh");
  }
});



module.exports = router;