const serviceFavorite = require('./ServiceFavorite');



//thêm danh sách yêu thích
const themDanhSachYeuThich = async (id_user, id_san_pham) => {
    try {
        const result = await serviceFavorite.themDanhSachYeuThich(id_user, id_san_pham);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        throw error;
    }
};
//lấy danh sách yêu thích
const layDanhSachYeuThich = async (id_user) => {
    try {
        const result = await serviceFavorite.layDanhSachYeuThich(id_user);
        if (result) {
            return result;
        }
        return false;
    } catch (error) {
        throw error;
    }
};


module.exports = { themDanhSachYeuThich, layDanhSachYeuThich };