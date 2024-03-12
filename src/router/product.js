import express from "express";
import { create, getDetail, getList, remove, update } from '../controllers/product.js';
import { checkPermission } from "../middlewares/checkPermission.js";
import { uploadImages } from "../controllers/images.js";
import { upload } from "./upload.js";

const routerProducts = express.Router();

routerProducts.get('/', getList);
routerProducts.get('/:id', getDetail);
routerProducts.post('/', upload.single("images"), create);
routerProducts.put('/:id', checkPermission, update);
routerProducts.delete('/:id', checkPermission, remove);

export default routerProducts;