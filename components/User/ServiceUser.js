const userModel = require('./ModelUser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const chiNhanhModel = require('../ChiNhanh/ModelChiNhanh');


//login admin chi nhánh
const loginAdminChiNhanh = async (tai_khoan, mat_khau) => {
    try {
        const user = await userModel.findOne({ tai_khoan: tai_khoan });
        if (user) {
            const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
            if (isMatch) {
                const token = await taoToken(tai_khoan);
                const result = {
                    id_user: user._id,
                    id_chi_nhanh: user.ma_khach_hang,
                    token: token,
                };
                return result;
            }
        }
    } catch (error) {
        console.log('Lỗi tại loginAdminChiNhanh service: ', error)
    }
    return false;
};

//đăng kí admin chi nhánh
const dangKyAdminChiNhanh = async (tai_khoan, mat_khau, id_chi_nhanh) => {
    try {
        const result = await userModel.findOne({ tai_khoan: tai_khoan });
        if (result) {
            return false;
        } else {
            const chi_nhanh = await chiNhanhModel.findOne({ _id: id_chi_nhanh });
            if (!chi_nhanh) {
                return false;
            }
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(mat_khau, salt);
            const user = await userModel.create({
                tai_khoan: tai_khoan,
                mat_khau: hashPassword,
                ma_khach_hang: id_chi_nhanh,
                ho_ten: "Admin chi nhánh " + chi_nhanh.ten_chi_nhanh,
                dia_chi: [],
                tich_diem: 0,
                diem_thanh_vien: 0,
                hang_thanh_vien: "Thành viên mới.",
                voucher_user: [],
                otp: 0,
                status: 1,
                device_token: "",
            });
            return user;
        }
    } catch (error) {
        console.log('Lỗi tại dangKyAdminChiNhanh service: ', error)
    }
    return false;

}



//login cpanel
const loginCpanel = async (tai_khoan, mat_khau) => {
    try {
        console.log('User service loginCpanel: ', tai_khoan, mat_khau);
        let user = await userModel.findOne({ tai_khoan: tai_khoan });
        console.log('User service loginCpanel: ', user);
        if (user.status === 100) {
            const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
            const token = await taoToken(tai_khoan);
            if (isMatch) {
                user = {user, token};
                console.log('User service loginCpanel: ', user);
                return user;
                
            }
        }
    } catch (error) {
        console.log('Lỗi tại loginCpanel service: ', error)
    }
    return false;
};

// Sửa lịch sử tìm kiếm: Thêm từ khóa vào mảng lịch sử
const themLichSuTimKiem = async (id_user, tu_khoa) => {
    try {
        console.log('User service themLichSuTimKiem: ', id_user, tu_khoa);
        const user = await userModel.findOne({ _id: id_user });
        
        if (user) {
            if(user.lich_su.length > 0){
                for(let i = 0; i < user.lich_su.length; i++){
                    if(user.lich_su[i].tu_khoa == tu_khoa){
                        return false;
                    }
                }
            }
            const noi_dung = {
                tu_khoa: tu_khoa,
            }
            user.lich_su.push(noi_dung); 
            await user.save();
            return user;
        }
    } catch (error) {
        console.log('Lỗi tại themLichSuTimKiem service: ', error);
    }
    return false;
};

//xóa lịch sử tìm kiếm
const xoaLichSuTimKiem = async (id_user, tu_khoa) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        console.log('User service xoaLichSuTimKiem: ', user, tu_khoa ,"123213123");
        if (user) {
            for(let i = 0; i < user.lich_su.length; i++){
                if(user.lich_su[i].tu_khoa == tu_khoa){
                    user.lich_su.splice(i, 1);
                    await user.save();
                    return user;
                }
            }
        }
    } catch (error) {
        console.log('Lỗi tại xoaLichSuTimKiem service: ', error);
    }
    return false;
};

//thêm email
const themEmail = async (id_user, email) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            user.email = email;
            await user.save();
            return user;
        }
    } catch (error) {
        console.log('Lỗi tại themEmail service: ', error)
    }
    return false;

};
//sử dụng điểm
const suDungDiem = async (id_user, diem) => {
    try {
        let suDungDiemDate = new Date();
        suDungDiemDate.setHours(suDungDiemDate.getHours() + 7);
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            user.tich_diem -= diem;
            user.doi_diem = {
                ngay_doi: suDungDiemDate,
                so_diem : diem,
            }
            await user.save();
            return user;
        }
    } catch (error) {
        console.log('Lỗi tại suDungDiem service: ', error)
    }
    return false;
};
//lấy lịch sử dùng điểm theo id user
const layLichSuDiem = async (id_user) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            return user.doi_diem;
        }
    } catch (error) {
        console.log('Lỗi tại layLichSuDiem service: ', error)
    }
    return false;
};

