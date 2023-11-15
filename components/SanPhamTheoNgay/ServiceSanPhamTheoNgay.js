const modelSanPhamTheoNgay = require('./ModelSanPhamTheoNgay');
const modelSanPham = require('../SanPham/ModelSanPham');
let vietNamdate = new Date();
vietNamdate.setHours(vietNamdate.getHours() + 7);


//đặt danh sách sản phẩm theo ngày
const datDanhSachSanPhamTheoNgay = async () => {
    try {
        const list = await modelSanPham.aggregate([{ $match: { status: 1 } }, { $sample: { size: 6 } }]);
        if (!list || list.length === 0) {
            return false;
        }
        await modelSanPhamTheoNgay.deleteMany({});
        const danhsach = await modelSanPhamTheoNgay.create(list);
        return danhsach;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

//lấy danh sách sản phẩm theo ngày
const layDanhSachSanPhamTheoNgay = async () => {
    try {
        const list = await modelSanPhamTheoNgay.find();
        if (!list || list.length === 0) {
            return false;
        }
        return list;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}





module.exports = { datDanhSachSanPhamTheoNgay, layDanhSachSanPhamTheoNgay } 