const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// 로그인
router.post('/auth/login', authController.login);

// 로그인
router.post('/auth/verifyToken', authController.verifyToken);

// 회원가입
router.post('/auth/signup', authController.signup);


module.exports = router;