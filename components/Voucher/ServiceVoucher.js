const modelVoucher = require('./ModelVoucher');
const modelUser = require('../User/ModelUser');


//lấy danh sách voucher của user
const layDanhSachVoucherUser = async (id_user) => {
    try {
        const user = await modelUser.findById(id_user);
        let layDanhSachDate = new Date();
        layDanhSachDate.setHours(layDanhSachDate.getHours() + 7);

        const currentDate = layDanhSachDate;
        const voucher = await modelVoucher.find();

        let VoucherHieuLuc = [];
        let VoucherHetHieuLuc = [];

        for (const item of voucher) {
            if (item.ngay_ket_thuc < currentDate) {
                if (item.trang_thai !== "Hết hiệu lực") {
                    item.trang_thai = "Hết hiệu lực";
                    item.status = 0;
                    await item.save();
                }
                // Kiểm tra nếu voucher có điểm thì bỏ qua
                if (!item.diem) {
                    continue;
                }
            } else {
                // Kiểm tra nếu voucher có điểm thì bỏ qua
                if (!item.diem) {
                    VoucherHieuLuc.push(item);
                }
            }
        }
        
        let userVoucherHieuLuc = [];
        let userVoucherHetHieuLuc = [];

        for (let i = 0; i < user.voucher_user.length; i++) {
            const userVoucher = user.voucher_user[i];

            if (userVoucher.status > 0) {
                userVoucherHieuLuc.push(userVoucher);
            } else {
                userVoucherHetHieuLuc.push(userVoucher);
                
                // Remove from VoucherHieuLuc if conditions match
                const indexToRemove = VoucherHieuLuc.findIndex(voucher => voucher._id.toString() === userVoucher.id_voucher.toString() && userVoucher.status === 0);
                
                if (indexToRemove !== -1) {
                    VoucherHieuLuc.splice(indexToRemove, 1);
                }
            }
        }

        // Ghép lại thành VoucherHieuLuc và VoucherHetHieuLuc
        VoucherHieuLuc.push(...userVoucherHieuLuc);
        VoucherHetHieuLuc.push(...userVoucherHetHieuLuc);

        VoucherHieuLuc.sort((a, b) => {
            return a.ngay_ket_thuc - b.ngay_ket_thuc;
        });

        return {
            VoucherHieuLuc,
            VoucherHetHieuLuc,
        };

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//lấy danh sách all voucher
const layDanhSachAllVoucher = async () => {
    try {
        const list = await modelVoucher.find();
        let layVoucherDate = new Date();
        layVoucherDate.setHours(layVoucherDate.getHours() + 7);
        const currentDate = layVoucherDate;

        for (const voucher of list) {
            if (voucher.ngay_ket_thuc < currentDate && voucher.trang_thai !== "Hết hiệu lực") {
                voucher.trang_thai = "Hết hiệu lực";
                voucher.status = 0;
                await voucher.save();
            }
        }

        const data = await modelVoucher.find();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

}




//lấy danh sách voucher ai cũng có thể xem trừ voucher đổi điểm
const layDanhSachVoucher = async () => {
    try {
        const list = await modelVoucher.find();
        let layVoucherDate = new Date();
        layVoucherDate.setHours(layVoucherDate.getHours() + 7);
        const currentDate = layVoucherDate;

        for (const voucher of list) {
            if (voucher.ngay_ket_thuc < currentDate && voucher.trang_thai !== "Hết hiệu lực") {
                voucher.trang_thai = "Hết hiệu lực";
                voucher.status = 0;
                await voucher.save();
            }
        }

        const data = await modelVoucher.find({ trang_thai: { $ne: "Hết hiệu lực" }, diem: 0 });
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};
//lấy danh sách voucher đổi điểm
const layDanhSachVoucherDoiDiem = async () => {
    try {
        const list = await modelVoucher.find();
        let layDoiDiemDate = new Date();
        layDoiDiemDate.setHours(layDoiDiemDate.getHours() + 7);
        const currentDate = layDoiDiemDate;

        for (const voucher of list) {
            if (voucher.ngay_ket_thuc < currentDate && voucher.trang_thai !== "Hết hiệu lực") {
                voucher.trang_thai = "Hết hiệu lực";
                voucher.status = 0;
                await voucher.save();
            }
        }

        const data = await modelVoucher.find({ trang_thai: { $ne: "Hết hiệu lực" }, diem: { $ne: 0 } });
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//lấy thông tin voucher theo id
const layThongTinVoucher = async (id_voucher) => {
    try {
        const data = await modelVoucher.findById(id_voucher);
        if (!data) {
            return false;
        }
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//đổi điểm thành voucher
const doiDiemThanhVoucher = async (id_user, id_voucher) => {
    try {
        const user = await modelUser.findById(id_user);
        const checkVoucher = await modelVoucher.findById(id_voucher);
        for(let i = 0; i < user.voucher_user.length; i++){
            if(user.voucher_user[i].id_voucher === id_voucher){
                return false;
            }
        }
        let doiDiemDate = new Date();
        doiDiemDate.setHours(doiDiemDate.getHours() + 7);
        console.log(checkVoucher);
        if (!checkVoucher || !checkVoucher) {
            return false;
        }
        if (user.tich_diem < checkVoucher.diem) {
            return false;
        }
        user.tich_diem = user.tich_diem - checkVoucher.diem;
        user.doi_diem.push({
            ngay_doi: doiDiemDate,
            ten_doi_diem: "Đổi điểm thành voucher",
            so_diem: -checkVoucher.diem,
        });
        // let status = 1;
        // let sosanh = "Miễn phí vận chuyển"
        // if (ten_voucher.toLowerCase() === sosanh.toLowerCase()){
        //     status = 1;
        // }else if (giam_gia === 0){
        //     status = 2;
        // }else{
        //     status = 3;
        // }
        const voucher = {
            id_voucher: id_voucher,
            ten_voucher: checkVoucher.ten_voucher,
            ma_voucher: checkVoucher.ma_voucher,
            diem: checkVoucher.diem,
            giam_gia: checkVoucher.giam_gia,
            gia_tri: checkVoucher.gia_tri,
            mo_ta: checkVoucher.mo_ta,
            trang_thai: checkVoucher.trang_thai,
            ngay_bat_dau: doiDiemDate,
            ngay_ket_thuc: checkVoucher.ngay_ket_thuc,
            hinh_anh: checkVoucher.hinh_anh,
            status: checkVoucher.status,
        };
        user.voucher_user.push(voucher);
        await user.save();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

// sử dụng voucher
const suDungVoucher = async (id_user, id_voucher) => {
    try {
        console.log("id_user" + id_user);
        console.log("id_voucher" + id_voucher);
        let voucher;
        voucher = await modelVoucher.findById(id_voucher);
        console.log("voucher 1111" + voucher);
        if (!voucher) {
            voucher = await modelUser.findOne({ "voucher_user._id": id_voucher }, { "voucher_user.$": 1 });
            console.log("voucher" + voucher);
        }
        const user = await modelUser.findById(id_user);
        console.log("user" + user);
        if (voucher.trang_thai === "Hết hiệu lực") {
            return false;
        }
        if (user.voucher_user.length > 0) {
            for (const item of user.voucher_user) {
                if (item.id_voucher === id_voucher && item.status > 0) {
                    item.status = 0;
                    await user.save();
                    return true;
                } else if (item.id_voucher === id_voucher && item.status === 0) {
                    return false;
                }
            }
        }
        user.voucher_user.push({
            id_voucher: id_voucher,
            ten_voucher: voucher.ten_voucher,
            ma_voucher: voucher.ma_voucher,
            diem: voucher.diem,
            giam_gia: voucher.giam_gia,
            gia_tri: voucher.gia_tri,
            mo_ta: voucher.mo_ta,
            ngay_bat_dau: voucher.ngay_bat_dau,
            ngay_ket_thuc: voucher.ngay_ket_thuc,
            trang_thai: "Đã sử dụng", 
            hinh_anh: voucher.hinh_anh,
            status: 0,
        });
        await user.save();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//thêm voucher
const themVoucher = async (ten_voucher, ma_voucher, gia_tri, mo_ta, ngay_ket_thuc, diem, hinh_anh, giam_gia) => {
    try {
        const check = await modelVoucher.findOne({ ma_voucher: ma_voucher });
        if (check) {
            return false;
        }
        let status = 1;
        let kitu = "Miễn phí vận chuyển"
        if (ten_voucher.toLowerCase() === kitu.toLowerCase()) {
            status = 1
        } else if (giam_gia === 0) {
            status = 2
        } else {
            status = 3
        }
        let themVoucherDate = new Date();
        themVoucherDate.setHours(themVoucherDate.getHours() + 7);
        const voucher = new modelVoucher({
            ten_voucher: ten_voucher,
            ma_voucher: ma_voucher,
            gia_tri: gia_tri,
            diem: diem,
            giam_gia: giam_gia,
            mo_ta: mo_ta,
            ngay_bat_dau: themVoucherDate,
            ngay_ket_thuc: new Date(themVoucherDate.getTime() + (ngay_ket_thuc * 24 * 60 * 60 * 1000)), // Thay vì new Date.now() + ngay_ket_thuc
            trang_thai: "Còn hiệu lực",
            hinh_anh: hinh_anh,
            status: status,
        });
        await voucher.save();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//sửa voucher
const suaVoucher = async (id_voucher, ten_voucher, ma_voucher, mo_ta, ngay_ket_thuc, hinh_anh, giam_gia) => {
    try {
        const voucher = await modelVoucher.findById(id_voucher);
        if (!voucher) {
            return false;
        }
        let sosanh = "Miễn phí vận chuyển";
        if (ten_voucher.toLowerCase() === sosanh.toLowerCase()) {
            voucher.status = 1;
        } else {
            voucher.status = 2;
        }
        let themVoucherDate = new Date();
        themVoucherDate.setHours(themVoucherDate.getHours() + 7);
        voucher.ten_voucher = ten_voucher || voucher.ten_voucher;
        voucher.ma_voucher = ma_voucher || voucher.ma_voucher;
        voucher.mo_ta = mo_ta || voucher.mo_ta;
        voucher.giam_gia = giam_gia || voucher.giam_gia;
        voucher.hinh_anh = hinh_anh || voucher.hinh_anh;
        voucher.ngay_ket_thuc = new Date(themVoucherDate.getTime() + (ngay_ket_thuc * 24 * 60 * 60 * 1000));
        await voucher.save();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//xóa voucher
const xoaVoucher = async (id_voucher) => {
    try {
        const voucher = await modelVoucher.findByIdAndDelete(id_voucher);
        if (!voucher) {
            return false;
        }
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};






module.exports = {
    layDanhSachVoucherUser, layDanhSachVoucher, doiDiemThanhVoucher, suDungVoucher, themVoucher, suaVoucher, xoaVoucher,
    layDanhSachVoucherDoiDiem, layThongTinVoucher, layDanhSachAllVoucher
};