const toppingModel = require('./ModelTopping');
let vietNamdate = new Date();
vietNamdate.setHours(vietNamdate.getHours() + 7);


//lấy tất cả topping
const layTatCaTopping = async () => {
    try {
        const toppings = await toppingModel.find( { status: 1 } );
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
        if (topping && topping.status === 1) {
            return false;
        }else if(topping && topping.status === 0){
            topping.status = 1;
            topping.gia = gia;
            topping.hinh_anh = hinh_anh;
            topping.mo_ta = mota;
            await topping.save();
            return true;
        }
        const newTopping = new toppingModel({
            ten_topping: ten_topping,
            gia: gia,
            hinh_anh: hinh_anh,
            mo_ta: mota,
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
        topping.mo_ta = mota;
        await topping.save();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};










module.exports = { suaTopping, xoaTopping, themTopping, layTatCaTopping, layToppingTheoId };