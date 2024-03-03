import Category from "../models/Category.js"
import { categoryVali } from "../validation/category.js";

export const getAllCate = async (req, res) => {
    try {
        const data = await Category.find().populate("products");
        if (!data || data.length === 0) {
            return res.status(404).json({
                message: "Khong co Category"
            })
        }
        return res.status(200).json({
            message: "Ok! category successfully",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        });
    }
}
export const getDetailCate = async (req, res) => {
    try {
        const data = await Category.findById(req.params.id).populate("products");
        if (!data) {
            return res.status(404).json({
                message: "Khong co Category"
            })
        }
        return res.status(200).json({
            message: "Ok! category successfully",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        });
    }
}
export const createCate = async (req, res) => {
    try {
        const { error } = categoryVali.validate(req.body, {
            abortEarly: false
        });
        if (error) {
            const errors = error.details.map(error => error.message)
            return res.status(400).json({
                message: errors
            })
        }
        const data = await Category.create(req.body);
        if (!data) {
            return res.status(404).json({
                message: "Create category not successfully"
            })
        }
        return res.status(200).json({
            message: "Ok! Add category successfully",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        });
    }
}
export const updateCate = async (req, res) => {
    try {
        const { error } = categoryVali.validate(req.body, {
            abortEarly: false
        });
        if (error) {
            const errors = error.details.map(error => error.message)
            return res.status(400).json({
                message: errors
            })
        }
        const data = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({
                message: "Update category not successfully"
            })
        }
        return res.status(200).json({
            message: "Ok! Update category successfully",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        });
    }
}
export const removeCate = async (req, res) => {
    try {
        const data = await Category.findByIdAndDelete(req.params.id);
        if (!data) {
            return res.status(404).json({
                message: "Delete category not successfully"
            })
        }
        return res.status(200).json({
            message: "Ok! Delete category successfully",
            datas: data
        })
    } catch (error) {
        return res.status(500).json({
            name: error.name,
            message: error.message
        });
    }
}