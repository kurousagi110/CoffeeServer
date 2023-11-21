const sanPhamModel = require("./ModelSanPham");
const Fuse = require("fuse.js");

//them du lieu
const suaDuLieu = async (
  id_san_pham,
  ten_san_pham,
  mo_ta,
  tong_sao,
  so_luong_danh_gia,
  so_luong_da_ban
) => {
  try {
    const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
    if (san_pham) {
      san_pham.ten_san_pham = ten_san_pham || san_pham.ten_san_pham;
      san_pham.mo_ta = mo_ta || san_pham.mo_ta;
      san_pham.tong_sao = tong_sao || san_pham.tong_sao;
      san_pham.so_luong_danh_gia =
        so_luong_danh_gia || san_pham.so_luong_danh_gia;
      san_pham.so_luong_da_ban = so_luong_da_ban || san_pham.so_luong_da_ban;
      await san_pham.save();
      return san_pham;
    }
  } catch (error) {
    console.log("Lỗi tại suaDuLieu service: ", error);
  }
  return false;
};
//nhận danh sách đánh giá theo sản phẩm
const danhSachDanhGiaTheoSanPham = async (id_san_pham) => {
  try {
    const san_pham = await sanPhamModel.findById(id_san_pham);
    console.log("san_pham: ", san_pham);
    if (san_pham) {
      return san_pham;
    }
  } catch (error) {
    console.log("Lỗi tại danhSachDanhGiaTheoSanPham service: ", error);
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
    console.log("Lỗi tại danhSachSanPhamDanhGiaTotNhat service: ", error);
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
        const existingCategory = result.find(
          (category) => category.ten_loai_san_pham === item1.ten_loai_san_pham
        );

        if (existingCategory) {
          existingCategory.san_pham.push(item);
        } else {
          result.push({
            ten_loai_san_pham: item1.ten_loai_san_pham,
            hinh_anh: item.hinh_anh_sp[0].hinh_anh_sp,
            san_pham: [item],
          });
        }
      });
    });
    return result;
  } catch (error) {
    console.log("Lỗi tại timKiemSanPhamTheoListCategory service: ", error);
    return false;
  }
};

//tìm kiếm sản phẩm theo category
const timKiemSanPhamTheoCategory = async (ten_loai_san_pham) => {
  try {
    console.log("ten_loai_san_pham: ", ten_loai_san_pham);
    const san_pham = await sanPhamModel.find({
      loai_san_pham: { $elemMatch: { ten_loai_san_pham: ten_loai_san_pham } },
    });
    console.log("san_pham: ", san_pham);
    return san_pham;
  } catch (error) {
    console.log("Lỗi tại timKiemSanPhamTheoCategory service: ", error);
  }
  return false;
};

//tìm kiếm san pham
const timKiemSanPham = async (ten_san_pham) => {
  try {
    const tat_ca_san_pham = await sanPhamModel.find();
    const fuseOptions = {
      keys: ["ten_san_pham", "loai_san_pham.ten_loai_san_pham", "mo_ta"],
      threshold: 0.2, // Adjust the threshold based on your desired level of matching
    };

    const fuse = new Fuse(tat_ca_san_pham, fuseOptions);
    const result = fuse.search(ten_san_pham);

    if (result.length === 0) {
      return tat_ca_san_pham;
    }

    return result.item;
  } catch (error) {
    console.log("Lỗi tại timKiemSanPham service: ", error);
  }

  return false;
};

//lọc sản phẩm theo giá từ thấp đến cao
const locSanPhamTheoGiaTuThapDenCao = async () => {
  try {
    const san_pham = await sanPhamModel.find().sort({ gia: 1 });
    return san_pham;
  } catch (error) {
    console.log("Lỗi tại locSanPhamTheoGiaTuThapDenCao service: ", error);
  }
  return false;
};

//get product by id
const getSanPhamById = async (id_san_pham) => {
  try {
    const san_pham = await sanPhamModel.findById(id_san_pham);
    return san_pham;
  } catch (error) {
    console.log("Lỗi tại getSanPhamById service: ", error);
  }
  return false;
};
//get sản phẩm giảm giá
const getSanPhamGiamGia = async () => {
  try {
    const san_pham = await sanPhamModel.find({ check_gia_giam: true });
    return san_pham;
  } catch (error) {
    console.log("Lỗi tại getSanPhamGiamGia service: ", error);
  }
  return false;
};

