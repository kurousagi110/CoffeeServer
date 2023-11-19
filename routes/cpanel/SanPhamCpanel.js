var express = require("express");
var router = express.Router();
const AuthenWeb = require("../../components/MiddleWare/AuthenWeb");
const sanphamController = require("../../components/SanPham/ControllerSanPham");
const jwt = require("jsonwebtoken");
const upload = require("../../components/MiddleWare/uploadMultiFile");
const loaiSanPhamController = require("../../components/LoaiSanPham/ControllerLoaiSanPham");
const Swal = require("sweetalert2");
const { uploadData } = require("aws-amplify/storage");
const { v4: uuidv4 } = require("uuid");

//http://localhost:3000/cpanel/san-pham
router.get("/", [AuthenWeb], async function (req, res, next) {
  try {
    const sanpham = await sanphamController.getAllSanPham();
    res.render("sanpham/sanpham", { sanpham });
  } catch (err) {
    console.log(err);
    res.render("sanpham/sanpham", { sanpham: [] });
  }
});

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

//http://localhost:3000/cpanel/san-pham/them-san-pham
router.post(
  "/them-san-pham",
  [AuthenWeb, upload],
  async function (req, res, next) {
    try {
      let { ten_san_pham, loai_san_pham, mo_ta } = req.body;
      let files = req.files; // 'files' since you used upload.array

      console.log("files", files);
      console.log("ten_san_pham", ten_san_pham);
      console.log("loai_san_pham", loai_san_pham);
      console.log("mo_ta", mo_ta);
      console.log("req.body", req.body.sizes);
      console.log("req.body", req.body);
      let sizes = JSON.parse(req.body.sizes);

      let hinh_anh_sp = [];
      if (files && files.length > 0) {
        // hinh_anh_sp = files.map(file => ({
        //     hinh_anh_sp: `http://localhost:3000/images/${encodeURIComponent(file.filename)}`
        // }));

        try {
          const uploadPromises = files.map(async (file) => {
            const result = await uploadData({
              key: uuidv4(),
              data: file.path,
              options: {
                accessLevel: "public", // Change this according to your requirements
                bucket: "public-coffeelove", // Change this according to your requirements
              },
            })
            console.log(`Succeeded for :`, result.result);
            // return { hinh_anh_sp: result.result };
          });

          // Wait for all uploads to complete
          const uploadResults = await Promise.all(uploadPromises);

          console.log("All uploads completed:", uploadResults);
          // return;
          // hinh_anh_sp = uploadResults;
        } catch (error) {
          console.log("Error:", error);
        }
      }

      const result_loai_san_pham =
        await loaiSanPhamController.layLoaiSanPhamTheoId(loai_san_pham);

      console.log("sizes", sizes);
      console.log("hinh_anh_sp", hinh_anh_sp);

      const san_pham = {
        ten_san_pham,
        result_loai_san_pham,
        size: sizes,
        mo_ta,
        hinh_anh_sp,
      };

      console.log(san_pham);

      const sanpham = await sanphamController.themSanPhamAll(san_pham);

      if (sanpham) {
        // Remove the line below
        // sizes = [];
        res.status(200).redirect("/cpanel/san-pham");
      } else {
        const loai_san_pham = await loaiSanPhamController.layTatCaLoaiSanPham();
        res.status(300).render("sanpham/themsanpham", { loai_san_pham });
      }
    } catch (err) {
      console.log(err);
      const loai_san_pham = await loaiSanPhamController.layTatCaLoaiSanPham();
      res.status(400).render("sanpham/themsanpham", { loai_san_pham });
    }
  }
);

module.exports = router;
