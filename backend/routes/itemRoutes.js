import { Router } from 'express';
import { createItem, getItems, updateItem, deleteItem, getItem } from '../controllers/itemController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', authMiddleware, createItem);
router.get('/', authMiddleware, getItems);
router.get('/get/:id', authMiddleware, getItem);
router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);

export default router;
