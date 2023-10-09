const serviceGioHang = require('./ServiceGioHang');

//thêm danh sách giỏ hàng
const themDanhSachGioHang = async (id_user, id_san_pham, size, so_luong) => {
    try {
        const result = await serviceGioHang.themDanhSachGioHang(id_user, id_san_pham, size, so_luong);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

//xóa sản phẩm giỏ hàng
const xoaSanPhamGioHang = async (id_user, id_san_pham, size) => {
    try {
        const result = await serviceGioHang.xoaSanPhamGioHang(id_user, id_san_pham, size);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

//lấy danh sách giỏ hàng
const layDanhSachGioHang = async (id_user) => {
    try {
        const result = await serviceGioHang.layDanhSachGioHang(id_user);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

//cập nhật số lượng sản phẩm giỏ hàng
const capNhatSoLuongSanPhamGioHang = async (id_user, id_san_pham, size, so_luong) => {
    try {
        const result = await serviceGioHang.capNhatSoLuongSanPhamGioHang(id_user, id_san_pham, size, so_luong);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

module.exports = { themDanhSachGioHang, layDanhSachGioHang, xoaSanPhamGioHang, capNhatSoLuongSanPhamGioHang };