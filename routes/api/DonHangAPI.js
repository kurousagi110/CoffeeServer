var express = require("express");
var router = express.Router();
const DonHangController = require("../../components/DonHang/ControllerDonHang");
const AuthenToken = require("../../components/MiddleWare/AuthenToken");
const { route } = require("./FavoriteAPI");
const {
  sendNotificationOrderStatusDelivering,
  sendNotificationOrderStatusArrived,
} = require("../../components/Notification/ServiceNotification");


//lấy đơn hàng theo chi nhánh
//http://localhost:3000/api/don-hang/lay-don-hang-theo-chi-nhanh/:id_chi_nhanh
router.get("/lay-don-hang-theo-chi-nhanh/:id_chi_nhanh", AuthenToken, async function (req, res, next) {
  try {
    const { id_chi_nhanh } = req.params;
    const result = await DonHangController.layDonHangTheoChiNhanh(
      id_chi_nhanh
    );
    if (result) {
      res.status(200).json({
        status: true,
        message: "Lấy đơn hàng theo chi nhánh thành công!",
        result: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Lấy đơn hàng theo chi nhánh thất bại!",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

//thống kê đơn hàng theo chi nhánh
//http://localhost:3000/api/don-hang/thong-ke-don-hang-theo-chi-nhanh/:id_chi_nhanh
router.get("/thong-ke-don-hang-theo-chi-nhanh/:id_chi_nhanh", AuthenToken, async function (req, res, next) {
  try {
    const { id_chi_nhanh } = req.params;
    const result = await DonHangController.thongKeDonHangTheoChiNhanh(
      id_chi_nhanh
    );
    if (result) {
      res.status(200).json({
        status: true,
        message: "Thống kê đơn hàng theo chi nhánh thành công!",
        result: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Thống kê đơn hàng theo chi nhánh thất bại!",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});


//sửa đơn hàng
//http://localhost:3000/api/don-hang/sua-don-hang
router.post("/sua-don-hang", AuthenToken, async function (req, res, next) {
  try {
    const {
      id_don_hang,
      id_user,
      id_chi_nhanh,
      loai_don_hang,
      dia_chi,
      san_pham,
      ghi_chu,
      giam_gia,
      phi_van_chuyen,
      thanh_tien,
      thanh_toan,
    } = req.body;
    const result = await DonHangController.suaDonHang(
      id_don_hang,
      id_user,
      id_chi_nhanh,
      loai_don_hang,
      dia_chi,
      san_pham,
      ghi_chu,
      giam_gia,
      phi_van_chuyen,
      thanh_tien,
      thanh_toan
    );
    if (result) {
      res.status(200).json({
        status: true,
        message: "Sửa đơn hàng thành công!",
        result: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Sửa đơn hàng thất bại!",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

//lấy danh sách sản phẩm chưa đánh giá
//http://localhost:3000/api/don-hang/lay-danh-sach-san-pham-chua-danh-gia
router.get(
  "/lay-danh-sach-san-pham-chua-danh-gia/:id_user",
  AuthenToken,
  async function (req, res, next) {
    try {
      const { id_user } = req.params;
      const result = await DonHangController.layDanhSachSanPhamChuaDanhGia(
        id_user
      );
      if (result) {
        res.status(200).json({
          status: true,
          message: "Lấy danh sách sản phẩm chưa đánh giá thành công!",
          result: result,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Lấy danh sách sản phẩm chưa đánh giá thất bại!",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
);

//thêm đơn hàng
//http://localhost:3000/api/don-hang/them-don-hang
router.post("/them-don-hang", AuthenToken, async function (req, res, next) {
  try {
    const {
      id_user,
      id_chi_nhanh,
      loai_don_hang,
      dia_chi,
      san_pham,
      ghi_chu,
      giam_gia,
      phi_van_chuyen,
      thanh_tien,
      thanh_toan,
    } = req.body;
    const result = await DonHangController.themDonHang(
      id_user,
      id_chi_nhanh,
      loai_don_hang,
      dia_chi,
      san_pham,
      ghi_chu,
      giam_gia,
      phi_van_chuyen,
      thanh_tien,
      thanh_toan
    );
    if (result) {
      res.status(200).json({
        status: true,
        message: "Thêm đơn hàng thành công!",
        result: result,
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Thêm đơn hàng thất bại!",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});
//lấy đơn hàng
//http://localhost:3000/api/don-hang/lay-don-hang
router.get(
  "/lay-don-hang/:id_don_hang",
  AuthenToken,
  async function (req, res, next) {
    try {
      const { id_don_hang } = req.params;
      const result = await DonHangController.layDonHang(id_don_hang);
      if (result) {
        res.status(200).json({
          status: true,
          message: "Lấy đơn hàng thành công!",
          result: result,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Lấy đơn hàng thất bại!",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
);

//lấy đơn hàng theo id_user
//http://localhost:3000/api/don-hang/lay-don-hang-theo-id-user
router.get(
  "/lay-don-hang-theo-id-user/:id_user",
  AuthenToken,
  async function (req, res, next) {
    try {
      const { id_user } = req.params;
      const result = await DonHangController.layDonHangTheoIdUser(id_user);
      if (result) {
        res.status(200).json({
          status: true,
          message: "Lấy đơn hàng thành công!",
          result: result,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Lấy đơn hàng thất bại!",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
);

//cập nhật trạng thái
//http://localhost:3000/api/don-hang/cap-nhat-trang-thai
router.post(
  "/cap-nhat-trang-thai",
  AuthenToken,
  async function (req, res, next) {
    try {
      const { id_don_hang, ma_trang_thai } = req.body;
      const result = await DonHangController.capNhatTrangThai(
        id_don_hang,
        ma_trang_thai
      );

      if (result) {
        // gửi thông báo đơn trạng thái đơn hàng cho thiết bị cụ thể (đang vận chuyển)
        //==========================
        if (ma_trang_thai === 3) {
          sendNotificationOrderStatusDelivering({ don_hang: result });
        }
        // giao thanh cong
        if (ma_trang_thai === 4) {
          sendNotificationOrderStatusArrived({ don_hang: result });
        }
        res.status(200).json({
          status: true,
          message: "Cập nhật trạng thái thành công!",
          result: result,
        });
      } else {
        res.status(200).json({
          status: false,
          message: "Cập nhật trạng thái thất bại!",
        });
      }
    } catch (error) {
      res.status(400).json({
        status: false,
        message: error.message,
      });
    }
  }
);

//danh gia
//http://localhost:3000/api/don-hang/danh-gia
router.post("/danh-gia", AuthenToken, async function (req, res, next) {
  try {
    const {
      id_don_hang,
      so_sao,
      danh_gia,
      hinh_anh_danh_gia,
      email,
      ten_user,
      hinh_anh_user,
    } = req.body;
    const result = await DonHangController.danhGia(
      id_don_hang,
      so_sao,
      danh_gia,
      hinh_anh_danh_gia,
      email,
      ten_user,
      hinh_anh_user
    );
    if (isNaN(result)) {
      res.status(200).json({
        status: true,
        message: "Đánh giá thành công!",
        result: result,
      });
    } else if (result === 10) {
      res.status(200).json({
        status: false,
        message: "Đơn hàng đã được đánh giá!",
      });
    } else if (result === 100) {
      res.status(200).json({
        status: false,
        message: "không tìm thấy đơn hàng!",
      });
    } else if (result === 1000) {
      res.status(200).json({
        status: false,
        message: "Đơn hàng chưa được giao!",
      });
    } else {
      res.status(200).json({
        status: false,
        message: "Đánh giá thất bại!",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

module.exports = router;
