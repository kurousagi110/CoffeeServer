const serviceGioHang = require('./ServiceGioHang');




//thêm topping
const themTopping = async (id_user, id_san_pham_gio_hang, ten_topping, gia) => {
    try {
        const result = await serviceGioHang.themTopping(id_user, id_san_pham_gio_hang, ten_topping, gia);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

//xóa topping
const xoaTopping = async (id_user, id_san_pham, size, ten_topping) => {
    try {
        const result = await serviceGioHang.xoaTopping(id_user, id_san_pham, size, ten_topping);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        throw error;
    }
};


//thêm danh sách giỏ hàng
const themDanhSachGioHang = async (id_user, id_san_pham, size, so_luong, ten_san_pham, topping) => {
    try {
        const result = await serviceGioHang.themDanhSachGioHang(id_user, id_san_pham, size, so_luong, ten_san_pham, topping);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

//xóa sản phẩm giỏ hàng
const xoaSanPhamGioHang = async (id_user, _id) => {
    try {
        const result = await serviceGioHang.xoaSanPhamGioHang(id_user, _id);
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
const capNhatSoLuongSanPhamGioHang = async (id_user, _id, id_san_pham, size, so_luong,topping) => {
    try {
        const result = await serviceGioHang.capNhatSoLuongSanPhamGioHang(id_user, _id, id_san_pham, size, so_luong,topping);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        throw error;
    }
};

module.exports = { themDanhSachGioHang, layDanhSachGioHang, xoaSanPhamGioHang, capNhatSoLuongSanPhamGioHang
                    , themTopping, xoaTopping };