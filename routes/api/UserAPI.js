var express = require('express');
var router = express.Router();
const userController = require('../../components/User/ControllerUser');
const AuthenToken = require('../../components/MiddleWare/AuthenToken');
const serviceUser = require('../../components/User/ServiceUser');


//login cpanel
//http://localhost:3000/users/login-cpanel
router.post('/login-cpanel', async (req, res, next) => {
    try {
        const { tai_khoan, mat_khau } = req.body;
        const result = await serviceUser.loginCpanel(tai_khoan, mat_khau);
        if (result) {
        res.status(200).json({ trang_thai: true, data: { id_user : result.user._id, token: result.token } });
        } else {
        res.status(200).json({ trang_thai: false, message: 'Đăng nhập thất bại' });
        }
    } catch (error) {
        res.status(400).json({ trang_thai: false, message: error.message });
    }
});

//thêm lịch sử tìm kiếm
//http://localhost:3000/users/them-lich-su-tim-kiem
router.post('/them-lich-su-tim-kiem', AuthenToken, async (req, res, next) => {
    try {
        const { id_user, tu_khoa } = req.body;
        const result = await userController.themLichSuTimKiem(id_user, tu_khoa);
        if (result) {
        res.status(200).json({ 
            trang_thai: true, 
            data: result });
        } else {
        res.status(200).json({ 
            trang_thai: false, 
            message: 'Thêm lịch sử tìm kiếm thất bại' });
        }
    } catch (error) {
        res.status(400).json({ 
            trang_thai: false, 
            message: error.message });
    }
});

//xóa lịch sử tìm kiếm
//http://localhost:3000/users/xoa-lich-su-tim-kiem
router.post('/xoa-lich-su-tim-kiem', AuthenToken, async (req, res, next) => {
    try {
        const { id_user, tu_khoa } = req.body;
        const result = await userController.xoaLichSuTimKiem(id_user, tu_khoa);
        if (result) {
        res.status(200).json({ 
            trang_thai: true, 
            message: 'Xóa lịch sử tìm kiếm thành công' });
        } else {
        res.status(200).json({ 
            trang_thai: false, 
            message: 'Xóa lịch sử tìm kiếm thất bại' });
        }
    } catch (error) {
        res.status(400).json({ 
            trang_thai: false, 
            message: error.message });
    }
});

//dùng điểm
//http://localhost:3000/users/dung-diem
router.post('/dung-diem', AuthenToken ,async (req, res, next) => {
    try {
        const { id_user, diem } = req.body;
        const result = await userController.suDungDiem(id_user, diem);
        if (result) {
        res.status(200).json({ 
            trang_thai: true, 
            data: result });
        } else {
        res.status(200).json({ 
            trang_thai: false, 
            message: 'Dùng điểm thất bại' });
        }
    } catch (error) {
        res.status(400).json({ 
            trang_thai: false, 
            message: error.message });
    }
});
//lịch sử dùng điểm
//http://localhost:3000/users/lich-su-dung-diem
router.post('/lich-su-dung-diem', AuthenToken, async (req, res, next) => {
    try {
        const { id_user } = req.body;
        const result = await userController.layLichSuDiem(id_user);
        if (result) {
        res.status(200).json({ 
            trang_thai: true, 
            data: result });
        } else {
        res.status(200).json({ 
            trang_thai: false, 
            message: 'Lịch sử dùng điểm thất bại' });
        }
    } catch (error) {
        res.status(400).json({ 
            trang_thai: false, 
            message: error.message });
    }
});


//tích điểm
//http://localhost:3000/users/tich-diem
router.post('/tich-diem', AuthenToken, async (req, res, next) => {
    try {
        const { id_user, tich_diem } = req.body;
        const result = await userController.tichDiem(id_user, tich_diem);
        if (result) {
        res.status(200).json({ 
            trang_thai: true, 
            data: result });
        } else {
        res.status(200).json({ 
            trang_thai: false, 
            message: 'Tích điểm thất bại' });
        }
    } catch (error) {
        res.status(400).json({ 
            trang_thai: false, 
            message: error.message });
    }
});

//chỉnh địa chỉ mặc định
//http://localhost:3000/users/sua-dia-chi-mac-dinh
router.post('/sua-dia-chi-mac-dinh', AuthenToken, async (req, res, next) => {
    try {
        const { id_user, id_dia_chi } = req.body;
        const result = await userController.chinhDiaChiMacDinh(id_user, id_dia_chi);
        if (result) {
        res.status(200).json({ 
            trang_thai: true, 
            message: 'Chỉnh địa chỉ mặc định thành công' });
        } else {
        res.status(200).json({ 
            trang_thai: false, 
            message: 'Chỉnh địa chỉ mặc định thất bại' });
        }
    } catch (error) {
        res.status(400).json({ trang_thai: false, message: error.message });
    }
});

