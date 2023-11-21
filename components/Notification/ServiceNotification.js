const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getMessaging } = require("firebase-admin/messaging");
const admin = require("firebase-admin");
const express = require("express");
const modelDonHang = require("../DonHang/ModelDonHang");
const modelUser = require("../User/ModelUser");
const modalNotification = require("./ModelNotification");

const serviceAccount = require("../../login-143c8-firebase-adminsdk-mgzik-6009768ec8.json");
const { default: mongoose } = require("mongoose");

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
const sendNotificationOrderStatusDelivering = async ({ don_hang }) => {
  console.log("ID DON HANG: ", don_hang);

  const user = await modelUser.findById(don_hang.id_user);
  console.log("USER: ", user.device_token);

  try {
    // một chút nhớ đổi sản phẩm thành đơn hàng
    // let imageUrl = "https://dogifood.vn/Images/product/2201050907-ca-phe-den-da.webp";
    //=====================
    if (don_hang.san_pham.length > 0) {
      imageUrl = don_hang.san_pham[0].hinh_anh_sp;
      console.log("URL IMAGE: ", imageUrl);
    }

    const message = {
      notification: {
        title: `${user.ho_ten} ơi`,
        body: "Đơn hàng của bạn đang được giao đến bạn đó",
        image: imageUrl,
      },
      data: {
        type: "OrderDelivering",
        title: `${user.ho_ten} ơi`,
        message: "Đơn hàng của bạn đang được giao đến bạn đó",
        bigText: `Bạn đợi nhé, đơn hàng đang giao đến bạn trong thời gian sớm nhất`,
        image: imageUrl,
      },
      token: user.device_token,
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

// gửi thông báo trạng thái đơn hàng cho thiết bị cụ thể (đã giao hàng)
const sendNotificationOrderStatusArrived = async ({ don_hang }) => {
  console.log("ID DON HANG: ", don_hang);

  const user = await modelUser.findById(don_hang.id_user);
  console.log(
    "USER: ",
    user.ho_ten,
    " ===== ",
    user.email,
    " ===== ",
    user.avatar
  );

  try {
    // một chút nhớ đổi sản phẩm thành đơn hàng
    // let imageUrl = "https://dogifood.vn/Images/product/2201050907-ca-phe-den-da.webp";
    //=====================
    if (don_hang.san_pham.length > 0) {
      imageUrl = don_hang.san_pham[0].hinh_anh_sp;
      console.log("URL IMAGE: ", imageUrl);
    }
    console.log("DON HANG: ", don_hang._id.toString());
    console.log("USER: ", don_hang.id_user);

    const message = {
      notification: {
        title: `${user.ho_ten} ơi`,
        body: "Đơn hàng đã giao thành công",
        image: imageUrl,
      },
      data: {
        type: "OrderArrived",
        title: `${user.ho_ten} ơi`,
        message: "Đơn hàng của bạn đã giao thành công",
        bigText: `Cảm ơn bạn đã tin tưởng vào Coffee.Love`,
        idDonHang: don_hang._id.toString(),

        email: user.email,
        tenUser: user.ho_ten,
        avatar: user.avatar,

        image: imageUrl,
      },
      token: user.device_token,
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

// add nofication base on user
const addNotificationToSpecificDevice = async ({
  id_user,
  image,
  title,
  id_product,
  message,
  type,
}) => {
  // image, title, message, type, id_user
  try {
    const result = await modalNotification.findOne({ id_user: id_user });
    if (!result) {
      // If the document doesn't exist, create a new one
      const newNotification = new modalNotification({
        _id: new mongoose.Types.ObjectId(),
        id_user: id_user,
        notification: [
          {
            _id: new mongoose.Types.ObjectId(),
            image: image,
            title: title,
            id_product: id_product,
            message: message,
            type: type,
            isRead: false,
          },
        ],
      });

      await newNotification.save(); // Save the new document
      return true;
    } else {
      const updateNotification = await modalNotification.findOneAndUpdate(
        { id_user: id_user },
        {
          $push: {
            notification: {
              image: image,
              title: title,
              id_product: id_product,
              message: message,
              type: type,
              isRead: false,
            },
          },
        },
        { new: true }
      );
      return true;
    }
  } catch (error) {
    console.log("ERROR ADD NOTIFICATION: ", error);
    return false;
  }
};

const addNotificationToAllUser = async ({
  image,
  title,
  id_product,
  message,
  type,
}) => {
  try {
    const result = await modalNotification.updateMany(
      {},
      {
        $push: {
          notification: {
            image: image,
            title: title,
            id_product: id_product,
            message: message,
            type: type,
            isRead: false,
          },
        },
      }
    );
    
    return true;
  } catch (error) {
    console.log("ERROR AT ADD NOTIFICATION TO ALL USER: ", error);
    return false;
  }
};

const getAllNotification = async ({ id_user }) => {
  try {
    const result = await modalNotification.findOne({ id_user: id_user });
    if (!result) {
      return false;
    } else {
      return result.notification;
    }
  } catch (error) {
    console.log("ERROR GET ALL NOTIFICATION: ", error);
    return false;
  }
};

module.exports = {
  sendNotificationNewProduct,
  sendNotificationOrderStatusDelivering,
  sendNotificationOrderStatusArrived,
  addNotificationToSpecificDevice,
  getAllNotification,
  addNotificationToAllUser,
};
