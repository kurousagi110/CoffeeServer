const sanPhamModel = require('./ModelSanPham');




//tìm kiếm san pham
const timKiemSanPham = async (ten_san_pham) => {
    try {
        const san_pham = await sanPhamModel.find({ ten_san_pham: { $regex: ten_san_pham, $options: 'i' } });
        return san_pham;
    } catch (error) {
        console.log('Lỗi tại timKiemSanPham service: ', error)
    }
    return false;
};

//lọc sản phẩm theo giá từ thấp đến cao
const locSanPhamTheoGiaTuThapDenCao = async () => {
    try {
        const san_pham = await sanPhamModel.find().sort({ gia: 1 });
        return san_pham;
    } catch (error) {
        console.log('Lỗi tại locSanPhamTheoGiaTuThapDenCao service: ', error)
    }
    return false;
};

//get product by id
const getSanPhamById = async (id_san_pham) => {
    try {
        const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
        return san_pham;
    } catch (error) {
        console.log('Lỗi tại getSanPhamById service: ', error)
    }
    return false;
};

//get all product
const getAllSanPham = async () => {
    try {
        const san_pham = await sanPhamModel.find();
        return san_pham;
    } catch (error) {
        console.log('Lỗi tại getAllSanPham service: ', error)
    }
    return false;
};

//thêm loại sản phẩm
const themLoaiSanPham = async (id_san_pham, ten_loai_san_pham) => {
    try {
        const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
        if (san_pham) {
            const loai_san_pham = {
                ten_loai_san_pham: ten_loai_san_pham,
            }
            san_pham.loai_san_pham.push(loai_san_pham);
            await san_pham.save();
            return san_pham;
        }
    } catch (error) {
        console.log('Lỗi tại themLoaiSanPham service: ', error)
    }
    return false;
};
//xóa loại sản phẩm
const xoaLoaiSanPham = async (id_san_pham, id_loai_san_pham) => {
    try {
        const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
        if (san_pham) {
            const loai_san_pham = san_pham.loai_san_pham.find((item) => item._id == id_loai_san_pham);
            if (loai_san_pham) {
                await san_pham.loai_san_pham.remove(loai_san_pham);
                return true;
            }
        }
    } catch (error) {
        console.log('Lỗi tại xoaLoaiSanPham service: ', error)
    }
    return false;
};

//thêm hình ảnh
const themHinhAnh = async (id_san_pham, hinh_anh_sp) => {
    try {
        const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
        if (san_pham) {
            const hinh_anh = {
                hinh_anh_sp: hinh_anh_sp,
            }
            san_pham.hinh_anh_sp.push(hinh_anh);
            await san_pham.save();
            return san_pham;
        }
    } catch (error) {
        console.log('Lỗi tại themHinhAnh service: ', error)
    }
    return false;
};


//xóa hình ảnh
const xoaHinhAnh = async (id_san_pham, id_hinh_anh_sp) => {
    try {
        const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
        if (san_pham) {
            const hinh_anh = san_pham.hinh_anh_sp.find((item) => item._id == id_hinh_anh_sp);
            if (hinh_anh) {
                await san_pham.hinh_anh_sp.remove(hinh_anh);
                return true;
            }
        }
    } catch (error) {
        console.log('Lỗi tại xoaHinhAnh service: ', error)
    }
    return false;
};

//thêm size
const themSize = async (id_san_pham, ten_size, gia, giam_gia) => {
    try {
        const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
        if (san_pham) {
            const size = {
                ten_size: ten_size,
                gia: gia,
                giam_gia: giam_gia,
            }
            san_pham.size.push(size);
            await san_pham.save();
            return san_pham;
        }
    } catch (error) {
        console.log('Lỗi tại themSize service: ', error)
    }
    return false;
};
//sửa size
const suaSize = async (id_san_pham, id_size, ten_size, gia, giam_gia) => {
    try {
        const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
        if (san_pham) {
            const size = san_pham.size.find((item) => item._id == id_size);
            if (size) {
                size.ten_size = ten_size;
                size.gia = gia;
                size.giam_gia = giam_gia;
                await san_pham.save();
                return san_pham;
            }
        }
    } catch (error) {
        console.log('Lỗi tại suaSize service: ', error)
    }
    return false;
};

//xóa size
const xoaSize = async (id_san_pham, id_size) => {
    try {
        const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
        if (san_pham) {
            const size = san_pham.size.find((item) => item._id == id_size);
            if (size) {
                await san_pham.size.remove(size);
                return true;
            }
        }
    } catch (error) {
        console.log('Lỗi tại xoaSize service: ', error)
    }
    return false;
};

//thêm sản phẩm
const themSanPham = async (ten_san_pham,  mo_ta) => {
    try {
        const san_pham = new sanPhamModel({
            ten_san_pham: ten_san_pham,
            mo_ta: mo_ta,
            status: 1,
        });
        await san_pham.save();
        return san_pham;
    } catch (error) {
        console.log('Lỗi tại themSanPham service: ', error)
    }
    return false;
};

//thêm all sản phẩm
const themSanPhamAll = async (san_pham) => {
    try {
        const result = new sanPhamModel({
            ten_san_pham: san_pham.ten_san_pham,
            mo_ta: san_pham.mo_ta,
            size: san_pham.size,
            loai_san_pham: san_pham.loai_san_pham,
            hinh_anh_sp: san_pham.hinh_anh_sp,
            status: 1,
        });
        await result.save();
        return result;
    } catch (error) {
        console.log('Lỗi tại themSanPhamAll service: ', error)
    }
    return false;
};

module.exports = { themLoaiSanPham, xoaLoaiSanPham, themHinhAnh, xoaHinhAnh, 
    themSize, suaSize, xoaSize, themSanPham, timKiemSanPham, 
    locSanPhamTheoGiaTuThapDenCao, getSanPhamById, getAllSanPham , themSanPhamAll };