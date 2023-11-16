const e = require('express');
const modelFavorite = require('./ModelFavorite');
const modelUser = require('../User/ModelUser');
const modelSanPham = require('../SanPham/ModelSanPham');


//lấy danh sách sản phẩm yêu thích theo user
const layDanhSachSanPhamYeuThich = async (id_user) => {
    try {
        const result = await modelFavorite.findOne({ id_user: id_user });
        console.log('result: ', result);
        if(!result){
            return null;
        }else{
            let danh_sach_san_pham = [];
            for(let i = 0; i < result.san_pham.length; i++){
                const san_pham = await modelSanPham.findById(result.san_pham[i].id_san_pham);
                if(san_pham){
                    danh_sach_san_pham.push(san_pham);
                }
            }
            return danh_sach_san_pham;
        }
    } catch (error) {
        console.log('Lỗi tại layDanhSachSanPhamYeuThich service: ', error)
        throw error;
    }
};

//thêm danh sách yêu thích
const themDanhSachYeuThich = async (id_user, id_san_pham) => {
    try {
        const result = await modelFavorite.findOne({ id_user: id_user });
        if(!result){
            const favorite = {
                id_user: id_user,
                san_pham: [
                    {
                        id_san_pham: id_san_pham,
                    }
                ]
            }
            const result = await modelFavorite.create(favorite);
            return result;
        }else{
            for(let i = 0; i < result.san_pham.length; i++){
                if(result.san_pham[i].id_san_pham == id_san_pham){
                    result.san_pham.splice(i, 1);
                    await result.save();
                    return 10;
                }
            }
            result.san_pham.push({id_san_pham: id_san_pham});
            await result.save();
            return 100;
        }
    } catch (error) {
        console.log('Lỗi tại themDanhSachYeuThich service: ', error)
        throw error;
    }
};

//lấy danh sách yêu thích
const layDanhSachYeuThich = async (id_user) => {
    try {
        const result = await modelFavorite.findOne({ id_user: id_user });
        return result;
    } catch (error) {
        console.log('Lỗi tại layDanhSachYeuThich service: ', error)
        throw error;
    }
};



module.exports = { themDanhSachYeuThich, layDanhSachYeuThich, layDanhSachSanPhamYeuThich };