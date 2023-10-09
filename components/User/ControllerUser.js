
const userServices = require('./ServiceUser');


//sử dụng điểm
const suDungDiem = async (id_user, diem) => {
    try {
        const user = await userServices.suDungDiem(id_user, diem);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
};


//tich diem
const tichDiem = async (id_user, tich_diem) => {
    try {
        const user = await userServices.tichDiem(id_user, tich_diem);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

//thêm xóa sửa địa chỉ
const themDiaChi = async (id_user, ten_dia_chi) => {
    try {
        const user = await userServices.themDiaChi(id_user, ten_dia_chi);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

const suaDiaChi = async (id_user, id_dia_chi, ten_dia_chi) => {
    try {
        const user = await userServices.suaDiaChi(id_user, id_dia_chi, ten_dia_chi);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

const xoaDiaChi = async (id_user, id_dia_chi) => {
    try {
        const user = await userServices.xoaDiaChi(id_user, id_dia_chi);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

//lấy thông tin của user

const layThongTinTatCaUser = async () => {
    try {
        const users = await userServices.layThongTinTatCaUser();
        if (users) {
            return users;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

const layThongTinUser = async (id_user) => {
    try {
        const user = await userServices.layThongTinUser(id_user);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
};
//sửa thông tin user
const suaThongTinUser = async (id_user, ho_ten, avatar) => {
    try {
        const user = await userServices.suaThongTinUser(id_user, ho_ten, avatar);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

//đổi mật khẩu
const doiMatKhau = async (id_user, mat_khau_cu, mat_khau_moi) => {
    try {
        const user = await userServices.doiMatKhau(id_user, mat_khau_cu, mat_khau_moi);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

//xóa tài khoản
const xoaTaiKhoan = async (id_user) => {
    try {
        const user = await userServices.xoaTaiKhoan(id_user);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

//đăng kí / đăng nhập
const dangKyBangSoDienThoai = async (so_dien_thoai, mat_khau, ho_ten) => {
    try {
        const user = await userServices.dangKyBangSoDienThoai(so_dien_thoai, mat_khau, ho_ten);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
};
const dangNhapBangSoDienThoai = async (so_dien_thoai, mat_khau) => {
    try {
        const user = await userServices.dangNhapBangSoDienThoai(so_dien_thoai, mat_khau);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

const dangKyBangUsername = async (tai_khoan, mat_khau, ho_ten) => {
    try {
        const user = await userServices.dangKyBangUsername(tai_khoan, mat_khau, ho_ten);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
}

const dangNhapBangUsername = async (tai_khoan, mat_khau) => {
    try {
        const user = await userServices.dangNhapBangUsername(tai_khoan, mat_khau);
        if (user) {
            return user;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

const loginEmail = async (email, avatar , ho_ten) => {
    try {
        const result = await userServices.loginEmail(email, avatar, ho_ten);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        throw error;
    }
}
//gửi mã otp
const sendOTP = async (email) => {
    try {
        const result = await userServices.sendOTP(email);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('User controller sendOTP error: ',error);
        throw error;
    }
};
//doi mat khau bang otp
const doiMatKhauOTP = async (email, mat_khau,otp) => {
    try {
        const result = await userServices.doiMatKhauOTP(email, mat_khau,otp);

        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        throw error;
    }
}

module.exports = { sendOTP, loginEmail, dangNhapBangUsername, 
                    dangKyBangUsername, dangNhapBangSoDienThoai, 
                    dangKyBangSoDienThoai, layThongTinUser, layThongTinTatCaUser, 
                    themDiaChi, suaDiaChi, xoaDiaChi, suaThongTinUser, xoaTaiKhoan, 
                    tichDiem, doiMatKhauOTP, doiMatKhau, suDungDiem };