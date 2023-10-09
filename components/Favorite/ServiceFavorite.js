const e = require('express');
const modelFavorite = require('./ModelFavorite');
const modelUser = require('../User/ModelUser');



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



module.exports = { themDanhSachYeuThich, layDanhSachYeuThich };