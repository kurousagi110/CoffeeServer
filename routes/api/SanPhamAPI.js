var express = require('express');
var router = express.Router();
var uploadAnh = require('../../components/MiddleWare/uploadFile');
const sanPhamController = require('../../components/SanPham/ControllerSanPham');
const AuthenToken = require('../../components/MiddleWare/AuthenToken');


//tìm kiếm san pham
//http://localhost:3000/api/san-pham/tim-kiem-san-pham
router.get('/tim-kiem-san-pham/:ten_san_pham', async (req, res) => {
    try {
        const san_pham = await sanPhamController.timKiemSanPham(req.params.ten_san_pham);
        if (san_pham) {
            res.status(200).json({
                success: true,
                message: 'Tìm kiếm sản phẩm thành công',
                data: san_pham
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Tìm kiếm sản phẩm thất bại',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Tìm kiếm sản phẩm thất bại',
            error: error.message
        });
    }
});

//lọc sản phẩm theo giá từ thấp đến cao
//http://localhost:3000/api/san-pham/loc-san-pham-theo-gia-tu-thap-den-cao
router.get('/loc-san-pham-theo-gia-tu-thap-den-cao', async (req, res) => {
    try {
        const san_pham = await sanPhamController.locSanPhamTheoGiaTuThapDenCao();
        if (san_pham) {
            res.status(200).json({
                success: true,
                message: 'Lọc sản phẩm thành công',
                data: san_pham
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Lọc sản phẩm thất bại',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lọc sản phẩm thất bại',
            error: error.message
        });
    }
});

//get product by id
//http://localhost:3000/api/san-pham/get-san-pham-by-id
router.get('/get-san-pham-by-id/:id_san_pham', async (req, res) => {
    try {
        const san_pham = await sanPhamController.getSanPhamById(req.params.id_san_pham);
        if (san_pham) {
            res.status(200).json({
                success: true,
                message: 'Lấy sản phẩm thành công',
                data: san_pham
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Lấy sản phẩm thất bại',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lấy sản phẩm thất bại',
            error: error.message
        });
    }
});

//get all product
//http://localhost:3000/api/san-pham/get-all-san-pham
router.get('/get-all-san-pham', AuthenToken , async (req, res) => {
    try {
        const san_pham = await sanPhamController.getAllSanPham();
        if (san_pham) {
            res.status(200).json({
                success: true,
                message: 'Lấy sản phẩm thành công',
                data: san_pham
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Lấy sản phẩm thất bại',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Lấy sản phẩm thất bại',
            error: error.message
        });
    }
});

//thêm loại sản phẩm
//http://localhost:3000/api/san-pham/them-loai-san-pham
router.post('/them-loai-san-pham', async (req, res) => {
    try {
        const { id_san_pham, ten_loai_san_pham} = req.body
        const san_pham = await sanPhamController.themLoaiSanPham(id_san_pham, ten_loai_san_pham);
        if (san_pham) {
            res.status(200).json({
                success: true,
                message: 'Thêm loại sản phẩm thành công',
                data: san_pham
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Thêm loại sản phẩm thất bại',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Thêm loại sản phẩm thất bại',
            error: error.message
        });
    }
});

//xóa loại sản phẩm
//http://localhost:3000/api/san-pham/xoa-loai-san-pham
router.post('/xoa-loai-san-pham', async (req, res) => {
    try {
        const { id_san_pham, id_loai_san_pham } =req.body
        const san_pham = await sanPhamController.xoaLoaiSanPham(id_san_pham, id_loai_san_pham);
        if (san_pham) {
            res.status(200).json({
                success: true,
                message: 'Xóa loại sản phẩm thành công',
                data: san_pham
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Xóa loại sản phẩm thất bại',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Xóa loại sản phẩm thất bại',
            error: error.message
        });
    }
});


//thêm ảnh
//http://localhost:3000/api/san-pham/them-anh
router.post('/them-anh', async (req, res) => {
    try {
        const { id_san_pham, hinh_anh_sp } =req.body;
        const san_pham = await sanPhamController.themHinhAnh(id_san_pham, hinh_anh_sp);
        if (san_pham) {
            res.status(200).json({
                success: true,
                message: 'Thêm ảnh thành công',
                data: san_pham
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Thêm ảnh thất bại',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Thêm ảnh thất bại',
            error: error.message
        });
    }
});

//xóa ảnh
//http://localhost:3000/api/san-pham/xoa-anh
router.post('/xoa-anh', async (req, res) => {
    try {
        const { id_san_pham, id_hinh_anh_sp} = req.body;
        const san_pham = await sanPhamController.xoaHinhAnh(id_san_pham, id_hinh_anh_sp);
        if (san_pham) {
            res.status(200).json({
                success: true,
                message: 'Xóa ảnh thành công',
                data: san_pham
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Xóa ảnh thất bại',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Xóa ảnh thất bại',
            error: error.message
        });
    }
});

//upload ảnh
//http://localhost:3000/api/san-pham/upload-anh
router.post('/upload-anh', [uploadAnh.single('image')], async (req, res) => {
    try {
        let file = req.file;
        if (file) {
            let path = `http://localhost:3000/images/${file.filename}`;
            res.status(200).json({ result: true, message: 'Upload ảnh thành công', data: path });
        }
        else {
            res.status(400).json({ result: false, message: 'Upload ảnh thất bại' });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Upload ảnh thất bại',
            error: error.message
        });
    }
});
//thêm nhiều ảnh
//http://localhost:3000/api/san-pham/upload-nhieu-anh
router.post('/upload-nhieu-anh', [uploadAnh.array('image', 10)], async (req, res) => {
    try {
        let files = req.files;
        if (files && files.length > 0) {
            let paths = [];
            files.map((file) => {
                paths.push(`http://localhost:3000/images/${file.filename}`);
            });
            res.status(200).json({ result: true, message: 'Upload ảnh thành công', data: paths });
        }
        else {
            res.status(400).json({ result: false, message: 'Upload ảnh thất bại' });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Upload ảnh thất bại',
            error: error.message
        });
    }
});

//thêm size
//http://localhost:3000/api/san-pham/them-size
router.post('/them-size', async (req, res) => {
    try {
        const { id_san_pham, ten_size, gia, giam_gia } = req.body;  
        const san_pham = await sanPhamController.themSize(id_san_pham, ten_size, gia, giam_gia);
        if (san_pham) {
            res.status(200).json({
                success: true,
                message: 'Thêm size thành công'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Thêm size thất bại'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Thêm size thất bại',
            error: error.message
        });
    }
});

//sửa size
//http://localhost:3000/api/san-pham/sua-size
router.post('/sua-size', async (req, res) => {
    try {
        const {id_san_pham, id_size, ten_size, gia, giam_gia} = req.body;
        const san_pham = await sanPhamController.suaSize(id_san_pham, id_size, ten_size, gia, giam_gia);
        if (san_pham) {
            res.status(200).json({
                success: true,
                message: 'Sửa size thành công',
                data: san_pham
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Sửa size thất bại',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Sửa size thất bại',
            error: error.message
        });
    }
});

//xóa size
//http://localhost:3000/api/san-pham/xoa-size
router.post('/xoa-size', async (req, res) => {
    try {
        const {id_san_pham, id_size} = req.body;
        const san_pham = await sanPhamController.xoaSize(id_san_pham, id_size);
        if (san_pham) {
            res.status(200).json({
                success: true,
                message: 'Xóa size thành công',
                data: san_pham
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Xóa size thất bại',
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Xóa size thất bại',
            error: error.message
        });
    }
});


//thêm sản phẩm
//http://localhost:3000/api/san-pham/them-san-pham
router.post('/them-san-pham', async (req, res) => {
    try {
        const { ten_san_pham, mo_ta } = req.body;
        const san_pham = await sanPhamController.themSanPham(ten_san_pham, mo_ta);
        if (san_pham) {
            res.status(200).json({
                success: true,
                message: 'Thêm sản phẩm thành công'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Thêm sản phẩm thất bại'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Thêm sản phẩm thất bại',
            error: error.message
        });
    }
});
//thêm full option sản phẩm
//http://localhost:3000/api/san-pham/them-full-san-pham
router.post('/them-full-san-pham', async (req, res) => {
    try {
        const { san_pham } = req.body;
        console.log(san_pham);
        const result = await sanPhamController.themSanPhamAll(san_pham);
        if (result) {
            res.status(200).json({
                success: true,
                message: 'Thêm sản phẩm thành công'
            });
        } else {
            res.status(400).json({
                success: false,
                message: 'Thêm sản phẩm thất bại'
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Thêm sản phẩm thất bại',
            error: error.message
        });
    }
});

module.exports = router;