const serviceDonHang = require('./ServiceDonHang');


//sửa đơn hàng
const suaDonHang = async (id_don_hang, id_user, id_chi_nhanh, loai_don_hang, dia_chi, san_pham, ghi_chu, giam_gia, phi_van_chuyen) => {
    try {
        const donHang = await serviceDonHang.suaDonHang(id_don_hang, id_user, id_chi_nhanh, loai_don_hang, dia_chi, san_pham, ghi_chu, giam_gia, phi_van_chuyen);
        return donHang;
    } catch (error) {
        throw new Error(error);
    }
};

//lấy danh sách sản phẩm chưa đánh giá
const layDanhSachSanPhamChuaDanhGia = async ( id_user ) => {
    try {
        const donHang = await serviceDonHang.layDanhSachSanPhamChuaDanhGia(id_user);
        return donHang;
    } catch (error) {
        throw new Error(error);
    }
};


//thêm đơn hàng
const themDonHang = async (id_user, id_chi_nhanh, loai_don_hang, dia_chi, san_pham, ghi_chu, giam_gia, phi_van_chuyen, thanh_toan) => {
    try {
        const donHang = await serviceDonHang.themDonHang(id_user, id_chi_nhanh, loai_don_hang, dia_chi, san_pham, ghi_chu, giam_gia, phi_van_chuyen, thanh_toan);
        return donHang;
    } catch (error) {
        throw new Error(error);
    }
};
//lấy đơn hàng
const layDonHang = async (id_don_hang) => {
    try {
        const donHang = await serviceDonHang.layDonHang(id_don_hang);
        return donHang;
    } catch (error) {
        throw new Error(error);
    }
};
//lấy đơn hàng theo id_user
const layDonHangTheoIdUser = async (id_user) => {
    try {
        const donHang = await serviceDonHang.layDonHangTheoIdUser(id_user);
        return donHang;
    } catch (error) {
        throw new Error(error);
    }
};
//cập nhật trạng thái
const capNhatTrangThai = async (id_don_hang,ma_trang_thai) => {
    try {
        const donHang = await serviceDonHang.capNhatTrangThai(id_don_hang,ma_trang_thai);
        return donHang;
    } catch (error) {
        throw new Error(error);
    }
};


//danh gia
const danhGia = async (id_don_hang, so_sao, danh_gia, hinh_anh_danh_gia, email, ten_user) => {
    try {
        const donHang = await serviceDonHang.danhGia(id_don_hang, so_sao, danh_gia, hinh_anh_danh_gia, email, ten_user);
        return donHang;
    } catch (error) {
        throw new Error(error);
    }
};


module.exports = { themDonHang, layDonHang, layDonHangTheoIdUser, capNhatTrangThai, danhGia,layDanhSachSanPhamChuaDanhGia,
                    suaDonHang };