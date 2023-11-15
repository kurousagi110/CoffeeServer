const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const admin = require("firebase-admin");
const express = require("express");
const modelDonHang = require('../DonHang/ModelDonHang')
const modelUser = require('../User/ModelUser')

const serviceAccount = require("../../login-143c8-firebase-adminsdk-mgzik-6009768ec8.json");

initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: "login-143c8",
});

// send notification new product to all device
const sendNotificationNewProduct = async (san_pham) => {
  const topic = "new_product";

  try {
    let imageUrl = "";
    if (san_pham.hinh_anh_sp.length > 0) {
      imageUrl = san_pham.hinh_anh_sp[0].hinh_anh_sp;
    }

    const message = {
      notification: {
        title: `Coffee.Love`,
        body: "Coffee.Love vừa cho ra sản phẩm mới đó",
        image: imageUrl,
      },
      data: {
        type: "ProductDetail",
        title: "Coffee.Love",
        message: "Coffee.Love vừa cho ra sản phẩm mới đó",
        bigText: `${san_pham.ten_san_pham} là sản phẩm mới nhất của Coffee.Love đó, thử ngay nhé.`,
        image: imageUrl,
      },
      topic: topic,
    };

    getMessaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
        return false;
      });

    return true;
  } catch (error) {
    console.log("ERROR NOTIFICATION NEW PRODUCT: ", error);

    return false;
  }
};

// gửi thông báo trạng thái đơn hàng cho thiết bị cụ thể (đang vận chuyển)
const sendNotificationOrderStatusDelivering = async ({ id_don_hang }) => {
  console.log("ID DON HANG: ", id_don_hang);

  const donHang = await modelDonHang.findById(id_don_hang);
  console.log("DON HANG: ", donHang);

  const user = await modelUser.findById(donHang.id_user);
  console.log("USER: ", user);
  
  try {
    // một chút nhớ đổi sản phẩm thành đơn hàng
    let imageUrl = "";
    if (san_pham.hinh_anh_sp.length > 0) {
      imageUrl = san_pham.hinh_anh_sp[0].hinh_anh_sp;
    }

    const message = {
      notification: {
        title: `Coffee.Love`,
        body: "Đơn hàng của bạn đang được giao đến bạn đó",
        image: imageUrl,
      },
      data: {
        type: "OrderStatus",
        title: "Coffee.Love",
        message: "Đơn hàng của bạn đang được giao đến bạn đó",
        bigText: `${san_pham.ten_san_pham} là sản phẩm mới nhất của Coffee.Love đó, thử ngay nhé.`,
        image: imageUrl,
      },
      token: "",
    };

    getMessaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
        return false;
      });

    return true;
  } catch (error) {
    console.log("ERROR NOTIFICATION DELIVERING: ", error);

    return false;
  }
};

module.exports = { sendNotificationNewProduct, sendNotificationOrderStatusDelivering };
