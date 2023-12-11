var express = require("express");
var router = express.Router();
const AuthenWeb = require("../../components/MiddleWare/AuthenWeb");
const donHangController = require("../../components/DonHang/ControllerDonHang");
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



//hien thi trang thong ke
router.get("/", [AuthenWeb], async (req, res) => {
  let listChiNhanh = await chiNhanhController.layDanhSachChiNhanh();

  res.render("thongke", { listChiNhanh });
});

//thống kê đơn hàng theo ngày và chi nhánh
router.post("/", async (req, res) => {
    try {
      const { ngaybatdau, ngayketthuc, chiNhanh } = req.body;
      console.log(ngaybatdau, ngayketthuc, chiNhanh);

      // Gọi hàm thống kê từ controller
      const thongKe = await donHangController.thongKeDonHangTheoNgayVaChiNhanh(
        ngaybatdau,
        ngayketthuc,
        chiNhanh
      );
    console.log(thongKe);
      // Trả kết quả về cho client
      res.json(thongKe);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });




module.exports = router;