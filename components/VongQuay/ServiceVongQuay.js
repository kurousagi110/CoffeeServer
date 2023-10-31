const modelVongQuay = require('./ModelVongQuay');
const modelUser = require('../User/ModelUser');


//sử dụng vòng quay
const suDungVongQuay = async (id_user) => {
    try {
        const user = await modelUser.findById(id_user);
        if (!user) {
            return false;
        }
        if (user.diem < 100) {
            return false;
        }
        user.diem = user.diem - 100;
        user.doi_diem.push({
            ngay_doi: new Date(),
            ten_doi_diem: "Sử dụng vòng quay",
            so_diem: -100,
        });
        await user.save();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


//thêm voucher / điểm cho user trúng vòng quay
const themVoucherUser = async (id_user, id_vong_quay) => {
    try {
        const user = await modelUser.findById(id_user);
        const vongquay = await modelVongQuay.findById(id_vong_quay);
        if (!user || !vongquay) {
            return false;
        }
        if (vongquay.diem > 0) {
            user.diem = user.diem + vongquay.diem;
            user.doi_diem.push({
                ngay_doi: new Date(),
                ten_doi_diem: "Nhận điểm từ vòng quay",
                so_diem: vongquay.diem,
            });
            await user.save();
            return 10;
        }
        const voucher = {
            id_voucher: vongquay._id,
            ten_voucher: vongquay.ten_voucher,
            ma_voucher: vongquay.ma_voucher,
            diem: vongquay.diem,
            gia_tri: vongquay.gia_tri,
            mo_ta: vongquay.mo_ta,
            hinh_anh: vongquay.hinh_anh,
            ngay_bat_dau: vongquay.ngay_bat_dau,
            ngay_ket_thuc: vongquay.ngay_ket_thuc,

            status: 1,
        };
        user.voucher_user.push(voucher);
        await user.save();
        return 100;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//lấy danh sách vòng quay
const layDanhSachVongQuay = async () => {
    try {
        const list = await modelVongQuay.aggregate([{ $match: { status: 1 } }, { $sample: { size: 6 } }]);
        if (!list) {
            return false;
        }
        return list;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//thêm vòng quay
const themVongQuay = async (ten_vong_quay, mo_ta, ten_voucher ,ma_voucher ,diem ,gia_tri, hinh_anh ) => {
    try {
        const check = await modelVongQuay.findOne({ ma_voucher: ma_voucher });
        if (check) {
            return false;
        }
        const vongquay = new modelVongQuay({
            ten_vong_quay: ten_vong_quay,
            mo_ta: mo_ta,
            ten_voucher: ten_voucher,
            ma_voucher: ma_voucher,
            diem: diem,
            gia_tri: gia_tri,
            ngay_bat_dau: new Date(),
            ngay_ket_thuc: new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000)),
            trang_thai: "Còn hiệu lực",
            hinh_anh: hinh_anh,
            status: 1,
        });
        await vongquay.save();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//sửa vòng quay
const suaVongQuay = async (id_vong_quay, ten_vong_quay, mo_ta, ten_voucher ,ma_voucher ,diem ,gia_tri, hinh_anh ) => {
    try {
        const vongquay = await modelVongQuay.findById(id_vong_quay);
        if (!vongquay) {
            return false;
        }
        vongquay.ten_vong_quay = ten_vong_quay || vongquay.ten_vong_quay;
        vongquay.mo_ta = mo_ta || vongquay.mo_ta;
        vongquay.ten_voucher = ten_voucher || vongquay.ten_voucher;
        vongquay.ma_voucher = ma_voucher || vongquay.ma_voucher;
        vongquay.diem = diem || vongquay.diem;
        vongquay.gia_tri = gia_tri || vongquay.gia_tri;
        vongquay.ngay_bat_dau = new Date();
        vongquay.ngay_ket_thuc = new Date(new Date().getTime() + (30 * 24 * 60 * 60 * 1000));
        vongquay.hinh_anh = hinh_anh || vongquay.hinh_anh;
        await vongquay.save();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//xóa vòng quay
const xoaVongQuay = async (id_vong_quay) => {
    try {
        const result = await modelVongQuay.findById(id_vong_quay);
        if (!result) {
            return false;
        }
        result.status = 0;
        await result.save();
        return true;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};



module.exports = { themVoucherUser, layDanhSachVongQuay, themVongQuay, suaVongQuay, xoaVongQuay, suDungVongQuay };