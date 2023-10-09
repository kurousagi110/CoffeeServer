const modelLoaiSanPham = require('./ModelLoaiSanPham');





//thêm loại sản phẩm
const themLoaiSanPham = async (ten_loai_san_pham) => {
    try {

        const result = await modelLoaiSanPham.findOne({ ten_loai_san_pham: ten_loai_san_pham });
        if (result) {
            return false;
        }
        else {
            const loai_san_pham = {
                ten_loai_san_pham: ten_loai_san_pham,
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


module.exports = { themLoaiSanPham, xoaLoaiSanPham, suaLoaiSanPham };