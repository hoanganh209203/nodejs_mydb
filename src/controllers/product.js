
import Category from '../models/Category.js';
import product from '../models/Product.js';
import Product from '../models/Product.js';
import { productValid } from '../validation/product.js';
import { uploadImages } from './images.js';
export const getList = async (req, res) => {

    try {
        // const products = await Product.find().populate("categoryId");
        const { _page = 1,
            _limit = 10,
            _sort = "createAt",
            _order = "asc" } = req.query

        const options = {
            page: _page,
            limit: _limit,
            sort: {
                [_sort]: _order === "asc" ? 1 : -1
            }

        };

        const data = await Product.paginate({}, options)
        if (!data || data.length === 0) {
            return res.status(400).json({
                message: "khong tim thay san pham"
            });
        }
        return res.status(200).json(
            data
        );
    } catch (error) {
        res.status(500).json({
            message: "Loi server"
        })
    }
};

export const getDetail = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("categoryId");;
        if (!product) {
            return res.status(404).json({
                message: "khong tim thay san pham"
            });
        }
        return res.status(200).json({
            message: "Lay san pham thanh cong",
            data: product
        });
    } catch (error) {
        res.status(500).json({
            message: "Loi server"
        })
    }
};

export const create = async (req, res) => {

    const image = req.file
    try {
        const { error } = productValid.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const data = { ...req.body, images: { path: image.path, id: image.filename } }
        const response = await Product.create(data)
        if (!response) {
            return res.status(404).json({
                message: "Khong them duoc product"
            });
        }
        // Tải ảnh lên Cloudinary
        // const imageUrl = await uploadImages(req.body.imagePath);
        //  // Cập nhật trường imageUrl của sản phẩm
        //  data.imageUrl = imageUrl;
        //  await data.save();

        // const updateCategory = await Category.findByIdAndUpdate(data.categoryId, {
        //     $addToSet: {
        //         products: data._id
        //     }
        // })

        // if (!updateCategory) {
        //     return res.status(404).json({
        //         message: "Update category not found"
        //     })
        // }

        return res.status(200).json({
            message: "Tao san pham thanh cong",
            products: response
        })

    } catch (error) {
        return res.status(500).json({
            message: error
        })
    }
};
export const update = async (req, res) => {
    console.log(req.body);
    console.log(123);
    const { error } = productValid.validate(
        req.body,
        {
            abortEarly: false
        });
    if (error) {
        return res.status(404).json({
            message: error.details[0].message,
        })
    };
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true });
        if (!product) {
            return res.status(404).json({
                message: "Khong cap nhat duoc san pham"
            })

        }
        // Tải ảnh lên Cloudinary
        const imageUrl = await uploadImage(req.body.imagePath);

        // Cập nhật trường imageUrl của sản phẩm
        product.imageUrl = imageUrl;
        await product.save();
        const updateCategory = await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: {
                products: product._id
            }
        })

        if (!updateCategory) {
            return res.status(404).json({
                message: "Update category not found"
            })
        }
        return res.status(200).json({
            message: "Cap nhat thanh cong",
            data: product
        })
    } catch (error) {
        return res.status(500).json({
            message: error,
        })

    }
};
export const remove = async (req, res) => {
    try {
        const data = await Product.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                message: "Khong the xoa duoc san pham"
            })
        };
        const updateCategory = await Category.findByIdAndDelete(data.categoryId, {
            $addToSet: {
                products: data._id
            }
        })

        if (!updateCategory) {
            return res.status(404).json({
                message: "Update category not found"
            })
        }
        return res.status(200).json({
            message: "Xoa thanh cong"
        })

    } catch (error) {
        return res.status(500).json({
            message: error,
        })
    }
};