//tich diem
const tichDiem = async (id_user, tich_diem) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            user.tich_diem += tich_diem;
            await user.save();
            return user;
        }
    } catch (error) {
        console.log('Lỗi tại tichDiem service: ', error)
    }
    return false;

};

//chỉnh địa chỉ mặc định
const chinhDiaChiMacDinh = async (id_user, id_dia_chi) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            const dia_chi = user.dia_chi.find((item) => item._id == id_dia_chi);
            if (dia_chi) {
                user.dia_chi.forEach((item) => {
                    item.mac_dinh = 0;
                });
                dia_chi.mac_dinh = 1;
                await user.save();
                return user;
            }
        }
    } catch (error) {
        console.log('Lỗi tại chinhDiaChiMacDinh service: ', error)
    }
    return false;
};

//xóa địa chỉ
const xoaDiaChi = async (id_user, id_dia_chi) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            const dia_chiIndex = user.dia_chi.findIndex(item => item._id == id_dia_chi);
            if (dia_chiIndex !== -1) {
                if (user.dia_chi[dia_chiIndex].mac_dinh == 1) {
                    user.dia_chi.splice(dia_chiIndex, 1);
                    user.dia_chi[0].mac_dinh = 1;
                    await user.save();
                    return true;
                }
                user.dia_chi.splice(dia_chiIndex, 1);
                await user.save();
                return true;
            }
        }
    } catch (error) {
        console.log('Lỗi tại xoaDiaChi service: ', error);
    }
    return false;
};


//sửa địa chỉ
const suaDiaChi = async (id_user, id_dia_chi, ten_dia_chi, so_dien_thoai , so_nha, tinh, nguoi_nhan,latitude, longitude  ) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            const dia_chi = user.dia_chi.find((item) => item._id == id_dia_chi);
            if (dia_chi) {
                dia_chi.ten_dia_chi = ten_dia_chi || dia_chi.ten_dia_chi;
                dia_chi.so_dien_thoai = so_dien_thoai || dia_chi.so_dien_thoai;
                dia_chi.so_nha = so_nha || dia_chi.so_nha;
                dia_chi.tinh = tinh || dia_chi.tinh;
                dia_chi.nguoi_nhan = nguoi_nhan || dia_chi.nguoi_nhan;
                dia_chi.latitude = latitude || dia_chi.latitude;
                dia_chi.longitude = longitude || dia_chi.longitude;
                await user.save();
                return user;
            }
        }
    } catch (error) {
        console.log('Lỗi tại suaDiaChi service: ', error)
    }
    return false;

};

//thêm địa chỉ
const themDiaChi = async (id_user, ten_dia_chi, so_dien_thoai , so_nha, tinh , nguoi_nhan, latitude, longitude) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            const dia_chi = {
                ten_dia_chi: ten_dia_chi,
                so_dien_thoai: so_dien_thoai,
                so_nha: so_nha,
                tinh: tinh,
                mac_dinh: 0,
                status: 1,
                nguoi_nhan: nguoi_nhan,
                latitude: latitude,
                longitude: longitude,
            };
            user.dia_chi.push(dia_chi);
            await user.save();
            return user;
        }
    } catch (error) {
        console.log('Lỗi tại themDiaChi service: ', error)
    }
    return false;

};

//lấy thông tin tất cả user
const layThongTinTatCaUser = async () => {
    try {
        const users = await userModel.find({});
        if (users) {
            return users;
        }
    } catch (error) {
        console.log('Lỗi tại layThongTinTatCaUser service: ', error)
    }
    return false;
};

