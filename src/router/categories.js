import express from "express";
import { checkPermission } from "../middlewares/checkPermission.js";
import { createCate, getAllCate, getDetailCate, removeCate, updateCate } from "../controllers/category.js";

const routerCategory = express.Router();

routerCategory.get('/', getAllCate);
routerCategory.get('/:id', getDetailCate);
routerCategory.post('/', checkPermission, createCate);
routerCategory.put('/:id', checkPermission, updateCate);
routerCategory.delete('/:id', checkPermission, removeCate);

export default routerCategory;