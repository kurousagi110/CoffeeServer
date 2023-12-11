const modelDonHang = require('./ModelDonHang');
const modelSanPham = require('../SanPham/ModelSanPham');
const modelUser = require('../User/ModelUser');
const moment = require('moment');



//thống kê đơn hàng theo ngày và chi nhánh
const thongKeDonHangTheoNgayVaChiNhanh = async (ngaybatdau, ngayketthuc, chiNhanh) => {
    try {
        // Điều kiện tìm kiếm sẽ thay đổi tùy thuộc vào giá trị của chiNhanh
        const condition = {
            ngay_dat: { $gte: ngaybatdau, $lte: ngayketthuc }
        };

        if (chiNhanh) {
            condition.id_chi_nhanh = chiNhanh;
        }
        let donHang = [];
        if (chiNhanh === "all") {
            donHang = await modelDonHang.find({ ngay_dat: { $gte: ngaybatdau, $lte: ngayketthuc } });
        } else {
            donHang = await modelDonHang.find(condition);
        }
        if (!donHang || donHang.length === 0) {
            return [];
        }

        let tong_don_hang = 0;
        let doanh_thu = 0;
        let don_hang_da_huy = [];
        let gia_tri_don_hang_da_huy = 0;
        let so_luong_don_hang_da_huy = 0;
        let don_hang_da_hoan_thanh = [];
        let gia_tri_don_hang_da_hoan_thanh = 0;
        let so_luong_don_hang_da_hoan_thanh = 0;
        let don_hang_dang_xu_ly = [];
        let gia_tri_don_hang_dang_xu_ly = 0;
        let so_luong_don_hang_dang_xu_ly = 0;


        for (let i = 0; i < donHang.length; i++) {
            tong_don_hang += 1;
            doanh_thu += donHang[i].thanh_tien;
            if (donHang[i].ma_trang_thai === 0) {
                don_hang_da_huy.push(donHang[i]);
                gia_tri_don_hang_da_huy += donHang[i].thanh_tien;
                so_luong_don_hang_da_huy += 1;
            } else if (donHang[i].ma_trang_thai === 4 || donHang[i].ma_trang_thai === 5 || donHang[i].ma_trang_thai === 6) {
                don_hang_da_hoan_thanh.push(donHang[i]);
                gia_tri_don_hang_da_hoan_thanh += donHang[i].thanh_tien;
                so_luong_don_hang_da_hoan_thanh += 1;
            } else {
                don_hang_dang_xu_ly.push(donHang[i]);
                gia_tri_don_hang_dang_xu_ly += donHang[i].thanh_tien;
                so_luong_don_hang_dang_xu_ly += 1;
            }
        }
        return {
            tong_don_hang: tong_don_hang,
            doanh_thu: doanh_thu,
            don_hang_da_huy: don_hang_da_huy,
            gia_tri_don_hang_da_huy: gia_tri_don_hang_da_huy,
            so_luong_don_hang_da_huy: so_luong_don_hang_da_huy,
            don_hang_da_hoan_thanh: don_hang_da_hoan_thanh,
            gia_tri_don_hang_da_hoan_thanh: gia_tri_don_hang_da_hoan_thanh,
            so_luong_don_hang_da_hoan_thanh: so_luong_don_hang_da_hoan_thanh,
            don_hang_dang_xu_ly: don_hang_dang_xu_ly,
            gia_tri_don_hang_dang_xu_ly: gia_tri_don_hang_dang_xu_ly,
            so_luong_don_hang_dang_xu_ly: so_luong_don_hang_dang_xu_ly
        }

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

//thêm đơn hàng offline
const themDonHangOffline = async (
    ma_khach_hang,
    id_chi_nhanh,
    loai_don_hang,
    dia_chi,
    san_pham,
    ghi_chu,
    giam_gia,
    phi_van_chuyen,
    thanh_tien,
    thanh_toan,
    ma_trang_thai,
    ten_trang_thai
) => {
    try {
        let tong_san_pham = 0;

        for (let i = 0; i < san_pham.length; i++) {
            tong_san_pham += san_pham[i].so_luong;
        }

        let themDonHangDate = new Date();
        themDonHangDate.setHours(themDonHangDate.getHours() + 7);
        if (ma_khach_hang === "") {
            ma_khach_hang = id_chi_nhanh;
        }

        // Find the user data
        const user = await modelUser.findOne({ ma_khach_hang: ma_khach_hang });

        const duLieu = {
            id_user: user._id,
            id_chi_nhanh: id_chi_nhanh,
            loai_don_hang: loai_don_hang,
            dia_chi: dia_chi,
            ngay_dat: themDonHangDate,
            san_pham: san_pham,
            ghi_chu: ghi_chu,
            so_diem_tich_luy: Math.floor(thanh_tien / 2500),
            giam_gia: giam_gia,
            phi_van_chuyen: phi_van_chuyen,
            ma_trang_thai: ma_trang_thai,
            ten_trang_thai: ten_trang_thai,
            ngay_cap_nhat_1: themDonHangDate,
            tong_san_pham: tong_san_pham,
            thanh_tien: thanh_tien,
            email: "",
            ten_user: "",
            so_sao: null,
            danh_gia: "",
            thanh_toan: thanh_toan,
        };

        if (!user) {
            // Create order for new user
            const donHang = await modelDonHang.create(duLieu);
            return donHang;
        } else {
            // Create order for existing user
            const donHang = await modelDonHang.create(duLieu);
            console.log(donHang);

            // Update product quantities
            const productUpdates = donHang.san_pham.map(async (sanPham) => {
                const updatedProduct = await modelSanPham.findByIdAndUpdate(
                    sanPham.id_san_pham,
                    { $inc: { so_luong_da_ban: sanPham.so_luong } },
                    { new: true }
                );
                return updatedProduct;
            });

            await Promise.all(productUpdates);

            // Update user's information
            const doi_diem = {
                ten_doi_diem: "Cộng điểm đơn hàng",
                ngay_doi: themDonHangDate,
                so_diem: donHang.so_diem_tich_luy,
            };

            user.tich_diem += donHang.so_diem_tich_luy;
            user.doi_diem = doi_diem;
            user.diem_tich_luy += donHang.so_diem_tich_luy;
            user.diem_thanh_vien += donHang.so_diem_tich_luy;

            // Adjust the logic for user.hang_thanh_vien
            const diem_thanh_vien = user.diem_thanh_vien;
            if (diem_thanh_vien < 200) {
                user.hang_thanh_vien = "Khách hàng mới";
            } else if (diem_thanh_vien < 500) {
                user.hang_thanh_vien = "Hạng đồng";
            } else if (diem_thanh_vien < 1000) {
                user.hang_thanh_vien = "Hạng bạc";
            } else if (diem_thanh_vien < 2000) {
                user.hang_thanh_vien = "Hạng vàng";
            } else if (diem_thanh_vien < 5000) {
                user.hang_thanh_vien = "Hạng kim cương";
            } else {
                user.hang_thanh_vien = "Khách hàng VIP";
            }

            await Promise.all([user.save(), donHang.save()]);
            return donHang;
        }
    } catch (error) {
        throw new Error(error);
    }
};



//lấy thống kê theo ngày của chi nhánh
const thongKeTheoNgayChiNhanh = async (id_chi_nhanh, ngay) => {
    try {
        const donHang = await modelDonHang.find({ id_chi_nhanh: id_chi_nhanh });
        if (!donHang || donHang.length === 0) {
            return []
        }

    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}
//lấy đơn hàng theo chi nhánh
const layDonHangTheoChiNhanh = async (id_chi_nhanh) => {
    try {
        const donHang = await modelDonHang.find({ id_chi_nhanh: id_chi_nhanh });
        if (!donHang || donHang.length === 0) {
            return []
        }
        return donHang;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

}

//thống kê đơn hàng theo chi nhánh
const thongKeDonHangTheoChiNhanh = async (id_chi_nhanh) => {
    try {
        const donHang = await modelDonHang.find({ id_chi_nhanh: id_chi_nhanh });
        if (!donHang || donHang.length === 0) {
            return []
        }
        let tong_don_hang = 0;
        let don_hang_chua_xac_nhan = [];
        let don_hang_da_xac_nhan = [];
        let don_hang_dang_giao = [];
        let don_hang_da_giao = [];
        let don_hang_da_huy = [];
        let don_hang_da_danh_gia = [];
        let tong_doanh_thu = 0;
        let don_hang_chua_giao = [];
        let don_hang_tai_chi_nhanh = [];

        for (let i = 0; i < donHang.length; i++) {
            tong_don_hang += 1;
            if (donHang[i].ma_trang_thai === 0) {
                don_hang_da_huy.push(donHang[i]);
                don_hang_chua_giao.push(donHang[i]);
            } else if (donHang[i].ma_trang_thai === 1) {
                don_hang_chua_xac_nhan.push(donHang[i]);
                don_hang_chua_giao.push(donHang[i]);
            } else if (donHang[i].ma_trang_thai === 2) {
                don_hang_da_xac_nhan.push(donHang[i]);
                don_hang_chua_giao.push(donHang[i]);
            } else if (donHang[i].ma_trang_thai === 3) {
                don_hang_dang_giao.push(donHang[i]);
                don_hang_chua_giao.push(donHang[i]);
            } else if (donHang[i].ma_trang_thai === 4) {
                don_hang_da_giao.push(donHang[i]);
            } else if (donHang[i].ma_trang_thai === 5) {
                don_hang_da_danh_gia.push(donHang[i]);
                don_hang_da_giao.push(donHang[i]);
            } else if (donHang[i].ma_trang_thai === 6) {
                don_hang_tai_chi_nhanh.push(donHang[i]);
                don_hang_da_giao.push(donHang[i]);
            }
            tong_doanh_thu += donHang[i].thanh_tien;
        }
        return {
            tong_don_hang: tong_don_hang,
            don_hang_chua_xac_nhan: don_hang_chua_xac_nhan,
            don_hang_da_xac_nhan: don_hang_da_xac_nhan,
            don_hang_dang_giao: don_hang_dang_giao,
            don_hang_da_giao: don_hang_da_giao,
            don_hang_da_huy: don_hang_da_huy,
            don_hang_da_danh_gia: don_hang_da_danh_gia,
            tong_doanh_thu: tong_doanh_thu,
            don_hang_chua_giao: don_hang_chua_giao,
            don_hang_tai_chi_nhanh: don_hang_tai_chi_nhanh

        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};


//sửa đơn hàng
const suaDonHang = async (id_don_hang, id_user, id_chi_nhanh, loai_don_hang, dia_chi, san_pham, ghi_chu, giam_gia, phi_van_chuyen, thanh_tien, thanh_toan) => {
    try {
        const donHang = await modelDonHang.findById(id_don_hang);
        if (!donHang) {
            return false;
        }
        let tong_san_pham = 0;
        for (let i = 0; i < san_pham.length; i++) {
            tong_san_pham += san_pham[i].so_luong;
        }
        // Truy vấn đơn hàng theo id_don_hang và cập nhật dữ liệu
        const donHangToUpdate = await modelDonHang.findByIdAndUpdate(id_don_hang, {
            id_user: id_user || donHang.id_user,
            id_chi_nhanh: id_chi_nhanh || donHang.id_chi_nhanh,
            loai_don_hang: loai_don_hang || donHang.loai_don_hang,
            dia_chi: dia_chi || donHang.dia_chi,
            san_pham: san_pham || donHang.san_pham,
            ghi_chu: ghi_chu || donHang.ghi_chu,
            so_diem_tich_luy: Math.floor(thanh_tien / 2500),
            giam_gia: giam_gia || donHang.giam_gia,
            phi_van_chuyen: phi_van_chuyen || donHang.phi_van_chuyen,
            tong_san_pham: tong_san_pham || donHang.tong_san_pham,
            thanh_tien: thanh_tien || donHang.thanh_tien,
            thanh_toan: thanh_toan || donHang.thanh_toan,

        }, { new: true }); // { new: true } để lấy dữ liệu đã cập nhật

        return donHangToUpdate;
    } catch (error) {
        throw new Error(error);
    }
};


//lấy danh sách sản phẩm chưa đánh giá
const layDanhSachSanPhamChuaDanhGia = async (id_user) => {
    try {
        const donHang = await modelDonHang.find({ id_user: id_user });
        if (!donHang || donHang.length === 0) {
            return [];
        }

        const danhSachSanPhamChuaDanhGia = [];

        for (let i = 0; i < donHang.length; i++) {
            donHang[i].san_pham.forEach(sanPham => {
                if (sanPham.ma_trang_thai === 4) {
                    danhSachSanPhamChuaDanhGia.push(sanPham);
                }
            });
        }
        return danhSachSanPhamChuaDanhGia;
    } catch (error) {
        throw new Error(error);
    }
};


const themDonHang = async (id_user, id_chi_nhanh, loai_don_hang, dia_chi, san_pham, ghi_chu, giam_gia, phi_van_chuyen, thanh_tien, thanh_toan) => {
    try {
        let tong_san_pham = 0;
        for (let i = 0; i < san_pham.length; i++) {
            tong_san_pham += san_pham[i].so_luong;
        }
        let themDonHangDate = new Date();
        themDonHangDate.setHours(themDonHangDate.getHours() + 7);

        const duLieu = {
            id_user: id_user,
            id_chi_nhanh: id_chi_nhanh,
            loai_don_hang: loai_don_hang,
            dia_chi: dia_chi,
            ngay_dat: themDonHangDate,
            san_pham: san_pham,
            ghi_chu: ghi_chu,
            so_diem_tich_luy: Math.floor(thanh_tien / 2500),
            giam_gia: giam_gia,
            phi_van_chuyen: phi_van_chuyen,
            ma_trang_thai: 1,
            ten_trang_thai: "Đang xử lý",
            ngay_cap_nhat_1: themDonHangDate,
            tong_san_pham: tong_san_pham,
            thanh_tien: thanh_tien,
            email: "",
            ten_user: "",
            so_sao: null,
            danh_gia: "",
            thanh_toan: thanh_toan,

        };
        const donHang = await modelDonHang.create(duLieu);
        return donHang;
    } catch (error) {
        throw new Error(error);
    }

};

const layDonHang = async (id_don_hang) => {
    try {
        const donHang = await modelDonHang.findById(id_don_hang);
        if (!donHang) {
            return [];
        }
        return donHang;
    } catch (error) {
        throw new Error(error);
    }
};

//lay don hang theo id_user
const layDonHangTheoIdUser = async (id_user) => {
    try {
        const donHang = await modelDonHang.find({ id_user: id_user });
        if (!donHang) {
            return [];
        }
        return donHang;
    } catch (error) {
        throw new Error(error);
    }
};

//cap nhat trang thai
const capNhatTrangThai = async (id_don_hang, ma_trang_thai) => {
    try {
        const donHang = await modelDonHang.findById(id_don_hang).populate('san_pham');
        if (!donHang) {
            return false;
        }
        const user = await modelUser.findById(donHang.id_user);

        if (!user) {
            return false;
        }

        if (ma_trang_thai === 3) {
            let ma_trang_thai_3 = new Date();
            ma_trang_thai_3.setHours(ma_trang_thai_3.getHours() + 7);
            donHang.ma_trang_thai = ma_trang_thai;
            donHang.ten_trang_thai = "Đang giao";
            donHang.ngay_cap_nhat_3 = ma_trang_thai_3;

            // const productUpdates = donHang.san_pham.map(async (sanPham) => {
            //     const updatedProduct = await modelSanPham.findByIdAndUpdate(
            //         sanPham.id_san_pham,
            //         { $inc: { so_luong_da_mua: sanPham.so_luong } },
            //         { new: true }
            //     );
            //     // handle updatedProduct if needed
            //     console.log("day la update"+ updatedProduct);
            //     return updatedProduct;
            // });

            // await Promise.all(productUpdates);   
            await donHang.save();
            return donHang;
        } else if (ma_trang_thai === 4) {
            const productUpdates = donHang.san_pham.map(async (sanPham) => {
                const updatedProduct = await modelSanPham.findByIdAndUpdate(
                    sanPham.id_san_pham,
                    { $inc: { so_luong_da_ban: sanPham.so_luong } },
                    { new: true }
                );
                // handle updatedProduct if needed
                return updatedProduct;
            });

            await Promise.all(productUpdates);
            let ma_trang_thai_4 = new Date();
            ma_trang_thai_4.setHours(ma_trang_thai_4.getHours() + 7);
            if (donHang.ma_trang_thai !== ma_trang_thai) {
                donHang.ma_trang_thai = ma_trang_thai;
                donHang.ten_trang_thai = "Đã giao";
                donHang.ngay_cap_nhat_4 = ma_trang_thai_4;

                const doi_diem = {
                    ten_doi_diem: "Cộng điểm đơn hàng",
                    ngay_doi: ma_trang_thai_4,
                    so_diem: donHang.so_diem_tich_luy
                };

                user.tich_diem += donHang.so_diem_tich_luy;
                user.doi_diem = doi_diem;
                user.diem_tich_luy += donHang.so_diem_tich_luy;
                user.diem_thanh_vien += donHang.so_diem_tich_luy;

                // Your switch case logic for user.hang_thanh_vien here
                if (user.diem_thanh_vien >= 0 && user.diem_thanh_vien < 200) {
                    user.hang_thanh_vien = "Khách hàng mới";
                } else if (user.diem_thanh_vien >= 200 && user.diem_thanh_vien < 500) {
                    user.hang_thanh_vien = "Hạng đồng";
                } else if (user.diem_thanh_vien >= 500 && user.diem_thanh_vien < 1000) {
                    user.hang_thanh_vien = "Hạng bạc";
                } else if (user.diem_thanh_vien >= 1000 && user.diem_thanh_vien < 2000) {
                    user.hang_thanh_vien = "Hạng vàng";
                } else if (user.diem_thanh_vien >= 2000 && user.diem_thanh_vien < 5000) {
                    user.hang_thanh_vien = "Hạng kim cương";
                } else if (user.diem_thanh_vien >= 5000) {
                    user.hang_thanh_vien = "Khách hàng VIP";
                }
                await user.save();
                await donHang.save();
            }

            return donHang;
        } else if (ma_trang_thai === 2) {
            let ma_trang_thai_2 = new Date();
            ma_trang_thai_2.setHours(ma_trang_thai_2.getHours() + 7);
            donHang.ma_trang_thai = ma_trang_thai;
            donHang.ten_trang_thai = "Đã xác nhận";
            donHang.ngay_cap_nhat_2 = ma_trang_thai_2;
            await donHang.save();
            return donHang;
        } else if (ma_trang_thai === 0) {
            let ma_trang_thai_0 = new Date();
            ma_trang_thai_0.setHours(ma_trang_thai_0.getHours() + 7);
            donHang.ma_trang_thai = ma_trang_thai;
            donHang.ten_trang_thai = "Đã hủy";
            donHang.ngay_cap_nhat_0 = ma_trang_thai_0;
            await donHang.save();
            return donHang;
        } else {
            return false;
        }
    } catch (error) {
        throw new Error(error);
    }
};


//danh gia
const danhGia = async (id_don_hang, so_sao, danh_gia, hinh_anh_danh_gia, email, ten_user, hinh_anh_user) => {
    try {
        const donHang = await modelDonHang.findById(id_don_hang);
        if (!donHang) {
            return 100;
        }
        if (donHang.danh_gia) {
            return 10;
        }
        if (donHang.ma_trang_thai === 4 || donHang.ma_trang_thai === 5) {
            let ma_trang_thai_4 = new Date();
            ma_trang_thai_4.setHours(ma_trang_thai_4.getHours() + 7);
            donHang.so_sao = so_sao;
            donHang.danh_gia = danh_gia;
            donHang.hinh_anh_danh_gia = hinh_anh_danh_gia;
            donHang.email = email;
            donHang.ten_user = ten_user;
            donHang.hinh_anh_user = hinh_anh_user;
            donHang.ngay_danh_gia = ma_trang_thai_4;
            donHang.ma_trang_thai = 5,
                donHang.ten_trang_thai = "Đã đánh giá",
                donHang.ngay_cap_nhat_5 = ma_trang_thai_4,
                await donHang.save();
            for (let i = 0; i < donHang.san_pham.length; i++) {
                const sanPham = await modelSanPham.findById(donHang.san_pham[i].id_san_pham);
                sanPham.danh_gia.push({
                    so_sao: so_sao,
                    danh_gia: danh_gia,
                    hinh_anh_danh_gia: hinh_anh_danh_gia,
                    email: email,
                    hinh_anh_user: hinh_anh_user,
                    ten_user: ten_user,
                    ngay_danh_gia: ma_trang_thai_4
                });
                sanPham.so_luong_danh_gia = sanPham.danh_gia.length;
                let tong_sao = 0; // Khai báo biến tong_sao ở đây và gán giá trị 0
                for (let j = 0; j < sanPham.danh_gia.length; j++) {
                    tong_sao = tong_sao + sanPham.danh_gia[j].so_sao;
                }
                const sao = tong_sao / sanPham.danh_gia.length;
                sanPham.tong_sao = sao.toFixed(2);
                await sanPham.save();
                console.log(sanPham);
            }
            return donHang;
        } else {
            return 1000;
        }

    } catch (error) {
        throw new Error(error);
    }
};



module.exports = {
    themDonHang, layDonHang, layDonHangTheoIdUser, capNhatTrangThai, danhGia, layDanhSachSanPhamChuaDanhGia,
    suaDonHang, layDonHangTheoChiNhanh, thongKeDonHangTheoChiNhanh, themDonHangOffline, thongKeDonHangTheoNgayVaChiNhanh

}