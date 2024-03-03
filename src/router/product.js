import express from "express";
import { create, getDetail, getList, remove, update } from '../controllers/product.js';
import { checkPermission } from "../middlewares/checkPermission.js";

const routerProducts = express.Router();

routerProducts.get('/', getList);
routerProducts.get('/:id', getDetail);
routerProducts.post('/', checkPermission, create);
routerProducts.put('/:id', checkPermission, update);
routerProducts.delete('/:id', checkPermission, remove);

export default routerProducts;