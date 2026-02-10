const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

router.get('/me', authMiddleware, authController.getMe);
router.post('/purchase', authMiddleware, authController.purchaseGame);
router.get('/library', authMiddleware, authController.getLibrary);
router.post('/cart', authMiddleware, authController.addToCart);
router.post('/funds', authMiddleware, authController.addFunds);
router.post('/play', authMiddleware, authController.playGame);


module.exports = router;
