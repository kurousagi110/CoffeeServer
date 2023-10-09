const serviceLoaiSanPham = require('./ServiceLoaiSanPham');


//thêm loại sản phẩm
const themLoaiSanPham = async (ten_loai_san_pham) => {
    try {
        const san_pham = await serviceLoaiSanPham.themLoaiSanPham(ten_loai_san_pham);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};
//xóa loại sản phẩm
const xoaLoaiSanPham = async (id_loai_san_pham) => {
    try {
        const san_pham = await serviceLoaiSanPham.xoaLoaiSanPham(id_loai_san_pham);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

//sửa loại sản phẩm
const suaLoaiSanPham = async (id_loai_san_pham, ten_loai_san_pham) => {
    try {
        const san_pham = await serviceLoaiSanPham.suaLoaiSanPham(id_loai_san_pham, ten_loai_san_pham);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

module.exports = { themLoaiSanPham, xoaLoaiSanPham, suaLoaiSanPham };