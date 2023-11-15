const modelLoaiSanPham = require('./ModelLoaiSanPham');

let vietNamdate = new Date();
vietNamdate.setHours(vietNamdate.getHours() + 7);

//lấy tất cả loại sản phẩm
const layTatCaLoaiSanPham = async () => {
    try {
        const loai_san_phams = await modelLoaiSanPham.find();
        return loai_san_phams;
    } catch (error) {
        throw error;
    }
};

//lấy loại sản phẩm theo id
const layLoaiSanPhamTheoId = async (id_loai_san_pham) => {
    try {
        const loai_san_pham = await modelLoaiSanPham.findOne({ _id: id_loai_san_pham});
        return loai_san_pham;
    } catch (error) {
        throw error;
    }
};

//thêm loại sản phẩm
const themLoaiSanPham = async (ten_loai_san_pham, ma_loai_san_pham) => {
    try {

        const result = await modelLoaiSanPham.findOne({ ten_loai_san_pham: ten_loai_san_pham });
        if (result) {
            return false;
        }
        else {
            const loai_san_pham = {
                ten_loai_san_pham: ten_loai_san_pham,
                ma_loai_san_pham: ma_loai_san_pham,
                status: 1,
            }
            const result = await modelLoaiSanPham.create(loai_san_pham);
            return result;
        }
    } catch (error) {
        throw error;
    }
};
//xóa loại sản phẩm
const xoaLoaiSanPham = async (id_loai_san_pham) => {
    try {
        const result = await modelLoaiSanPham.deleteOne({ _id: id_loai_san_pham });
        return result;
    } catch (error) {
        throw error;
    }
};

//sửa loại sản phẩm
const suaLoaiSanPham = async (id_loai_san_pham, ten_loai_san_pham) => {
    try {
        const result = await modelLoaiSanPham.updateOne({ _id: id_loai_san_pham }, { ten_loai_san_pham: ten_loai_san_pham });
        return result;
    } catch (error) {
        throw error;
    }
};


module.exports = { themLoaiSanPham, xoaLoaiSanPham, suaLoaiSanPham, layTatCaLoaiSanPham, layLoaiSanPhamTheoId };