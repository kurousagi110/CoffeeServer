var express = require("express");
var router = express.Router();
const AuthenWeb = require("../../components/MiddleWare/AuthenWeb");
const chiNhanhController = require("../../components/ChiNhanh/ControllerChiNhanh");
const jwt = require("jsonwebtoken");
const upload = require("../../components/MiddleWare/uploadMultiFile");
const toppingService = require("../../components/Topping/ServiceTopping");
const Swal = require("sweetalert2");
const { uploadImageToS3 } = require('../cpanel/uploadImageToS3FromClient');
const {
  addNotificationToAllUser,
  sendNotificationNewProduct,
} = require("../../components/Notification/ServiceNotification");


//hien thi trang topping
router.get("/", [AuthenWeb], async (req, res) => {
  let topping = await toppingService.layTatCaTopping();
  let stt = 1;
  for (let i = 0; i < topping.length; i++) {
    topping[i].stt = stt;
    stt++;
  }
  res.render("topping/topping", { topping });
});

//hien thi trang them topping
router.get("/them-topping", [AuthenWeb], async (req, res) => {
  res.render("topping/themtopping");
});


//them topping
router.post("/them-topping", [AuthenWeb, upload], async (req, res) => {
  try {
    let { ten_topping, mo_ta, gia } = req.body;
    let files = req.files; // 'files' since you used upload.array
    console.log("file upload: " + files);
    let hinh_anh_topping = [];
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
        hinh_anh_topping = keys.map(item => ({
          hinh_anh_topping: item.hinh_anh_sp
        }));
        console.log("hinh anh topping: " + hinh_anh_topping);
      } catch (error) {
        console.log("Error:", error);

      }
    }

    let topping = await toppingService.themTopping(ten_topping, gia, hinh_anh_topping, mo_ta);
    if (topping) {
      res.status(200).json({ result: 'success' });
    } else {
      res.status(300).json({ result: 'fail' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 'fail' });
  }
});


//hien thi trang sua topping
router.get("/sua-topping/:id", [AuthenWeb], async (req, res) => {
  let id = req.params.id;
  let topping = await toppingService.layToppingTheoId(id);
  res.render("topping/suatopping", { topping });
});

//sua topping
router.post("/sua-topping/:id", [AuthenWeb, upload], async (req, res) => {
  try {
    let id = req.params.id;
    let { ten_topping, mo_ta, gia } = req.body;
    let files = req.files; // 'files' since you used upload.array
    console.log("file upload: " + files);
    let hinh_anh_topping = [];
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
        hinh_anh_topping = keys.map(item => ({
          hinh_anh_topping: item.hinh_anh_sp
        }));
        console.log("hinh anh topping: " + hinh_anh_topping);
      } catch (error) {
        console.log("Error:", error);

      }
    }

    let topping = await toppingService.suaTopping(id, ten_topping, gia, hinh_anh_topping, mo_ta);
    if (topping) {
      res.status(200).json({ result: 'success' });
    } else {
      res.status(300).render("topping/suatopping", { topping });
    }
  } catch (err) {
    console.log(err);
    res.status(500).render("topping/suatopping", { topping });
  }
});


//xoa topping
router.get("/xoa-topping/:id", [AuthenWeb], async (req, res) => {
  try {
    let id = req.params.id;
    let topping = await toppingService.xoaTopping(id);
    console.log("xoa topping: " + topping);
    if (topping) {
      res.status(200).json({ result: 'success' });
    } else {
      console.log("xoa topping that bai");
      res.status(300).json({ result: 'fail' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ result: 'fail' });
  }
});








module.exports = router;