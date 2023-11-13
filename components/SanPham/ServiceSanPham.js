const sanPhamModel = require('./ModelSanPham');


//them du lieu
const suaDuLieu = async (id_san_pham, ten_san_pham, mo_ta, tong_sao, so_luong_danh_gia, so_luong_da_ban ) => {
    try {
        const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
        if (san_pham) {
            san_pham.ten_san_pham = ten_san_pham || san_pham.ten_san_pham;
            san_pham.mo_ta = mo_ta || san_pham.mo_ta;
            san_pham.tong_sao = tong_sao || san_pham.tong_sao;
            san_pham.so_luong_danh_gia = so_luong_danh_gia || san_pham.so_luong_danh_gia;
            san_pham.so_luong_da_ban = so_luong_da_ban || san_pham.so_luong_da_ban;
            await san_pham.save();
            return san_pham;
        }
    } catch (error) {
        console.log('Lỗi tại suaDuLieu service: ', error)
    }
    return false;
};
//nhận danh sách đánh giá theo sản phẩm
const danhSachDanhGiaTheoSanPham = async (id_san_pham) => {
    try {
        const san_pham = await sanPhamModel.findById(id_san_pham);
        console.log('san_pham: ', san_pham);
        if (san_pham) {
            return san_pham;
        }
    } catch (error) {
        console.log('Lỗi tại danhSachDanhGiaTheoSanPham service: ', error)
        throw error;    
    }
    return false;
};
//danh sách sản phẩm đánh giá tốt nhất giới hạn 10 sản phẩm
const danhSachSanPhamDanhGiaTotNhat = async () => {
    try {
        const san_pham = await sanPhamModel.find().sort({ tong_sao: -1 }).limit(5);
        return san_pham;
    } catch (error) {
        console.log('Lỗi tại danhSachSanPhamDanhGiaTotNhat service: ', error)
    }
    return false;
};
//thêm tổng

//trả về sản phẩm theo list category
const timKiemSanPhamTheoListCategory = async () => {
    try {
        const san_pham = await sanPhamModel.find();
        const result = [];

        san_pham.forEach((item) => {
            item.loai_san_pham.forEach((item1) => {
                const existingCategory = result.find((category) => category.ten_loai_san_pham === item1.ten_loai_san_pham);

                if (existingCategory) {
                    existingCategory.san_pham.push(item);
                } else {
                    result.push({
                        ten_loai_san_pham: item1.ten_loai_san_pham,
                        hinh_anh: item.hinh_anh_sp[0].hinh_anh_sp,
                        san_pham: [ item ],
                    });
                }
            });
        });
        return result;
    } catch (error) {
        console.log('Lỗi tại timKiemSanPhamTheoListCategory service: ', error);
        return false;
    }
};

//tìm kiếm sản phẩm theo category
const timKiemSanPhamTheoCategory = async (ten_loai_san_pham) => {
    try {
        console.log('ten_loai_san_pham: ', ten_loai_san_pham);
        const san_pham = await sanPhamModel.find({ loai_san_pham: { $elemMatch: { ten_loai_san_pham: ten_loai_san_pham } } });
        console.log('san_pham: ', san_pham);
        return san_pham;
    } catch (error) {
        console.log('Lỗi tại timKiemSanPhamTheoCategory service: ', error)
    }
    return false;
};

//tìm kiếm san pham
const timKiemSanPham = async (ten_san_pham) => {
    try {
        const san_pham = await sanPhamModel.find({
            ten_san_pham: { $regex: new RegExp(ten_san_pham, 'i', 'g') }
        });

        if (!san_pham.length) {
            const san_pham_chua_tu_dau = await sanPhamModel.find({
                ten_san_pham: { $regex: new RegExp(ten_san_pham.split(' ')[0], 'i', 'g') }
            });

            if (!san_pham_chua_tu_dau.length) {
                const san_pham_final = await sanPhamModel.find({
                    ten_san_pham: { $regex: new RegExp(ten_san_pham[0], 'i', 'g') }
                });

                return san_pham_final;
            }

            return san_pham_chua_tu_dau;
        }

        return san_pham;
    } catch (error) {
        console.log('Lỗi tại timKiemSanPham service: ', error);
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
        const san_pham = await sanPhamModel.findById(id_san_pham);
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
const themLoaiSanPham = async (id_san_pham, ten_loai_san_pham, ma_loai_san_pham) => {
    try {
        const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
        if (san_pham) {
            const loai_san_pham = {
                ten_loai_san_pham: ten_loai_san_pham,
                ma_loai_san_pham:  ma_loai_san_pham,
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

//sửa loại sản phẩm 
const suaLoaiSanPham = async (id_san_pham, id_loai_san_pham, ten_loai_san_pham, ma_loai_san_pham) => {
    try {
        const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
        if (san_pham) {
            const loai_san_pham = san_pham.loai_san_pham.find((item) => item._id == id_loai_san_pham);
            if (loai_san_pham) {
                loai_san_pham.ten_loai_san_pham = ten_loai_san_pham || loai_san_pham.ten_loai_san_pham;
                loai_san_pham.ma_loai_san_pham = ma_loai_san_pham || loai_san_pham.ma_loai_san_pham;
                await san_pham.save();
                return san_pham;
            }
        }
    } catch (error) {
        console.log('Lỗi tại suaLoaiSanPham service: ', error)
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
                gia_da_giam: gia - (gia * giam_gia / 100),
                isSelected: false,
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
                let isSelected = false;
                if (ten_size === 'M') {
                    isSelected = true;
                }
                else{
                    isSelected = false;
                }
                size.ten_size = ten_size || size.ten_size;
                size.gia = gia || size.gia;
                size.giam_gia = giam_gia || size.giam_gia;
                console.log('gia: ', giam_gia);
                size.gia_da_giam = gia - (gia * giam_gia / 100) || size.gia -(size.gia * size.giam_gia / 100);
                
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
            tong_sao: 0,
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

        const data = await sanPhamModel.findOne({ ten_san_pham: san_pham.ten_san_pham });
        if (data) {
            return false;
        }

        
        const size= []
        for(let i = 0; i < san_pham.size.length; i++){
            let select = false;
            if(san_pham.size[i].ten_size === 'M'){
                select = true;
            }else{
                select = false;
            }
            size.push({
                ten_size: san_pham.size[i].ten_size,
                gia: san_pham.size[i].gia,
                giam_gia: san_pham.size[i].giam_gia,
                gia_da_giam: san_pham.size[i].gia - (san_pham.size[i].gia * san_pham.size[i].giam_gia / 100),
                isSelected: select,
            })
        }
        const result = new sanPhamModel({
            ten_san_pham: san_pham.ten_san_pham,
            mo_ta: san_pham.mo_ta,
            size: san_pham.size,
            loai_san_pham: san_pham.loai_san_pham,
            hinh_anh_sp: san_pham.hinh_anh_sp,
            status: 1,
            tong_sao: 0,
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
    locSanPhamTheoGiaTuThapDenCao, getSanPhamById, getAllSanPham , themSanPhamAll,
    timKiemSanPhamTheoCategory, timKiemSanPhamTheoListCategory,
    danhSachSanPhamDanhGiaTotNhat, danhSachDanhGiaTheoSanPham, suaDuLieu,suaLoaiSanPham  };