import express from 'express';  
const router = express.Router();
import { currentAuth, roleAuth } from '../middlewares/auth.js';
import { getCarts, getCartById, createCart, addProductToCart, updateCart, updateProductQuantity, deleteProductFromCart, deleteCart } from '../controllers/cart.controller.js';

router.get('/', currentAuth, roleAuth(['admin', 'user']), getCarts);
router.get('/:cid', currentAuth, roleAuth(['admin', 'user']), getCartById);
router.post('/', currentAuth, roleAuth(['admin', 'user']), createCart);
router.post('/:cid/products/:pid', currentAuth, roleAuth(['user']), addProductToCart);
router.put('/:cid', currentAuth, roleAuth(['admin', 'user']), updateCart);
router.put('/:cid/products/:pid', currentAuth, roleAuth(['user']), updateProductQuantity);
router.delete('/:cid/products/:pid', currentAuth, roleAuth(['admin', 'user']), deleteProductFromCart);
router.delete('/:cid', currentAuth, roleAuth(['admin', 'user']), deleteCart);

export default router;