//xóa địa chỉ
//http://localhost:3000/users/xoa-dia-chi 
router.post('/xoa-dia-chi', AuthenToken, async (req, res, next) => {
    try {
        const { id_user, id_dia_chi } = req.body;
        const result = await userController.xoaDiaChi(id_user, id_dia_chi);
        if (result) {
        res.status(200).json({ 
            trang_thai: true, 
            message: 'Xóa địa chỉ thành công' });
        } else {
        res.status(200).json({ 
            trang_thai: false, 
            message: 'Xóa địa chỉ thất bại' });
        }
    } catch (error) {
        res.status(400).json({ 
            trang_thai: false, 
            message: error.message });
    }
});

//sửa địa chỉ
//http://localhost:3000/users/sua-dia-chi
router.post('/sua-dia-chi', AuthenToken, async (req, res, next) => {
    try {
        const { id_user, id_dia_chi, ten_dia_chi, so_dien_thoai , so_nha, tinh, nguoi_nhan,latitude, longitude } = req.body;
        const result = await userController.suaDiaChi(id_user, id_dia_chi, ten_dia_chi, so_dien_thoai , so_nha, tinh, nguoi_nhan,latitude, longitude);
        if (result) {
        res.status(200).json({ 
            trang_thai: true, 
            message: 'Sửa địa chỉ thành công' });
        } else {
        res.status(200).json({ 
            trang_thai: false, 
            message: 'Sửa địa chỉ thất bại' });
        }
    } catch (error) {
        res.status(400).json({ 
            trang_thai: false, 
            message: error.message });
    }
});

//thêm địa chỉ
//http://localhost:3000/users/them-dia-chi
router.post('/them-dia-chi', AuthenToken, async (req, res, next) => {
    try {
        const { id_user, ten_dia_chi, so_dien_thoai , so_nha, tinh, nguoi_nhan,latitude, longitude } = req.body;
        const result = await userController.themDiaChi(id_user, ten_dia_chi, so_dien_thoai , so_nha, tinh, nguoi_nhan, latitude, longitude);
        if (result) {
        res.status(200).json({ 
            trang_thai: true, 
            message: 'Thêm địa chỉ thành công' });
        } else {
        res.status(200).json({ 
            trang_thai: false, 
            message: 'Thêm địa chỉ thất bại' });
        }
    } catch (error) {
        res.status(400).json({ 
            trang_thai: false, 
            message: error.message });
    }
});

//lấy thông tin 1 user
//http://localhost:3000/users/lay-thong-tin-user
router.get('/lay-thong-tin-user/:id_user', AuthenToken, async (req, res, next) => {
    try {
        const { id_user } = req.params;
        const result = await userController.layThongTinUser(id_user);
        if (result) {
        res.status(200).json({ 
            trang_thai: true, 
            data: result });
        } else {
        res.status(200).json({ 
            trang_thai: false, 
            message: 'Lấy thông tin user thất bại' });
        }
    } catch (error) {
        res.status(400).json({ 
            trang_thai: false, 
            message: error.message });
    }
});


//lấy thông tin tất cả user
//http://localhost:3000/users/lay-thong-tin-tat-ca-user
router.get('/lay-thong-tin-tat-ca-user', async (req, res, next) => {
    try {
        const result = await userController.layThongTinTatCaUser();
        if (result) {
        res.status(200).json({ 
            trang_thai: true, 
            data: result });
        } else {
        res.status(200).json({ 
            trang_thai: false, 
            message: 'Lấy thông tin tất cả user thất bại' });
        }
    } catch (error) {
        res.status(400).json({ 
            trang_thai: false, 
            message: error.message });
    }
});

//sửa user
//http://localhost:3000/users/sua-user
router.post('/sua-user', AuthenToken, async (req, res, next) => {
    try {
        const { id_user, ho_ten, avatar, email, so_dien_thoai, device_token } = req.body;
        const result = await userController.suaThongTinUser(id_user, ho_ten, avatar , email, so_dien_thoai, device_token);
        if (result) {
        res.status(200).json({ 
            trang_thai: true, 
            data: result });
        } else {
        res.status(200).json({ 
            trang_thai: false, 
            message: 'Sửa user thất bại' });
        }
    } catch (error) {
        res.status(400).json({ 
            trang_thai: false, 
            message: error.message });
    }
});

//đổi mật khẩu
//http://localhost:3000/users/doi-mat-khau
router.post('/doi-mat-khau', AuthenToken, async (req, res, next) => {
    try {
        const { id_user, mat_khau_cu, mat_khau_moi } = req.body;
        const result = await userController.doiMatKhau(id_user, mat_khau_cu, mat_khau_moi);
        if (result) {
        res.status(200).json({ trang_thai: true, message: 'Đổi mật khẩu thành công' });
        } else {
        res.status(200).json({ trang_thai: false, message: 'Đổi mật khẩu thất bại' });
        }
    } catch (error) {
        res.status(400).json({ trang_thai: false, message: error.message });
    }
});
//xóa user
//http://localhost:3000/users/xoa-user
router.post('/xoa-tai-khoan', AuthenToken, async (req, res, next) => {
    try {
        const { id_user } = req.body;
        const result = await userController.xoaTaiKhoan(id_user);
        if (result) {
        res.status(200).json({ trang_thai: true, message: 'Xóa user thành công' });
        } else {
        res.status(200).json({ trang_thai: false, message: 'Xóa user thất bại' });
        }
    } catch (error) {
        res.status(400).json({ trang_thai: false, message: error.message });
    }
});