//lấy thông tin 1 user
const layThongTinUser = async (id_user) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            const result = {
                id_user: user._id,
                ma_khach_hang: user.ma_khach_hang,
                tai_khoan: user.tai_khoan,
                email: user.email,
                so_dien_thoai: user.so_dien_thoai,
                ho_ten: user.ho_ten,
                avatar: user.avatar,
                dia_chi: user.dia_chi,
                tich_diem: user.tich_diem,
                doi_diem: user.doi_diem,
                voucher_user: user.voucher_user,
                status: user.status,
                diem_thanh_vien: user.diem_thanh_vien,
                hang_thanh_vien: user.hang_thanh_vien,
                device_token: user.device_token,
            };
            return result;
        }
    } catch (error) {
        console.log('Lỗi tại layThongTinUser service: ', error)
    }
    return false;
};
//sửa thông tin user 
const suaThongTinUser = async (id_user, ho_ten, avatar , email, so_dien_thoai,device_token) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            user.ho_ten = ho_ten || user.ho_ten;
            user.avatar = avatar || user.avatar;
            user.email = email || user.email;
            user.so_dien_thoai = so_dien_thoai || user.so_dien_thoai;
            user.device_token = device_token || user.device_token;
            await user.save();
            return user;
        }
    } catch (error) {
        console.log('Lỗi tại suaThongTinUser service: ', error)
    }
    return false;
};

//đổi mật khẩu
const doiMatKhau = async (id_user, mat_khau_cu, mat_khau_moi) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            const isMatch = await bcrypt.compare(mat_khau_cu, user.mat_khau);
            if (isMatch) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(mat_khau_moi, salt);
                user.mat_khau = hashPassword;
                await user.save();
                return user;
            } else {
                return false;
            }
        }
    } catch (error) {
        console.log('Lỗi tại doiMatKhau service: ', error)
    }
    return false;
};

//xóa tài khoản
const xoaTaiKhoan = async (id_user) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            user.status = 0;
            await user.save();
            return user;
        }
    } catch (error) {
        console.log('Lỗi tại xoaTaiKhoan service: ', error)
    }
    return false;
};
//tạo tài khoản bằng số điện thoại
const dangKyBangSoDienThoai = async (so_dien_thoai, mat_khau, ho_ten) => {
    try {
        const result = await userModel.findOne({ so_dien_thoai: so_dien_thoai });
        if (result) {
            return false;
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(mat_khau, salt);
            const user = await userModel.create({
                so_dien_thoai: so_dien_thoai,
                mat_khau: hashPassword,
                ho_ten: ho_ten,
                dia_chi: [],
                tich_diem: 0,
                voucher_user: [],
                otp: 0,
                status: 1,
                device_token: "",
            });
            return user;
        }
    } catch (error) {
        console.log('Lỗi tại taoTaiKhoanBangSoDienThoai service: ', error)
    }
    return false;
};
// đăng nhập bằng số điện thoại

const dangNhapBangSoDienThoai = async (so_dien_thoai, mat_khau) => {
    try {
        const user = await userModel.findOne({ so_dien_thoai: so_dien_thoai });
        if (user) {
            const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
            if (isMatch) {
                return user;
            }
        }
    } catch (error) {
        console.log('Lỗi tại dangNhapBangSoDienThoai service: ', error)
    }
    return false;
};

//tạo tài khoản bằng username
const dangKyBangUsername = async (tai_khoan, mat_khau, ho_ten) => {
    try {
        const result = await userModel.findOne({ tai_khoan: tai_khoan });
        if (result) {
            return false;
        } else {
            const count = await userModel.countDocuments({});
            let dem = count + 1;
            const ma_khach_hang = "CL" + dem.toString().padStart(9, '0');

            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(mat_khau, salt);
            const user = await userModel.create({
                tai_khoan: tai_khoan,
                mat_khau: hashPassword,
                ho_ten: ho_ten,
                dia_chi: [],
                tich_diem: 0,
                diem_thanh_vien: 0,
                hang_thanh_vien: "Thành viên mới.",
                voucher_user: [],
                otp: 0,
                status: 1,
                ma_khach_hang: ma_khach_hang,
                device_token: "",
                doi_diem: [],
                lich_su: [],
            });
            return user;
        }
    } catch (error) {
        console.log('Lỗi tại taoTaiKhoanBangUsername service: ', error);
        return false;
    }
};

const dangNhapBangUsername = async (tai_khoan, mat_khau) => {
    try {
        const user = await userModel.findOne({ tai_khoan: tai_khoan });
        if (user) {
            const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
            if (isMatch) {
                const token = await taoToken(tai_khoan);
                const result = {
                    id_user: user._id,
                    token: token,
                };
                return result;
            }
        }
    } catch (error) {
        console.log('Lỗi tại dangNhapBangUsername service: ', error)
    }
    return false;
};