//get all product
const getAllSanPham = async () => {
  try {
    let getAllDate = new Date();
    getAllDate.setHours(getAllDate.getHours() + 7);
    const sanPham = await sanPhamModel.find();
    let check = false;
    if (sanPham.ngay_san_pham_moi < getAllDate) {
      sanPham.is_san_pham_moi = false;
    }
    for (let i = 0; i < sanPham.length; i++) {
      const sanPhamItem = sanPham[i];

      // Check if the product has a discount expiration date
      if (sanPhamItem.ngay_giam === null) {
        continue;
      }

      // Check if the discount expiration date has passed
      if (sanPhamItem.ngay_giam < getAllDate) {
        // Set the product's discount status to inactive
        sanPhamItem.check_gia_giam = false;
        sanPhamItem.ngay_giam = null;
        for (let j = 0; j < sanPhamItem.size.length; j++) {
          sanPhamItem.size[j].giam_gia = 0;
          sanPhamItem.size[j].gia_da_giam =
            sanPhamItem.size[j].gia +
            (sanPhamItem.size[j].gia * sanPhamItem.size[j].giam_gia) / 100;
        }
        // Save the updated product
        await sanPhamItem.save();
        check = true;
      }
    }

    // If any product's discount has expired, generate new discounted products
    if (check) {
      const sanPhamNgauNhien = await sanPhamModel.aggregate([
        { $match: { is_san_pham_moi: false } },
        { $sample: { size: 5 } },
      ]);
      const date = new Date();
      // Set the discount expiration date for the new discounted products
      const ngay_mai = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      ngay_mai.setHours(0, 0, 0, 0);

      for (let i = 0; i < sanPhamNgauNhien.length; i++) {
        const sanPhamNgauNhienItem = sanPhamNgauNhien[i];
        sanPhamNgauNhienItem.ngay_giam = ngay_mai;
        sanPhamNgauNhienItem.check_gia_giam = true;
      }
      // Save the new discounted products
      for (let i = 0; i < sanPhamNgauNhien.length; i++) {
        for (let j = 0; j < sanPham.length; j++) {
          if (sanPhamNgauNhien[i].ten_san_pham === sanPham[j].ten_san_pham) {
            sanPham[j].check_gia_giam = sanPhamNgauNhien[i].check_gia_giam;
            sanPham[j].ngay_giam = sanPhamNgauNhien[i].ngay_giam;
            for (let k = 0; k < sanPhamNgauNhien[i].size.length; k++) {
              sanPham[j].size[k].giam_gia = 30;
              sanPham[j].size[k].gia_da_giam =
                sanPham[j].size[k].gia -
                (sanPham[j].size[k].gia * sanPham[j].size[k].giam_gia) / 100;
            }
            await sanPham[j].save();
          }
        }
      }
    }
    // Return all products
    return await sanPhamModel.find();
  } catch (error) {
    console.error("Error in getAllSanPham service:", error);
    return false;
  }
};

//lấy sản phẩm ngãu nhiên theo ngày
const getSanPhamMoi = async () => {
  try {
    const sanPham = await sanPhamModel.find({ is_san_pham_moi: true });
    return sanPham;
  } catch (error) {
    console.log("Lỗi tại getSanPhamMoi service: ", error);
  }
  return false;
};

//thêm loại sản phẩm
const themLoaiSanPham = async (
  id_san_pham,
  ten_loai_san_pham,
  ma_loai_san_pham
) => {
  try {
    const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
    if (san_pham) {
      const loai_san_pham = {
        ten_loai_san_pham: ten_loai_san_pham,
        ma_loai_san_pham: ma_loai_san_pham,
      };
      san_pham.loai_san_pham.push(loai_san_pham);
      await san_pham.save();
      return san_pham;
    }
  } catch (error) {
    console.log("Lỗi tại themLoaiSanPham service: ", error);
  }
  return false;
};

//sửa loại sản phẩm
const suaLoaiSanPham = async (
  id_san_pham,
  id_loai_san_pham,
  ten_loai_san_pham,
  ma_loai_san_pham
) => {
  try {
    const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
    if (san_pham) {
      const loai_san_pham = san_pham.loai_san_pham.find(
        (item) => item._id == id_loai_san_pham
      );
      if (loai_san_pham) {
        loai_san_pham.ten_loai_san_pham =
          ten_loai_san_pham || loai_san_pham.ten_loai_san_pham;
        loai_san_pham.ma_loai_san_pham =
          ma_loai_san_pham || loai_san_pham.ma_loai_san_pham;
        await san_pham.save();
        return san_pham;
      }
    }
  } catch (error) {
    console.log("Lỗi tại suaLoaiSanPham service: ", error);
  }
  return false;
};
//xóa loại sản phẩm
const xoaLoaiSanPham = async (id_san_pham, id_loai_san_pham) => {
  try {
    const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
    if (san_pham) {
      const loai_san_pham = san_pham.loai_san_pham.find(
        (item) => item._id == id_loai_san_pham
      );
      if (loai_san_pham) {
        await san_pham.loai_san_pham.remove(loai_san_pham);
        return true;
      }
    }
  } catch (error) {
    console.log("Lỗi tại xoaLoaiSanPham service: ", error);
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
      };
      san_pham.hinh_anh_sp.push(hinh_anh);
      await san_pham.save();
      return san_pham;
    }
  } catch (error) {
    console.log("Lỗi tại themHinhAnh service: ", error);
  }
  return false;
};