//đăng nhập bằng số điện thoại
//http://localhost:3000/users/dang-nhap-sdt
router.post('/dang-nhap-sdt', async (req, res, next) => {
    try {
        const { so_dien_thoai, mat_khau } = req.body;
        const result = await userController.dangNhapBangSoDienThoai(so_dien_thoai, mat_khau);
        if (result) {
        res.status(200).json({ trang_thai: true, data: result._id });
        } else {
        res.status(200).json({ trang_thai: false, message: 'Đăng nhập thất bại' });
        }
    } catch (error) {
        res.status(400).json({ trang_thai: false, message: error.message });
    }
});

//đăng ký bằng số điện thoại
//http://localhost:3000/users/dang-ky-sdt
router.post('/dang-ky-sdt', async (req, res, next) => {
    try {
        const { so_dien_thoai, mat_khau, ho_ten } = req.body;
        const result = await userController.dangKyBangSoDienThoai(so_dien_thoai, mat_khau, ho_ten);
        if (result) {
        res.status(200).json({ trang_thai: true , message: 'Đăng ký thành công'});
        } else {
        res.status(200).json({ trang_thai: false, message: 'Số điện thoại bị trùng' });
        }
    } catch (error) {
        res.status(400).json({ trang_thai: false, message: error.message });
    }
});

//login email
//http://localhost:3000/users/dang-nhap-email
router.post('/dang-nhap-email', async (req, res, next) => {
    try {
        const { email, avatar, ho_ten } = req.body;
        const result = await userController.loginEmail(email, avatar, ho_ten);
        if (result) {
        res.status(200).json({ trang_thai: true, data: result});
        } else {
        res.status(200).json({ trang_thai: false, message: 'Đăng nhập bằng email thất bại' });
        }
    } catch (error) {
        res.status(400).json({ trang_thai: false, message: error.message });
    }
});
//đăng ký bằng username
//http://localhost:3000/users/dang-ky-username
router.post('/dang-ky-username', async (req, res, next) => {
    try {
        const { tai_khoan, mat_khau, ho_ten } = req.body;
        const result = await userController.dangKyBangUsername(tai_khoan, mat_khau, ho_ten);
        if (result) {
        res.status(200).json({ trang_thai: true , message: 'Đăng ký thành công'});
        } else {
        res.status(200).json({ trang_thai: false, message: 'Tài khoản bị trùng' });
        }
    } catch (error) {
        res.status(400).json({ trang_thai: false, message: error.message });
    }
});

//đăng nhập bằng username
//http://localhost:3000/users/dang-nhap-username
router.post('/dang-nhap-username', async (req, res, next) => {
    try {
        const { tai_khoan, mat_khau } = req.body;
        const result = await userController.dangNhapBangUsername(tai_khoan, mat_khau);
        if (result) {
        res.status(200).json({ trang_thai: true, data: result });
        } else {
        res.status(200).json({ trang_thai: false, message: 'Tài khoản hoặc mật khẩu không đúng' });
        }
    } catch (error) {
        res.status(400).json({ trang_thai: false, message: error.message });
    }
});

//http://localhost:3000/users/send-otp
router.post('/gui-otp', async (req, res, next)=> {
    try {
      const {email} = req.body;
      console.log('email: ',email);
      const result = await userController.sendOTP(email);
      console.log('result: ',result);
      if(result){
        res.status(200).json({status: 1, notification: "Gửi mã otp thành công"});
      }else{
        res.status(200).json({status: 0, notification: "Gửi mã otp không thành công"});
      }
    } catch (error) {
      console.log ('Gửi otp lỗi: ',error);
      res.status(400).json({status: 0, message: "Gửi mã otp lỗi" + error.message})
    }
  });
//kiểm tra otp
//http://localhost:3000/users/kiem-tra-otp
router.post('/kiem-tra-otp', async (req, res, next)=> {
    try {
      const {email, otp} = req.body;
      console.log('email: ',email);
      const result = await userController.kiemTraOTP(email, otp);
      console.log('result: ',result);
      if(result){
        res.status(200).json({status: 1, notification: "Kiểm tra mã otp thành công"});
      }else{
        res.status(200).json({status: 0, notification: "Kiểm tra mã otp không thành công"});
      }
    } catch (error) {
      console.log ('Kiểm tra otp lỗi: ',error);
      res.status(400).json({status: 0, message: "Kiểm tra mã otp lỗi" + error.message})
    }
  });

//đổi mk bằng otp 
//http://localhost:3000/users/doi-mat-khau-otp
router.post('/doi-mat-khau-otp', async (req, res, next) => {
    try {
        const { email, mat_khau,otp } = req.body;
        const result = await userController.doiMatKhauOTP(email, mat_khau,otp);
        if (result) {
        res.status(200).json({ trang_thai: true, data: result._id });
        } else {
        res.status(200).json({ trang_thai: false, message: 'Đổi mật khẩu thất bại' });
        }
    } catch (error) {
        res.status(400).json({ trang_thai: false, message: error.message });
    }
});



module.exports = router;