//login bằng email
const loginEmail = async (email, avatar, ho_ten) => {
    try {
        let user = await userModel.findOne({ email: email });
        console.log(user);
        const token = await taoToken(email);
        if (user) {
            const result = {
                id_user: user._id,
                token: token,
            };
            return result;
        } else {
            const count = await userModel.countDocuments({});
            let dem = count + 1;
            const ma_khach_hang = "CL" + dem.toString().padStart(9, '0');
            let user1 = await userModel.create({
                email: email,
                avatar: avatar,
                tai_khoan: "",
                mat_khau: "0000",
                ho_ten: ho_ten,
                dia_chi: [],
                tich_diem: 0,
                diem_thanh_vien: 0,
                hang_thanh_vien: "Thành viên mới.",
                doi_diem: [],
                lich_su: [],
                voucher_user: [],
                otp: 0,
                status: 1,
                ma_khach_hang: ma_khach_hang,
                device_token: "",
            });
            console.log(user1, "221312313");
            return { success: true, user: user1 };
        }
    } catch (error) {
        console.log('Lỗi tại login email service: ', error);
        return { success: false, error };
    }
}


//send OTP
const sendOTP = async (email) => {
    try {
        const emailto = email;
        console.log('User service sendOTP: ', emailto);
        console.log('User service sendOTP email: ', email);
        const user = await userModel.findOne({ email: email });
        console.log('User service sendOTP: ', user);
        if (user) {
            const otp = Math.floor(1000 + Math.random() * 9000);
            const mailOptions = {
                from: 'hoatrinh14020@gmail.com',
                to: `${emailto}`, // Set the recipient's email address correctly
                subject: 'Verify your email at Coffee Shop:',
                text: `Your OTP is ${otp}`
            };
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'hoatrinh14020@gmail.com',
                    pass: 'hlof demb mkcg ftes'
                }
            });
            await transporter.sendMail(mailOptions);

            user.otp = otp;
            await user.save();
            console.log('User service sendOTP thành công: ', user);
            return true;
        }
        return false;
    } catch (error) {
        console.log('User service sendOTP lỗi: ', error);
    }
}
//kiem tra OTP
const kiemTraOTP = async (email, otp) => {
    try {
        const user = await userModel.findOne({ email: email });
        console.log('User service kiemTraOTP: ', user);
        if (user) {
            if (user.otp == otp) {
                return true;
            } else
                return false;
        }
    } catch (error) {
        console.log('Lỗi tại kiemTraOTP service: ', error)
    }
    return false;
};
//đổi pass qua otp
const doiMatKhauOTP = async (email, mat_khau, otp) => {
    try {
        const user = await userModel.findOne({ email: email });
        console.log('User service doiMatKhauOTP: ', user);
        if (user) {
            if (user.otp == otp) {
                const salt = await bcrypt.genSalt(10);
                const hashPassword = await bcrypt.hash(mat_khau, salt);
                user.mat_khau = hashPassword;
                user.otp = Math.floor(1000 + Math.random() * 9000);
                await user.save();
                return user;
            } else
                return false;
        }
    } catch (error) {
        console.log('Lỗi tại doiMatKhauOTP service: ', error)
    }
    return false;
};

require('dotenv').config({ path: './.env' });
const taoToken = async (username) => {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    console.log('secret: ',secret);
    const key = "iloveyou"
    const payload = { username: username }; // Đảm bảo payload là một đối tượng
    const token = jwt.sign(
        payload,
        key,
        { expiresIn: '24d' },
    );
    return token;
};

module.exports = {
    sendOTP, loginEmail, dangKyBangUsername,
    dangNhapBangUsername, dangNhapBangSoDienThoai,
    dangKyBangSoDienThoai, layThongTinUser, layThongTinTatCaUser,
    themDiaChi, suaDiaChi, xoaDiaChi, suaThongTinUser, xoaTaiKhoan,
    tichDiem, doiMatKhauOTP, doiMatKhau, suDungDiem, themEmail,
    xoaLichSuTimKiem, themLichSuTimKiem, kiemTraOTP, layLichSuDiem,
    chinhDiaChiMacDinh, loginCpanel , dangKyAdminChiNhanh, loginAdminChiNhanh
};