//xóa hình ảnh
const xoaHinhAnh = async (id_san_pham, id_hinh_anh_sp) => {
  try {
    const san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
    if (san_pham) {
      const hinh_anh = san_pham.hinh_anh_sp.find(
        (item) => item._id == id_hinh_anh_sp
      );
      if (hinh_anh) {
        await san_pham.hinh_anh_sp.remove(hinh_anh);
        return true;
      }
    }
  } catch (error) {
    console.log("Lỗi tại xoaHinhAnh service: ", error);
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
        gia_da_giam: gia - (gia * giam_gia) / 100,
        isSelected: false,
      };
      san_pham.size.push(size);
      await san_pham.save();
      return san_pham;
    }
  } catch (error) {
    console.log("Lỗi tại themSize service: ", error);
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
        if (ten_size === "M") {
          isSelected = true;
        } else {
          isSelected = false;
        }
        size.ten_size = ten_size || size.ten_size;
        size.gia = gia || size.gia;
        size.giam_gia = giam_gia || size.giam_gia;
        console.log("gia: ", giam_gia);
        size.gia_da_giam = gia - (gia * giam_gia) / 100 || size.gia - (size.gia * size.giam_gia) / 100;
        await san_pham.save();
        return san_pham;
      }
    }
  } catch (error) {
    console.log("Lỗi tại suaSize service: ", error);
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
    console.log("Lỗi tại xoaSize service: ", error);
  }
  return false;
};

//thêm sản phẩm
const themSanPham = async (ten_san_pham, mo_ta) => {
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
    console.log("Lỗi tại themSanPham service: ", error);
  }
  return false;
};

//thêm all sản phẩm
const themSanPhamAll = async (san_pham) => {
  try {
    const data = await sanPhamModel.findOne({
      ten_san_pham: san_pham.ten_san_pham,
    });
    if (data) {
      return false;
    }
    console.log("san_pham: ", san_pham);
    let size = [];
    for (let i = 0; i < san_pham.size.length; i++) {
      let select = false;
      if (san_pham.size[i].ten_size === "M") {
        select = true;
      } else {
        select = false;
      }
      size.push({
        ten_size: san_pham.size[i].ten_size,
        gia: san_pham.size[i].gia,
        giam_gia: san_pham.size[i].giam_gia,
        gia_da_giam: san_pham.size[i].gia - (san_pham.size[i].gia * san_pham.size[i].giam_gia) / 100,
        isSelected: select,
      });
    }
    console.log("size: ", size);
    let them_all_date = new Date();
    them_all_date.setHours(them_all_date.getHours() + 7);
    const result = new sanPhamModel({
      ten_san_pham: san_pham.ten_san_pham,
      mo_ta: san_pham.mo_ta,
      size: size,
      loai_san_pham: san_pham.loai_san_pham,
      hinh_anh_sp: san_pham.hinh_anh_sp,
      danh_gia: [],
      status: 1,
      tong_sao: 0,
      so_luong_da_ban: 0,
      so_luong_danh_gia: 0,
      check_gia_giam: false,
      ngay_giam: null,
      is_san_pham_moi: true,
      ngay_san_pham_moi: new Date(
        them_all_date.getTime() + 30 * 24 * 60 * 60 * 1000
      ),
    });
    await result.save();
    return result;
  } catch (error) {
    console.log("Lỗi tại themSanPhamAll service: ", error);
  }
};
//sửa sản phẩm all
const suaSanPhamAll = async (id_san_pham, san_pham) => {
  try {
    const result_san_pham = await sanPhamModel.findOne({ _id: id_san_pham });
    console.log("san_pham.size: ", san_pham.size);
    if (result_san_pham) {
      result_san_pham.ten_san_pham =
        san_pham.ten_san_pham || result_san_pham.ten_san_pham;
      result_san_pham.mo_ta = san_pham.mo_ta || result_san_pham.mo_ta;
      result_san_pham.size = san_pham.size || result_san_pham.size;
      result_san_pham.loai_san_pham =
        san_pham.loai_san_pham || result_san_pham.loai_san_pham;
      result_san_pham.hinh_anh_sp =
        san_pham.hinh_anh_sp || result_san_pham.hinh_anh_sp;
      await result_san_pham.save();
      return result_san_pham;
    }
  } catch (error) {
    console.log("Lỗi tại suaSanPhamAll service: ", error);
  }
  return false;
};

//xóa sản phẩm
const xoaSanPham = async (id_san_pham) => {
  try {
    const san_pham = await sanPhamModel.findByIdAndDelete(id_san_pham);
    if (san_pham) {
      return true;
    }
  } catch (error) {
    console.log("Lỗi tại xoaSanPham service: ", error);
  }
  return false;
};

module.exports = {
  themLoaiSanPham,
  xoaLoaiSanPham,
  themHinhAnh,
  xoaHinhAnh,
  themSize,
  suaSize,
  xoaSize,
  themSanPham,
  timKiemSanPham,
  locSanPhamTheoGiaTuThapDenCao,
  getSanPhamById,
  getAllSanPham,
  themSanPhamAll,
  timKiemSanPhamTheoCategory,
  timKiemSanPhamTheoListCategory,
  danhSachSanPhamDanhGiaTotNhat,
  danhSachDanhGiaTheoSanPham,
  suaDuLieu,
  suaLoaiSanPham,
  getSanPhamGiamGia,
  getSanPhamMoi,
  suaSanPhamAll,
  xoaSanPham,
};
