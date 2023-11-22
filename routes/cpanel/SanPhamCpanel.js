var express = require("express");
var router = express.Router();
const AuthenWeb = require("../../components/MiddleWare/AuthenWeb");
const sanphamController = require("../../components/SanPham/ControllerSanPham");
const jwt = require("jsonwebtoken");
const upload = require("../../components/MiddleWare/uploadMultiFile");
const loaiSanPhamController = require("../../components/LoaiSanPham/ControllerLoaiSanPham");
const Swal = require("sweetalert2");
const { uploadImageToS3 } = require('../cpanel/uploadImageToS3FromClient');
const {
  addNotificationToAllUser,
  sendNotificationNewProduct,
} = require("../../components/Notification/ServiceNotification");


//http://localhost:3000/cpanel/san-pham
router.get("/", [AuthenWeb], async function (req, res, next) {
  try {
    let sanpham = await sanphamController.getAllSanPham();
    let stt = 1;
    for (let i = 0; i < sanpham.length; i++) {
      sanpham[i].stt = stt;
      stt++;
    }
    res.render("sanpham/sanpham", { sanpham });
  } catch (err) {
    console.log(err);
    res.render("sanpham/sanpham", { sanpham: [] });
  }
});

//hiển thị trang thêm sản phẩm
//http://localhost:3000/cpanel/san-pham/them-san-pham
router.get("/them-san-pham", [AuthenWeb], async function (req, res, next) {
  try {
    const loai_san_pham = await loaiSanPhamController.layTatCaLoaiSanPham();
    console.log(loai_san_pham);
    res.render("sanpham/themsanpham", { loai_san_pham });
  } catch (err) {
    console.log(err);
    res.render("sanpham/themsanpham");
  }
});

//thêm sản phẩm
//http://localhost:3000/cpanel/san-pham/them-san-pham
router.post(
  "/them-san-pham",
  [AuthenWeb, upload],
  async function (req, res, next) {
    try {
      let { ten_san_pham, loai_san_pham, mo_ta } = req.body;
      let files = req.files; // 'files' since you used upload.array

      let sizes = JSON.parse(req.body.sizes);

      let hinh_anh_sp = [];
      if (files && files.length > 0) {
        // hinh_anh_sp = files.map(file => ({
        //     hinh_anh_sp: `http://localhost:3000/images/${encodeURIComponent(file.filename)}`
        // }));

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
          hinh_anh_sp = keys
        } catch (error) {
          console.log("Error:", error);
        }
      }

      const result_loai_san_pham = await loaiSanPhamController.layLoaiSanPhamTheoId(loai_san_pham);

      const san_pham = {
        ten_san_pham,
        result_loai_san_pham,
        size: sizes,
        mo_ta,
        hinh_anh_sp,
      };
      const sanpham = await sanphamController.themSanPhamAll(san_pham);
      console.log("sanpham", sanpham);
      if (sanpham) {
        console.log("SUCCESS TO ADD PRODUCT");
        res.status(200).json({ result: 'success' });
        const resultSendNotification = await sendNotificationNewProduct(san_pham);
        const resultAddNotification = await addNotificationToAllUser({
          image: hinh_anh_sp[0].hinh_anh_sp,
          title: san_pham.ten_san_pham,
          id_product: sanpham._id,
          message: "Coffee.Love vừa cho ra sản phẩm mới đó",
          type: "NewProduct",
        });
        if (!resultSendNotification) {
          console.log("FAIL TO FIREBASE SEND NEW MESSAGE TO ALL DEVICE");
        } else {
          console.log("SUCCESS TO FIREBASE SEND NEW MESSAGE TO ALL DEVICE");
        }
        if (!resultAddNotification) {
          console.log("FAIL TO ADD NOTIFICATION TO ALL USER");
        } else {
          console.log("SUCCESS TO ADD NOTIFICATION TO ALL USER");
        }
        
      } else {
        const loai_san_pham = await loaiSanPhamController.layTatCaLoaiSanPham();
        res.status(300).render('sanpham/themsanpham', { loai_san_pham });
      }
    } catch (err) {
      console.log(err);
      const loai_san_pham = await loaiSanPhamController.layTatCaLoaiSanPham();
      res.status(400).render('sanpham/themsanpham', { loai_san_pham });
    }
  });

//sửa sản phẩm
//http://localhost:3000/cpanel/san-pham/sua-san-pham/:id
router.get('/sua-san-pham/:id', [AuthenWeb], async function (req, res, next) {
  try {
    const id = req.params.id;
    let san_pham = await sanphamController.getSanPhamById(id);
    const loai_san_pham = await loaiSanPhamController.layTatCaLoaiSanPham();
    for (let i = 0; i < san_pham.size.length; i++) {
      san_pham.size[i].stt = i + 1;
    }
    res.status(200).render('sanpham/suasanpham', { san_pham, loai_san_pham });
  } catch (err) {
    console.log(err);
    res.status(500).render('sanpham/suasanpham');
  }
});

//sửa sản phẩm
//http://localhost:3000/cpanel/san-pham/sua-san-pham/:id
router.post('/sua-san-pham/:id', [AuthenWeb, upload], async function (req, res, next) {
  try {
    let { ten_san_pham, loai_san_pham, mo_ta } = req.body;
    let files = req.files; // 'files' since you used upload.array
    let id = req.params.id;
    console.log("size", req.body.sizes);
    let sizes = JSON.parse(req.body.sizes);
    let hinh_anh_sp = [];
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
          hinh_anh_sp = keys
        } catch (error) {
          console.log("Error:", error);
        }
    }

    const result_loai_san_pham = await loaiSanPhamController.layLoaiSanPhamTheoId(loai_san_pham);
    // gửi thông báo có sản phẩm mới cho tất cả thiết bị
    const san_pham = {
      ten_san_pham,
      result_loai_san_pham,
      mo_ta,
      hinh_anh_sp,
      size: sizes
    };
    console.log("san_pham", san_pham);
    const sanpham = await sanphamController.suaSanPhamAll(id, san_pham);
    console.log("sanpham", sanpham);

    if (sanpham) {
      console.log("SUCCESS TO EDIT PRODUCT");
      res.status(200).json({ result: 'success' });
    } else {
      res.status(300).render('sanpham/suasanpham');
    }
  } catch (err) {
    console.log(err);
    res.status(400).render('sanpham/suasanpham');
  }
});

//xóa sản phẩm
//http://localhost:3000/cpanel/san-pham/xoa-san-pham/:id
router.get('/xoa-san-pham/:id', [AuthenWeb], async function (req, res, next) {
  try {
    const id = req.params.id;
    const sanpham = await sanphamController.xoaSanPham(id);

    if (sanpham) {
      res.status(200).json({ result: 'success' });
    } else {
      res.status(200).json({ result: 'failure' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ result: 'error' });
  }
});




module.exports = router;
