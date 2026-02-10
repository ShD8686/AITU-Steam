const express = require('express');
const router = express.Router();
const devController = require('../controllers/developerController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');

router.get('/', devController.getAll);
router.get('/:id', devController.getOne);

router.post('/', authMiddleware, adminMiddleware, devController.create);
router.put('/:id', authMiddleware, adminMiddleware, devController.update);
router.delete('/:id', authMiddleware, adminMiddleware, devController.delete);

module.exports = router;