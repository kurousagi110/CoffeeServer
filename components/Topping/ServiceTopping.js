const toppingModel = require('./ModelTopping');



//lấy tất cả topping
const layTatCaTopping = async () => {
    try {
        const toppings = await toppingModel.find();
        return toppings;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//lấy topping theo id
const layToppingTheoId = async (id_topping) => {
    try {
        const topping = await toppingModel.findOne({ _id: id_topping });
        return topping;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//thêm topping
const themTopping = async (ten_topping, gia, hinh_anh, mota) => {
    try {
        const topping = await toppingModel.findOne({ ten_topping: ten_topping });
        if (topping) {
            return false;
        }
        const newTopping = new toppingModel({
            ten_topping: ten_topping,
            gia: gia,
            hinh_anh: hinh_anh,
            mota: mota,
            status: 1,
            isSelected: false,
        });
        await newTopping.save();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


//xóa topping
const xoaTopping = async (id_topping) => {
    try {
        const topping = await toppingModel.findOne({ _id: id_topping });
        if (!topping) {
            return false;
        }
        topping.status = 0;
        await topping.save();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//sửa topping
const suaTopping = async (id_topping, ten_topping, gia, hinh_anh, mota) => {
    try {
        const topping = await toppingModel.findOne({ _id: id_topping });
        if (!topping) {
            return false;
        }
        topping.ten_topping = ten_topping;
        topping.gia = gia;
        topping.hinh_anh = hinh_anh;
        topping.mota = mota;
        await topping.save();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};










module.exports = { suaTopping, xoaTopping, themTopping, layTatCaTopping, layToppingTheoId };