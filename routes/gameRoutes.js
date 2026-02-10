const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/', gameController.getAll);
router.get('/:id', gameController.getOne);

router.post('/', authMiddleware, adminMiddleware, gameController.create);
router.delete('/:id', authMiddleware, adminMiddleware, gameController.delete);

module.exports = router;