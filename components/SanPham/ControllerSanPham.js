const sanPhamServices = require('./ServiceSanPham');



//lấy danh sách sản phẩm giảm giá
const layDanhSachSanPhamGiamGia = async () => {
    try {
        const san_pham = await sanPhamServices.getSanPhamGiamGia();
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};
//sửa sản phẩm
const suaDuLieu = async (id_san_pham, ten_san_pham, mo_ta, tong_sao, so_luong_danh_gia, so_luong_da_ban) => {
    try {
        const san_pham = await sanPhamServices.suaDuLieu(id_san_pham, ten_san_pham, mo_ta, tong_sao, so_luong_danh_gia, so_luong_da_ban);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};


//danh sách sản phẩm đánh giá tốt nhất giới hạn 10 sản phẩm
const danhSachSanPhamDanhGiaTotNhat = async () => {
    try {
        const san_pham = await sanPhamServices.danhSachSanPhamDanhGiaTotNhat();
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

//nhận danh sách đánh giá theo sản phẩm
const danhSachDanhGiaTheoSanPham = async (id_san_pham) => {
    try {
        const san_pham = await sanPhamServices.danhSachDanhGiaTheoSanPham(id_san_pham);
        if (san_pham) {
            return san_pham.danh_gia;
        }
    } catch (error) {
        throw error;
    }
    return false;
};


//trả về sản phẩm theo list category
const timKiemSanPhamTheoListCategory = async () => {
    try {
        const san_pham = await sanPhamServices.timKiemSanPhamTheoListCategory();
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

//tìm kiếm sản phẩm theo category
const timKiemSanPhamTheoCategory = async (ten_loai_san_pham) => {
    try {
        const san_pham = await sanPhamServices.timKiemSanPhamTheoCategory(ten_loai_san_pham);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

//tìm kiếm san pham
const timKiemSanPham = async (ten_san_pham) => {
    try {
        const san_pham = await sanPhamServices.timKiemSanPham(ten_san_pham);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};
//lọc sản phẩm theo giá từ thấp đến cao
const locSanPhamTheoGiaTuThapDenCao = async () => {
    try {
        const san_pham = await sanPhamServices.locSanPhamTheoGiaTuThapDenCao();
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};


//get product by id
const getSanPhamById = async (id_san_pham) => {
    try {
        const san_pham = await sanPhamServices.getSanPhamById(id_san_pham);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};


//get all product
const getAllSanPham = async () => {
    try {
        const san_pham = await sanPhamServices.getAllSanPham();
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};


//thêm loại sản phẩm
const themLoaiSanPham = async (id_san_pham, ten_loai_san_pham, ma_loai_san_pham) => {
    try {
        const san_pham = await sanPhamServices.themLoaiSanPham(id_san_pham, ten_loai_san_pham, ma_loai_san_pham);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};


//sửa loại sản phẩm
const suaLoaiSanPham = async (id_san_pham, id_loai_san_pham, ten_loai_san_pham, ma_loai_san_pham) => {
    try {
        const san_pham = await sanPhamServices.suaLoaiSanPham(id_san_pham, id_loai_san_pham, ten_loai_san_pham, ma_loai_san_pham);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

//xóa loại sản phẩm
const xoaLoaiSanPham = async (id_san_pham, id_loai_san_pham) => {
    try {
        const san_pham = await sanPhamServices.xoaLoaiSanPham(id_san_pham, id_loai_san_pham);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};


//thêm hình ảnh
const themHinhAnh = async (id_san_pham, ten_loai_san_pham) => {
    try {
        const san_pham = await sanPhamServices.themHinhAnh(id_san_pham, ten_loai_san_pham);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
}


//xóa hình ảnh
const xoaHinhAnh = async (id_san_pham, id_loai_san_pham) => {
    try {
        const san_pham = await sanPhamServices.xoaHinhAnh(id_san_pham, id_loai_san_pham);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};


//thêm size
const themSize = async (id_san_pham, ten_size, gia, giam_gia) => {
    try {
        const san_pham = await sanPhamServices.themSize(id_san_pham, ten_size, gia, giam_gia);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};


//sửa size
const suaSize = async (id_san_pham, id_size, ten_size, gia, giam_gia) => {
    try {
        const san_pham = await sanPhamServices.suaSize(id_san_pham, id_size, ten_size, gia, giam_gia);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};


//xóa size
const xoaSize = async (id_san_pham, id_size) => {
    try {
        const san_pham = await sanPhamServices.xoaSize(id_san_pham, id_size);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

//thêm sản phẩm
const themSanPham = async (ten_san_pham, mo_ta) => {
    try {
        const san_pham = await sanPhamServices.themSanPham(ten_san_pham, mo_ta);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        throw error;
    }
    return false;
};
//thêm san3 phẩm
const themSanPhamAll = async (san_pham) => {
    try {
        const result = await sanPhamServices.themSanPhamAll(san_pham);
        if (result) {
            return result;
        }
    } catch (error) {
        throw error;
    }
    return false;
};

module.exports = { themSize, themSanPham, themLoaiSanPham, 
    themHinhAnh, xoaHinhAnh, suaSize, xoaSize,  xoaLoaiSanPham,
    getAllSanPham, getSanPhamById, locSanPhamTheoGiaTuThapDenCao, timKiemSanPham, themSanPhamAll,
    timKiemSanPhamTheoCategory, timKiemSanPhamTheoListCategory,
    danhSachDanhGiaTheoSanPham, danhSachSanPhamDanhGiaTotNhat, suaDuLieu, suaLoaiSanPham,
    layDanhSachSanPhamGiamGia };