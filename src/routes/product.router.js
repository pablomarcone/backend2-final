import express from 'express';
const router = express.Router();
import { roleAuth, currentAuth } from '../middlewares/auth.js';
import { getProducts, getProductById, addProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

router.get('/', currentAuth, roleAuth(['admin', 'user']), getProducts);
router.get('/:pid', currentAuth, roleAuth(['admin', 'user']), getProductById);
router.post('/', currentAuth, roleAuth(['admin']), addProduct);
router.put('/:pid', currentAuth, roleAuth(['admin']), updateProduct);
router.delete('/:pid', currentAuth, roleAuth(['admin']), deleteProduct);

export default router;