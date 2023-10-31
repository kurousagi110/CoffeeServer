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
const themDanhSachGioHang = async (id_user, id_san_pham, size, so_luong, ten_san_pham, gia, topping) => {
    try {
        console.log(id_user, id_san_pham, size, so_luong);
        const result = await modelGioHang.findOne({ id_user: id_user });
        const sanPham = await modelSanPham.findById(id_san_pham);
        if (!sanPham) {
            return false;
        }
        if (!result) {
            const giohang = {
                id_user: id_user,
                san_pham: [
                    {
                        id_san_pham: id_san_pham,
                        size: size,
                        so_luong: so_luong,
                        ten_san_pham: ten_san_pham,
                        gia: gia,
                        topping: topping
                    }
                ]
            };
            const check = await modelGioHang.create(giohang);
            console.log(check);
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
                    gia: gia,
                    topping: topping
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
const capNhatSoLuongSanPhamGioHang = async (id_user, id_san_pham, size, so_luong, topping, gia, ten_san_pham) => {
    try {
        const result = await modelGioHang.findOne({ id_user: id_user });
        console.log(result);
        const sanPham = {
            _id: id_san_pham,
            ten_san_pham: ten_san_pham,
            size: size,
            so_luong: so_luong,
            gia: gia,
            topping: topping
        }

        if (result) {
            let found = false;

            for (let i = 0; i < result.san_pham.length; i++) {
                if (areSanPhamEqual(result.san_pham[i], sanPham)) {
                    // If the item is the same, update its quantity and mark it as found  
                    if(result.san_pham[i]._id == id_san_pham) {
                        result.san_pham[i].so_luong = so_luong;
                        result.san_pham[i].size = size;
                        result.san_pham[i].gia = gia;
                        result.san_pham[i].topping = topping;
                        result.san_pham[i].ten_san_pham = ten_san_pham;
                        await result.save();
                        return result;
                    }
                    result.san_pham[i].so_luong += so_luong;
                    found = true;   
                }
            }

            if (found) {
                for (let i = 0; i < result.san_pham.length; i++) {
                    if (result.san_pham[i]._id == id_san_pham) {
                        result.san_pham.splice(i, 1);
                        break; // Stop after removing the first matching item
                    }
                }
            }

            if (!found) {
                console.log('not found');
                for(let j = 0; j < result.san_pham.length; j++) {
                    if(result.san_pham[j]._id == id_san_pham) {
                        result.san_pham[j].so_luong = so_luong;
                        result.san_pham[j].size = size;
                        result.san_pham[j].gia = gia;
                        result.san_pham[j].topping = topping;
                        result.san_pham[j].ten_san_pham = ten_san_pham;
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




module.exports = {
    themDanhSachGioHang, layDanhSachGioHang, xoaSanPhamGioHang, capNhatSoLuongSanPhamGioHang,
    themTopping, xoaTopping
};