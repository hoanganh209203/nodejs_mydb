import express from 'express';
import routerProducts from './product.js'
import routerAuth from './auth.js';
import routerCategory from './categories.js';
const router = express.Router();

router.use('/products',routerProducts);
router.use('/auth',routerAuth);
router.use('/categories',routerCategory);

export default router