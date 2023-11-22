const modelChiNhanh = require('./ModelChiNhanh');



//lấy danh sách chi nhánh
const layDanhSachChiNhanh = async () => {
    try {
      const result = await modelChiNhanh.find({ status: { $ne: 0 } });
      // Use { status: { $ne: 0 } } to exclude documents where status is 0
      if (result) {
        return result;
      }
      return false;
    } catch (error) {
      console.log('layDanhSachChiNhanh error: ', error);
      throw error;
    }
  };
//lấy chi nhánh theo id
const layChiNhanhTheoID = async (id_chi_nhanh) => {
    try {
        const result = await modelChiNhanh.findById(id_chi_nhanh);
        console.log('result: ', result);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('layChiNhanhTheoID error: ', error);
        throw error;
    }
};

//tìm chi nhánh theo tên
const layChiNhanhTheoTen = async (ten_chi_nhanh) => {
    try {
        const result = await modelChiNhanh.findOne({ ten_chi_nhanh: ten_chi_nhanh });
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('timChiNhanhTheoTen error: ', error);
        throw error;
    }
};

//thêm chi nhánh
const themChiNhanh = async (ten_chi_nhanh, dia_chi, location) => {
    try {
        const check = await modelChiNhanh.findOne({ ten_chi_nhanh: ten_chi_nhanh });
        if (check) {
            return false;
        }
        const result = await modelChiNhanh.create({ 
            ten_chi_nhanh, 
            dia_chi,
            status: 1,
            location: location
        });
        if (result) {
            return result;
        }
        
        return false;
    } catch (error) {
        console.log('themChiNhanh error: ', error);
        throw error;
    }
};

//cập nhật chi nhánh
const suaChiNhanh = async (id_chi_nhanh, ten_chi_nhanh, dia_chi, location) => {
    try {
        const check = await modelChiNhanh.findOne({ ten_chi_nhanh: ten_chi_nhanh });
        const chiNhanh = await modelChiNhanh.findById(id_chi_nhanh);
        console.log('chiNhanh: ', chiNhanh);
        if (check && check._id != id_chi_nhanh) {
            return false;
        }
        if (!chiNhanh) {
            return false;
        }
        chiNhanh.ten_chi_nhanh = ten_chi_nhanh || chiNhanh.ten_chi_nhanh;
        chiNhanh.dia_chi = dia_chi || chiNhanh.dia_chi;
        chiNhanh.location = location || chiNhanh.location;
        await chiNhanh.save();
        return chiNhanh;
      
    } catch (error) {
        console.log('suaChiNhanh error: ', error);
        throw error;
    }
};

//xóa chi nhánh
const xoaChiNhanh = async (id_chi_nhanh) => {
    try {
        const result = await modelChiNhanh.findById(id_chi_nhanh);
        if (!result) {
            return false;
        }
        result.status = 0;
        await result.save();
        return true;
    } catch (error) {
        console.log('xoaChiNhanh error: ', error);
        throw error;
    }
};

//thêm bàn
const themBan = async (id_chi_nhanh, danh_sach_ban) => {
    try {
        const chiNhanh = await modelChiNhanh.findById(id_chi_nhanh);
        if (!chiNhanh) {
            return false;
        }

        // Lặp qua danh sách các bàn và thêm từng bàn vào chi nhánh
        danh_sach_ban.forEach((ban) => {
            const check = chiNhanh.ban.find((item) => item.ten_ban == ban.ten_ban);
            if (!check) {
                chiNhanh.ban.push({
                    khu_vuc: ban.khu_vuc,
                    ten_ban: ban.ten_ban,
                    trang_thai: 0
                });
            }
        });

        await chiNhanh.save();
        return chiNhanh;
    } catch (error) {
        console.log('themBan error: ', error);
        throw error;
    }
};
//sửa bàn
const suaBan = async (id_chi_nhanh, id_ban, khu_vuc, ten_ban) => {
    try {
        const chiNhanh = await modelChiNhanh.findById(id_chi_nhanh);
        if (!chiNhanh) {
            return false;
        }
        const ban = chiNhanh.ban.find((item) => item._id == id_ban);
        if (!ban) {
            return false;
        }
        ban.khu_vuc = khu_vuc;
        ban.ten_ban = ten_ban;
        await chiNhanh.save();
        return chiNhanh;

    } catch (error) {
        console.log('suaBan error: ', error);
        throw error;
    }
};

//xóa bàn
const xoaBan = async (id_chi_nhanh, id_ban) => {
    try {
        const chiNhanh = await modelChiNhanh.findById(id_chi_nhanh);
        if (!chiNhanh) {
            return false;
        }
        const ban = chiNhanh.ban.find((item) => item._id == id_ban);
        if (!ban) {
            return false;
        }
        await chiNhanh.ban.remove(ban);
        await chiNhanh.save();
        return true;
    } catch (error) {
        console.log('xoaBan error: ', error);
        throw error;
    }
};

//thêm all
const themAll = async (ten_chi_nhanh, dia_chi, danh_sach_ban, location) => {
    try {
        const check = await modelChiNhanh.findOne({ ten_chi_nhanh: ten_chi_nhanh });
        if (check) {
            return false;
        }
        const chiNhanh = {
            ten_chi_nhanh: ten_chi_nhanh,
            dia_chi: dia_chi,
            ban: [],
            status: 1,
            location:  location
        };
        danh_sach_ban.forEach((ban) => {
            chiNhanh.ban.push({
                khu_vuc: ban.khu_vuc,
                ten_ban: ban.ten_ban,
                trang_thai: ban.trang_thai
            });
        });

        const result = await modelChiNhanh.create(chiNhanh);

        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('themBan error: ', error);
        throw error;
    }
};

module.exports = { layDanhSachChiNhanh, layChiNhanhTheoID, layChiNhanhTheoTen, 
                    themChiNhanh, suaChiNhanh, xoaChiNhanh, 
                    themBan, suaBan, xoaBan, themAll };