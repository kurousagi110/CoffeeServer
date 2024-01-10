const modelGioHang = require('./ModelGioHang');
const modelUser = require('../User/ModelUser');
const modelSanPham = require('../SanPham/ModelSanPham');


//xóa toping
const xoaTopping = async (id_user, id_san_pham, size, ten_topping) => {
    try {
        const result = await modelGioHang.findOne({ id_user: id_user });
        if (result) {
            for (let i = 0; i < result.san_pham.length; i++) {
                if (result.san_pham[i].id_san_pham == id_san_pham && result.san_pham[i].size == size) {
                    for (let j = 0; j < result.san_pham[i].topping.length; j++) {
                        if (result.san_pham[i].topping[j].ten_topping == ten_topping) {
                            result.san_pham[i].topping.splice(j, 1);
                            await result.save();
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    } catch (error) {
        console.log('Lỗi tại xoaTopping service: ', error)
        throw error;
    }
};

//thêm topping
const themTopping = async (id_user, id_san_pham_gio_hang, ten_topping, gia) => {
    try {
        const result = await modelGioHang.findOne({ id_user: id_user });
        if (result) {
            for (let i = 0; i < result.san_pham.length; i++) {
                if (result.san_pham[i]._id == id_san_pham_gio_hang) {
                    result.san_pham[i].topping.push({
                        ten_topping: ten_topping,
                        gia: gia
                    });
                    await result.save();
                    return true;
                }
            }
        }
        return false;
    } catch (error) {
        console.log('Lỗi tại themTopping service: ', error)
        throw error;
    }
};

//thêm danh sách giỏ hàng
const themDanhSachGioHang = async (id_user, id_san_pham, size, so_luong, ten_san_pham, topping) => {
    try {
        console.log(id_user, id_san_pham, size, so_luong);
        const result = await modelGioHang.findOne({ id_user: id_user });
        const sanPham = await modelSanPham.findById(id_san_pham);
        console.log(sanPham);
        if (!sanPham) {
            return false;
        }
        let data = {};
        for(let i=0; i < sanPham.size.length; i++) {
            if(sanPham.size[i].ten_size === size) {
                console.log(sanPham.size[i].ten_size +"ssss");
                data = {
                    ten_size : sanPham.size[i].ten_size,
                    gia: sanPham.size[i].gia,
                    giam_gia: sanPham.size[i].giam_gia,
                    gia_da_giam: sanPham.size[i].gia_da_giam,
                    isSelected: sanPham.size[i].isSelected
                }
            }
        }
        console.log(data);
        if (!result) {
            const giohang = {
                id_user: id_user,
                san_pham: [
                    {
                        id_san_pham: id_san_pham,
                        size: size,
                        so_luong: so_luong,
                        ten_san_pham: ten_san_pham,
                        gia: data.gia,
                        giam_gia: data.giam_gia,
                        gia_da_giam: data.gia_da_giam,
                        topping: topping,
                        hinh_anh_sp: sanPham.hinh_anh_sp
                    }
                ]
            };
            const check = await modelGioHang.create(giohang);
            return check;
        } else {
            let found = false;
            for (let i = 0; i < result.san_pham.length; i++) {
                if (
                    result.san_pham[i].id_san_pham == id_san_pham &&
                    result.san_pham[i].size == size &&
                    areToppingsEqual(result.san_pham[i].topping, topping)
                ) {
                    result.san_pham[i].so_luong += so_luong;
                    found = true;
                    await result.save();
                    return result;
                }
            }

            if (!found) {
                result.san_pham.push({
                    id_san_pham: id_san_pham,
                    ten_san_pham: ten_san_pham,
                    size: size,
                    so_luong: so_luong,
                    gia: data.gia,
                    giam_gia: data.giam_gia,
                    gia_da_giam: data.gia_da_giam,
                    topping: topping,
                    hinh_anh_sp: sanPham.hinh_anh_sp
                });
                await result.save();
                return result;
            }
        }
    } catch (error) {
        console.log('Lỗi tại themDanhSachGioHang service: ', error);
        throw error;
    }
};

function areToppingsEqual(toppings1, toppings2) {
    if (toppings1.length !== toppings2.length) {
        return false;
    }

    for (let i = 0; i < toppings1.length; i++) {
        if (toppings1[i].ten_topping !== toppings2[i].ten_topping) {
            return false;
        }
    }

    return true;
}





//xóa sản phẩm giỏ hàng
const xoaSanPhamGioHang = async (id_user, _id) => {
    try {
        const result = await modelGioHang.findOne({ id_user: id_user });
        if (result) {
            for (let i = 0; i < result.san_pham.length; i++) {
                if (result.san_pham[i]._id == _id) {
                    result.san_pham.splice(i, 1);
                    await result.save();
                    return result;
                }
            }
        }
        return false;
    } catch (error) {
        console.log('Lỗi tại xoaSanPhamGioHang service: ', error)
        throw error;
    }
};

//cập nhật số lượng sản phẩm giỏ hàng
const capNhatSoLuongSanPhamGioHang = async (id_user, _id, id_san_pham, size, so_luong,topping) => {
    try {
        const result = await modelGioHang.findOne({ id_user: id_user });
        const sanPhamResult = await modelSanPham.findById(id_san_pham);
        console.log(result);
        let data = {};
        for(let i=0; i < sanPhamResult.size.length; i++) {
            if(sanPhamResult.size[i].ten_size === size) {
                data = {
                    ten_size : sanPhamResult.size[i].ten_size,
                    gia: sanPhamResult.size[i].gia,
                    giam_gia: sanPhamResult.size[i].giam_gia,
                    gia_da_giam: sanPhamResult.size[i].gia_da_giam,
                    isSelect: sanPhamResult.size[i].isSelect
                }
                break;
            }
        }

        const sanPham = {
            _id: _id,
            ten_san_pham: sanPhamResult.ten_san_pham,
            id_san_pham: id_san_pham,
            size: size,
            so_luong: so_luong,
            gia: data.gia,
            giam_gia: data.giam_gia,
            gia_da_giam: data.gia_da_giam,
            topping: topping
        }
        console.log("day la san pham"+sanPham);
        if (result) {
            let found = false;

            for (let i = 0; i < result.san_pham.length; i++) {
                if (areSanPhamEqual(result.san_pham[i], sanPham)) {
                    // If the item is the same, update its quantity and mark it as found  
                    if(result.san_pham[i]._id == _id) {
                        result.san_pham[i].so_luong = so_luong;
                        result.san_pham[i].size = size;
                        result.san_pham[i].gia = data.gia;
                        result.san_pham[i].giam_gia = data.giam_gia;
                        result.san_pham[i].gia_da_giam = data.gia_da_giam;
                        result.san_pham[i].topping = topping;
                        result.san_pham[i].ten_san_pham = sanPhamResult.ten_san_pham;
                        await result.save();
                        return result;
                    }
                    result.san_pham[i].so_luong += so_luong;
                    found = true;   
                }
            }

            if (found) {
                for (let i = 0; i < result.san_pham.length; i++) {
                    if (result.san_pham[i]._id == _id) {
                        result.san_pham.splice(i, 1);
                        break; // Stop after removing the first matching item
                    }
                }
            }

            if (!found) {
                console.log('not found');
                for(let j = 0; j < result.san_pham.length; j++) {
                    if(result.san_pham[j]._id == _id) {
                        result.san_pham[j].so_luong = so_luong;
                        result.san_pham[j].size = size;
                        result.san_pham[j].gia = data.gia;
                        result.san_pham[j].giam_gia = data.giam_gia;
                        result.san_pham[j].gia_da_giam = data.gia_da_giam;
                        result.san_pham[j].topping = topping;
                        result.san_pham[j].ten_san_pham = sanPhamResult.ten_san_pham;
                        await result.save();
                        return result;
                    }
                }
            }
            console.log(found);
            await result.save();
            return result;
        }
        
        return false;
    } catch (error) {
        console.log('Lỗi tại capNhatSoLuongSanPhamGioHang service: ', error)
        throw error;
    }
};

function areSanPhamEqual(sanPham1, sanPham2) {
    return (
        sanPham1._id !== sanPham2._id &&
        sanPham1.ten_san_pham === sanPham2.ten_san_pham &&
        sanPham1.size === sanPham2.size &&
        sanPham1.gia === sanPham2.gia &&
        sanPham1.giam_gia === sanPham2.giam_gia &&
        sanPham1.gia_da_giam === sanPham2.gia_da_giam &&
        areToppingsEqual1(sanPham1.topping, sanPham2.topping)
    );
}

function areToppingsEqual1(topping1, topping2) {
    if (topping1.length !== topping2.length) {
        return false;
    }

    for (let i = 0; i < topping1.length; i++) {
        if (topping1[i].ten_topping !== topping2[i].ten_topping || topping1[i].gia !== topping2[i].gia) {
            return false;
        }
    }

    return true;
}




//lấy danh sách giỏ hàng
const layDanhSachGioHang = async (id_user) => {
    try {
        const result = await modelGioHang.findOne({ id_user: id_user });
        if (result) {
            return result;
        }
        else {
            const giohang = {
                id_user: id_user,
                san_pham: []
            };
            return giohang;
        }

    } catch (error) {
        console.log('Lỗi tại layDanhSachGioHang service: ', error)
        throw error;
    }
};

//xóa giỏ hàng
const xoaGioHang = async (id_user) => {
    try {
        const result = await modelGioHang.findOneAndDelete({ id_user: id_user });
        if (result) {
            return true;
        }
        else {
            return false;
        }

    } catch (error) {
        console.log('Lỗi tại xoaGioHang service: ', error)
        throw error;
    }

}



module.exports = {
    themDanhSachGioHang, layDanhSachGioHang, xoaSanPhamGioHang, capNhatSoLuongSanPhamGioHang,
    themTopping, xoaTopping, xoaGioHang
};