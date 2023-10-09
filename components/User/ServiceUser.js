const userModel = require('./ModelUser');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//sử dụng điểm
const suDungDiem = async (id_user, diem) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            user.tich_diem -= diem;
            await user.save();
            return user;
        }
    } catch (error) {
        console.log('Lỗi tại suDungDiem service: ', error)
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

//xóa địa chỉ
const xoaDiaChi = async (id_user, id_dia_chi) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            const dia_chiIndex = user.dia_chi.findIndex(item => item._id == id_dia_chi);
            if (dia_chiIndex !== -1) {
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
const suaDiaChi = async (id_user, id_dia_chi, ten_dia_chi) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            const dia_chi = user.dia_chi.find((item) => item._id == id_dia_chi);
            if (dia_chi) {
                dia_chi.ten_dia_chi = ten_dia_chi;
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
const themDiaChi = async (id_user, ten_dia_chi) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            const dia_chi = {
                ten_dia_chi: ten_dia_chi,
                status: 1,
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
                tai_khoan: user.tai_khoan,
                email: user.email,
                so_dien_thoai: user.so_dien_thoai,
                ho_ten: user.ho_ten,
                avatar: user.avatar,
                dia_chi: user.dia_chi,
                tich_diem: user.tich_diem,
                voucher_user: user.voucher_user,
                status: user.status,
            };
            return result;
        }
    } catch (error) {
        console.log('Lỗi tại layThongTinUser service: ', error)
    }
    return false;
};
//sửa thông tin user 
const suaThongTinUser = async (id_user, ho_ten, avatar) => {
    try {
        const user = await userModel.findOne({ _id: id_user });
        if (user) {
            user.ho_ten = ho_ten;
            user.avatar = avatar;
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
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(mat_khau, salt);
            const user = await userModel.create({
                tai_khoan: tai_khoan,
                mat_khau: hashPassword,
                ho_ten: ho_ten,
                dia_chi: [],
                tich_diem: 0,
                voucher_user: [],
                otp: 0,
                status: 1,
            });
            return user;
        }
    } catch (error) {
        console.log('Lỗi tại taoTaiKhoanBangUsername service: ', error)
    }
    return false;
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
                id_user : user._id,
                token: token,
            };
            return result;
        } else {
            let user1 = await userModel.create({
                email: email,
                avatar: avatar,
                tai_khoan: "",
                mat_khau: "123",
                ho_ten: ho_ten,
                dia_chi: [],
                tich_diem: 0,
                voucher_user: [],
                otp: 0,
                status: 1,

            });
            console.log(user1, "221312313");
            return true, user1;
        }
    } catch (error) {
        console.log('Lỗi tại login email service: ', error)
    }
    return false;
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
        { expiresIn: '1h' },
    );
    return token;
};

module.exports = {
    sendOTP, loginEmail, dangKyBangUsername,
    dangNhapBangUsername, dangNhapBangSoDienThoai,
    dangKyBangSoDienThoai, layThongTinUser, layThongTinTatCaUser,
    themDiaChi, suaDiaChi, xoaDiaChi, suaThongTinUser, xoaTaiKhoan,
    tichDiem, doiMatKhauOTP, doiMatKhau, suDungDiem
};