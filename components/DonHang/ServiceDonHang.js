const modelDonHang = require('./ModelDonHang');
const modelSanPham = require('../SanPham/ModelSanPham');
const modelUser = require('../User/ModelUser');
const moment = require('moment');


//sửa đơn hàng
const suaDonHang = async (id_don_hang, id_user, id_chi_nhanh, loai_don_hang, dia_chi, san_pham, ghi_chu, giam_gia, phi_van_chuyen) => {
    try {
        const donHang = await modelDonHang.findById(id_don_hang);
        if (!donHang) {
            return false;
        }
        let tong_san_pham = 0;
        let thanh_tien = 0;
        for (let i = 0; i < san_pham.length; i++) {
            if (san_pham[i].topping.length === 0) {
                thanh_tien += san_pham[i].gia * san_pham[i].so_luong;
            } else {
                for (let j = 0; j < san_pham[i].topping.length; j++) {
                    thanh_tien += san_pham[i].topping[j].gia * san_pham[i].so_luong;
                }
            }
            tong_san_pham += san_pham[i].so_luong;
            thanh_tien += san_pham[i].gia * san_pham[i].so_luong;
        }
        let thanh_toan = thanh_tien - giam_gia + phi_van_chuyen;

        // Truy vấn đơn hàng theo id_don_hang và cập nhật dữ liệu
        const donHangToUpdate = await modelDonHang.findByIdAndUpdate(id_don_hang, {
            id_user: id_user || donHang.id_user,
            id_chi_nhanh: id_chi_nhanh || donHang.id_chi_nhanh,
            loai_don_hang: loai_don_hang || donHang.loai_don_hang,
            dia_chi: dia_chi || donHang.dia_chi,
            san_pham: san_pham || donHang.san_pham,
            ghi_chu: ghi_chu || donHang.ghi_chu,
            so_diem_tich_luy: Math.floor(thanh_toan / 2500),
            giam_gia: giam_gia || donHang.giam_gia,
            phi_van_chuyen: phi_van_chuyen || donHang.phi_van_chuyen,
            tong_san_pham: tong_san_pham || donHang.tong_san_pham,
            thanh_tien: thanh_toan || donHang.thanh_tien
        }, { new: true }); // { new: true } để lấy dữ liệu đã cập nhật

        return donHangToUpdate;
    } catch (error) {
        throw new Error(error);
    }
};


//lấy danh sách sản phẩm chưa đánh giá
const layDanhSachSanPhamChuaDanhGia = async (id_user) => {
    try {
        const donHang = await modelDonHang.find({ id_user: id_user });
        if (!donHang || donHang.length === 0) {
            return [];
        }

        const danhSachSanPhamChuaDanhGia = [];

        for (let i = 0; i < donHang.length; i++) {
            donHang[i].san_pham.forEach(sanPham => {
                if(sanPham.ma_trang_thai === 4){
                    danhSachSanPhamChuaDanhGia.push(sanPham);
                }
            });
        }
        return danhSachSanPhamChuaDanhGia;
    } catch (error) {
        throw new Error(error);
    }
};


const themDonHang = async (id_user, id_chi_nhanh, loai_don_hang, dia_chi, san_pham, ghi_chu, giam_gia, phi_van_chuyen) => {
    try {
        let tong_san_pham = 0;
        let thanh_tien = 0;
        for (let i = 0; i < san_pham.length; i++) {
            if (san_pham[i].topping.length === 0) {
                thanh_tien += san_pham[i].gia * san_pham[i].so_luong;
            } else {
                for (let j = 0; j < san_pham[i].topping.length; j++) {
                    thanh_tien += san_pham[i].topping[j].gia * san_pham[i].so_luong;
                }
            }
            tong_san_pham += san_pham[i].so_luong;
            thanh_tien += san_pham[i].gia * san_pham[i].so_luong;
        }
        let thanh_toan = thanh_tien - giam_gia + phi_van_chuyen;
        const duLieu = {
            id_user: id_user,
            id_chi_nhanh: id_chi_nhanh,
            loai_don_hang: loai_don_hang,
            dia_chi: dia_chi,
            ngay_dat: new Date(),
            san_pham: san_pham,
            ghi_chu: ghi_chu,
            so_diem_tich_luy: Math.floor(thanh_toan / 2500),
            giam_gia: giam_gia,
            phi_van_chuyen: phi_van_chuyen,
            ma_trang_thai: 1,
            ten_trang_thai: "Đang xử lý",
            ngay_cap_nhat_1: new Date(),
            tong_san_pham: tong_san_pham,
            thanh_tien: thanh_toan,
            email: "",
            ten_user: "",
            so_sao: null,
            danh_gia: "",
        };
        const donHang = await modelDonHang.create(duLieu);
        return donHang;
    } catch (error) {
        throw new Error(error);
    }

};

