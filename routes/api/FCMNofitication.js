// const { initializeApp, applicationDefault } = require("firebase-admin/app");
// const { getMessaging } = require("firebase-admin/messaging");
// const admin = require("firebase-admin");
const express = require("express");
const router = express.Router();

// const serviceAccount = require("../../login-143c8-firebase-adminsdk-mgzik-6009768ec8.json");

// initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   projectId: "login-143c8",
// });

// // api send sản phẩm mới
// router.post("/send-new-product", function (req, res) {

//   const topic = "new_product";

//   const receivedToken = req.body.fcmToken;
//   const product_message = "Coffee.Love mới ra sản phẩm mới đó, thử ngay nhé";

//   const message = {
//     // notification: {
//     //   title: `${name} ơi`,
//     //   body: "Coffee.Love vừa cho ra sản phẩm mới đó",
//     // },
//     notification: {
//       title: `Trong ơi`,
//       body: "Coffee.Love vừa cho ra sản phẩm mới đó",
//       image:
//         "https://fastly.picsum.photos/id/829/200/200.jpg?hmac=UR6WfoHy282eoIXjFzEm86pUeBNLQsX71BUthF-sOvM",
//     },
//     data: {
//       type: "ProductDetail",
//       title: "Trọng ơi",
//       message: "Coffee.Love vừa cho ra sản phẩm mới đó",
//       bigText:
//         "Cà phê trứng muối là sản phẩm mới nhất của Coffee.Love đó, thử ngay nhé.",
//       image:
//         "https://fastly.picsum.photos/id/829/200/200.jpg?hmac=UR6WfoHy282eoIXjFzEm86pUeBNLQsX71BUthF-sOvM",
//     },
//     // android: {
//     //   // ttl: 3600,
//     //   notification: {
//     //     icon: icon,
//     //     color: color,
//     //     image: image,
//     //   },
//     // },
//     topic: topic,
//   };

//   getMessaging()
//     .send(message)
//     .then((response) => {
//       res.status(200).json({
//         message: "Successfully sent message",
//         token: receivedToken,
//       });
//       console.log("Successfully sent message:", response);
//     })
//     .catch((error) => {
//       res.status(400);
//       res.send(error);
//       console.log("Error sending message:", error);
//     });
// });

module.exports = router;
