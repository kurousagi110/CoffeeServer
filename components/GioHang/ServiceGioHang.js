const modelGioHang = require('./ModelGioHang');
const modelUser = require('../User/ModelUser');



//thêm danh sách giỏ hàng
const themDanhSachGioHang = async (id_user, id_san_pham, size, so_luong) => {
    try {
        console.log(id_user, id_san_pham, size, so_luong);
        const result = await modelGioHang.findOne({ id_user: id_user });
        if (!result) {
            const giohang = {
                id_user: id_user,
                san_pham: [
                    {
                        id_san_pham: id_san_pham,
                        size: size,
                        so_luong: so_luong,
                    }
                ]
            }
            const check = await modelGioHang.create(giohang);
            console.log(check);
            return 100;

        } else {
            for (let i = 0; i < result.san_pham.length; i++) {
                if (result.san_pham[i].id_san_pham == id_san_pham && result.san_pham[i].size == size) {
                    result.san_pham[i].so_luong = parseInt(result.san_pham[i].so_luong) + parseInt(so_luong);
                    await result.save();
                    return 10;
                }
            }
            result.san_pham.push({
                id_san_pham: id_san_pham,
                size: size,
                so_luong: so_luong,
            });
            await result.save();
            return 100;
        }
    } catch (error) {
        console.log('Lỗi tại themDanhSachGioHang service: ', error)
        throw error;
    }
};

//xóa sản phẩm giỏ hàng
const xoaSanPhamGioHang = async (id_user, id_san_pham, size) => {
    try {
        const result = await modelGioHang.findOne({ id_user: id_user });
        if (result) {
            for (let i = 0; i < result.san_pham.length; i++) {
                if (result.san_pham[i].id_san_pham == id_san_pham && result.san_pham[i].size == size) {
                    result.san_pham.splice(i, 1);
                    await result.save();
                    return 100;
                }
            }
            return 10;
        }
        return false;
    } catch (error) {
        console.log('Lỗi tại xoaSanPhamGioHang service: ', error)
        throw error;
    }
};

//cập nhật số lượng sản phẩm giỏ hàng
const capNhatSoLuongSanPhamGioHang = async (id_user, id_san_pham, size, so_luong) => {
    try {
        const result = await modelGioHang.findOne({ id_user: id_user });
        console.log(result);
        if (result) {
            for (let i = 0; i < result.san_pham.length; i++) {
                if (result.san_pham[i].id_san_pham == id_san_pham && result.san_pham[i].size == size) {
                    result.san_pham[i].so_luong = so_luong;
                    await result.save();
                    return 100;
                }
            }
            return 10;
        }
        return false;
    } catch (error) {
        console.log('Lỗi tại capNhatSoLuongSanPhamGioHang service: ', error)
        throw error;
    }
};

//lấy danh sách giỏ hàng
const layDanhSachGioHang = async (id_user) => {
    try {
        const result = await modelGioHang.findOne({ id_user: id_user });
        return result;
    } catch (error) {
        console.log('Lỗi tại layDanhSachGioHang service: ', error)
        throw error;
    }
};




module.exports = { themDanhSachGioHang, layDanhSachGioHang, xoaSanPhamGioHang, capNhatSoLuongSanPhamGioHang };