var express = require("express");
var router = express.Router();
const AuthenWeb = require("../../components/MiddleWare/AuthenWeb");
const jwt = require("jsonwebtoken");
const upload = require("../../components/MiddleWare/uploadMultiFile");
const loaiSanPhamController = require("../../components/LoaiSanPham/ControllerLoaiSanPham");
const Swal = require("sweetalert2");
const { uploadImageToS3 } = require('../cpanel/uploadImageToS3FromClient');
const {
    addNotificationToAllUser,
    sendNotificationNewProduct,
} = require("../../components/Notification/ServiceNotification");

//hien thi danh sach loai san pham
router.get("/", AuthenWeb, async (req, res) => {
    try {
        let listLoaiSanPham = await loaiSanPhamController.layTatCaLoaiSanPham();
        let stt = 1;
        for (let i = 0; i < listLoaiSanPham.length; i++) {
            listLoaiSanPham[i].stt = stt;
            stt++;
        }
        res.render("loaisanpham/loaisanpham", { listLoaiSanPham });
    } catch (error) {
        res.redirect("/cpanel");
    }
});

//hien thi form them loai san pham
router.get("/them-loai-san-pham", AuthenWeb, async (req, res) => {
    try {
        res.render("loaisanpham/themloaisanpham");
    } catch (error) {
        res.redirect("/cpanel");
    }
});

//them loai san pham
router.post("/them-loai-san-pham", AuthenWeb, async (req, res) => {
    try {
        const { ten_loai_san_pham } = req.body;
        console.log("acb" + ten_loai_san_pham);
        const result = await loaiSanPhamController.themLoaiSanPham(ten_loai_san_pham);
        console.log("result" + result);
        if (result) {
            res.status(200).json({ message: "Thêm loại sản phẩm thành công" });
        } else {
            res.status(400).json({ message: "Thêm loại sản phẩm thất bại" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
 });
//hien thi form sua loai san pham
router.get("/sua-loai-san-pham/:id", AuthenWeb, async (req, res) => {
    try {
        const id = req.params.id;
        const loaiSanPham = await loaiSanPhamController.layLoaiSanPhamTheoId(id);
        res.render("loaisanpham/sualoaisanpham", { loaiSanPham });
    } catch (error) {
        res.redirect("/cpanel");
    }
});
//sua loai san pham
router.post("/sua-loai-san-pham/:id", AuthenWeb, async (req, res) => {
    try {
        const id = req.params.id;
        const { ten_loai_san_pham } = req.body;
        const result = await loaiSanPhamController.suaLoaiSanPham(id, ten_loai_san_pham);
        if (result) {
            res.status(200).json({ message: "Sửa loại sản phẩm thành công" });
        } else {
            res.status(400).json({ message: "Sửa loại sản phẩm thất bại" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
//xoa loai san pham
router.get("/xoa-loai-san-pham/:id", AuthenWeb, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await loaiSanPhamController.xoaLoaiSanPham(id);
        if (result) {
            res.status(200).json({ result: 'success' });
        } else {
            res.status(400).json({ message: "Xóa loại sản phẩm thất bại" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


module.exports = router;