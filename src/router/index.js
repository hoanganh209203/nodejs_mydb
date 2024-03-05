import express from 'express';
import routerProducts from './product.js'
import routerAuth from './auth.js';
import routerCategory from './categories.js';
import routerImages from './upload.js';
const router = express.Router();

router.use('/products',routerProducts);
router.use('/auth',routerAuth);
router.use('/categories',routerCategory);
router.use('/images',routerImages);

export default router