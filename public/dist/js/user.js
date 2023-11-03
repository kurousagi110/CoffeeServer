
const user = {
  id_user: "1234abcd", 
  ma_khach_hang: "MK001",
  tai_khoan: "taikhoan123",
  email: "email@example.com",
  so_dien_thoai: "0123456789",
  mat_khau: "password123",
  ho_ten: "John Doe",
  avatar: "avatar.png",
  dia_chi: [
    {
      id_dia_chi: "5678efgh",
      ten_dia_chi: "Home",
      so_dien_thoai: "0987654321",
      so_nha: "123",
      tinh: "Hà Nội",
      mac_dinh: 1,
      status: 1,
      nguoi_nhan: "John Doe"
    }
  ],
  tich_diem: 100,
  doi_diem: [
    {
      id_doi_diem: "abcd1234",
      ngay_doi: "2023-02-15",
      so_diem: 50
    }
  ],
  voucher_user: [
    {
      id_voucher: "voucher1",
      ten_voucher: "Giảm 10%",
      ma_voucher: "VOUCHER10",
      diem: 10,
      gia_tri: 100000,
      mo_ta: "Giảm 10% tối đa 100k",
      ngay_bat_dau: "2023-02-01",
      ngay_ket_thuc: "2023-02-28",
      trang_thai: 1,
      status: 1
    }
  ],
  otp: 123456,
  status: 1,
  lich_su: [
    {
      id_lich_su: "1234efgh",
      tu_khoa: "áo thun"
    }
  ]
};
//demo tự xóa


var dialog = document.getElementById('dialog'); 
var overlay = document.getElementById('overlay');
function openDialog() {
  dialog.style.display = 'block';
  overlay.style.display = 'block';
}

function closeDialog() {
  dialog.style.display = 'none'; 
  overlay.style.display = 'none';
}