const layDonHang = async (id_don_hang) => {
    try {
        const donHang = await modelDonHang.findById(id_don_hang);
        if (!donHang) {
            return [];
        }
        return donHang;
    } catch (error) {
        throw new Error(error);
    }
};

//lay don hang theo id_user
const layDonHangTheoIdUser = async (id_user) => {
    try {
        const donHang = await modelDonHang.find({ id_user: id_user });
        if (!donHang) {
            return [];
        }
        return donHang;
    } catch (error) {
        throw new Error(error);
    }
};

//cap nhat trang thai
const capNhatTrangThai = async (id_don_hang, ma_trang_thai) => {
    try {
        const donHang = await modelDonHang.findById(id_don_hang);
        if (!donHang) {
            return 1000;
        }
        else if (donHang.ma_trang_thai === ma_trang_thai) {
            return 10;
        }
        else if(donHang.ma_trang_thai === 5 && ma_trang_thai === 4){
            return 100;
        }
        else if (donHang.ma_trang_thai === 4 && ma_trang_thai === 5) {
            return 10000;
        }
        else if (donHang.ma_trang_thai === 5 && ma_trang_thai === 0) {
            return 100000;
        }
        else if (donHang.ma_trang_thai === 2 && ma_trang_thai === 3) {
            donHang.ma_trang_thai = ma_trang_thai,
            donHang.ten_trang_thai= "Đang giao",
            donHang.ngay_cap_nhat_3= new Date(),
            await donHang.save();
            return donHang;
        }
        else if (donHang.ma_trang_thai === 3 && ma_trang_thai === 4) {
            donHang.ma_trang_thai = ma_trang_thai,
            donHang.ten_trang_thai= "Đã giao",
            donHang.ngay_cap_nhat_4= new Date(),
            await donHang.save();
            return donHang;
        }
        else if (donHang.ma_trang_thai === 1 && ma_trang_thai === 2) {
            donHang.ma_trang_thai = ma_trang_thai,
            donHang.ten_trang_thai= "Đang chuẩn bị",
            donHang.ngay_cap_nhat_2= new Date(),
            await donHang.save();
            return donHang;
        }
        else if (ma_trang_thai === 0){
            donHang.ma_trang_thai = ma_trang_thai,
            donHang.ten_trang_thai= "Đã hủy",
            donHang.ngay_cap_nhat_0= new Date(),
            await donHang.save();
            return donHang;
        }else{
            return false;
        }
    } catch (error) {
        throw new Error(error);
    }
};

//danh gia
const danhGia = async (id_don_hang, so_sao, danh_gia, hinh_anh_danh_gia, email, ten_user) => {
    try {
        const donHang = await modelDonHang.findById(id_don_hang);
        if (!donHang) {
            return 100;
        }
        if (donHang.danh_gia) {
            return 10;
        }
        if (donHang.ma_trang_thai === 4) {
            donHang.so_sao = so_sao;
            donHang.danh_gia = danh_gia;
            donHang.hinh_anh_danh_gia = hinh_anh_danh_gia;
            donHang.email = email;
            donHang.ten_user = ten_user;
            donHang.ngay_danh_gia = new Date();
            donHang.ma_trang_thai = 5,
            donHang.ten_trang_thai= "Đã đánh giá",
            donHang.ngay_cap_nhat_5= new Date(),
            await donHang.save();
            for (let i = 0; i < donHang.san_pham.length; i++) {
                const sanPham = await modelSanPham.findById(donHang.san_pham[i].id_san_pham);
                if (!sanPham) {
                    return [];
                }
                sanPham.danh_gia.push({ so_sao: so_sao, danh_gia: danh_gia, hinh_anh_danh_gia: hinh_anh_danh_gia, email: email, ten_user: ten_user, ngay_danh_gia: new Date() });
                sanPham.so_luong_da_mua = sanPham.so_luong_da_mua + donHang.san_pham[i].so_luong;
                let tong_sao = 0; // Khai báo biến tong_sao ở đây và gán giá trị 0
                for (let j = 0; j < sanPham.danh_gia.length; j++) {
                    tong_sao = tong_sao + sanPham.danh_gia[j].so_sao;
                }
                sanPham.tong_sao = tong_sao / sanPham.danh_gia.length;
                await sanPham.save();
            }
            const user = await modelUser.findById(donHang.id_user);
            if (!user) {
                return null;
            }
            user.so_diem_tich_luy = user.so_diem_tich_luy + donHang.so_diem_tich_luy;
            user.doi_diem.push({
                ngay_doi: new Date(),
                ten_doi_diem: "Cộng điểm tích lũy khi mua hàng",
                so_diem: donHang.so_diem_tich_luy,
            });
            return donHang;
        } else {
            return 1000;
        }

    } catch (error) {
        throw new Error(error);
    }
};



module.exports = {
    themDonHang, layDonHang, layDonHangTheoIdUser, capNhatTrangThai, danhGia, layDanhSachSanPhamChuaDanhGia,
    suaDonHang
}