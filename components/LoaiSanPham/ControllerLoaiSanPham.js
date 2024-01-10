const serviceLoaiSanPham = require('./ServiceLoaiSanPham');


//lấy tất cả loại sản phẩm
const layTatCaLoaiSanPham = async () => {
    try {
        const loai_san_phams = await serviceLoaiSanPham.layTatCaLoaiSanPham();
        return loai_san_phams;
    } catch (error) {
        throw error;
    }
};

//lấy loại sản phẩm theo id
const layLoaiSanPhamTheoId = async (id_loai_san_pham) => {
    try {
        const loai_san_pham = await serviceLoaiSanPham.layLoaiSanPhamTheoId(id_loai_san_pham);
        return loai_san_pham;
    } catch (error) {
        throw error;
    }
};

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

module.exports = { themLoaiSanPham, xoaLoaiSanPham, suaLoaiSanPham, layTatCaLoaiSanPham, layLoaiSanPhamTheoId };