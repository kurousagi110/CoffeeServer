const serviceChiNhanh = require('./ServiceChiNhanh');

//lấy danh sách chi nhánh
const layDanhSachChiNhanh = async () => {
    try {
        const result = await serviceChiNhanh.layDanhSachChiNhanh();
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('layDanhSachChiNhanh controller error: ', error);
        throw error;
    }
};

//lấy chi nhánh theo id
const layChiNhanhTheoID = async (id_chi_nhanh) => {
    try {
        const result = await serviceChiNhanh.layChiNhanhTheoID(id_chi_nhanh);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('layChiNhanhTheoID controller error: ', error);
        throw error;
    }
};

//tìm chi nhánh theo tên
const layChiNhanhTheoTen = async (ten_chi_nhanh) => {
    try {
        const result = await serviceChiNhanh.layChiNhanhTheoTen(ten_chi_nhanh);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('timChiNhanhTheoTen controller error: ', error);
        throw error;
    }
};

//thêm chi nhánh
const themChiNhanh = async (ten_chi_nhanh, dia_chi) => {
    try {
        
        const result = await serviceChiNhanh.themChiNhanh(ten_chi_nhanh, dia_chi);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('themChiNhanh controller error: ', error);
        throw error;
    }
};


//cập nhật chi nhánh
const suaChiNhanh = async (id_chi_nhanh, ten_chi_nhanh, dia_chi) => {
    try {
        const result = await serviceChiNhanh.suaChiNhanh(id_chi_nhanh, ten_chi_nhanh, dia_chi);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('capNhatChiNhanh controller error: ', error);
        throw error;
    }
};


//xóa chi nhánh
const xoaChiNhanh = async (id_chi_nhanh) => {
    try {
        const result = await serviceChiNhanh.xoaChiNhanh(id_chi_nhanh);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('xoaChiNhanh controller error: ', error);
        throw error;
    }
};

//thêm bàn
const themBan = async (id_chi_nhanh, ban) => {
    try {
        const result = await serviceChiNhanh.themBan(id_chi_nhanh, ban);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('themBan controller error: ', error);
        throw error;
    }
};

//sửa bàn
const suaBan = async (id_chi_nhanh, id_ban, khu_vuc, ten_ban, trang_thai) => {
    try {
        const result = await serviceChiNhanh.suaBan(id_chi_nhanh, id_ban, khu_vuc, ten_ban, trang_thai);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('suaBan controller error: ', error);
        throw error;
    }
};
//xóa bàn
const xoaBan = async (id_chi_nhanh, id_ban) => {
    try {
        const result = await serviceChiNhanh.xoaBan(id_chi_nhanh, id_ban);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('xoaBan controller error: ', error);
        throw error;
    }
};

//thêm all
const themAll = async (ten_chi_nhanh, dia_chi, ban) => {
    try {
        const result = await serviceChiNhanh.themAll(ten_chi_nhanh, dia_chi, ban);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        console.log('themAll controller error: ', error);
        throw error;
    }
};

module.exports = { layDanhSachChiNhanh, layChiNhanhTheoID, layChiNhanhTheoTen, 
                    themChiNhanh, suaChiNhanh, xoaChiNhanh, 
                    themBan, suaBan, xoaBan, themAll};