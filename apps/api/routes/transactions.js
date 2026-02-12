import express from 'express';
import * as controller from '../controllers/transactionsController.js';
import validate from '../middleware/validateTransaction.js';

const router = express.Router();

router.get('/', controller.getAll);
router.post('/', validate, controller.create);
router.get('/:id', controller.getById);

export default router;
