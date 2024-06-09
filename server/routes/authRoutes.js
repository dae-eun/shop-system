const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');

// 회원가입
router.post('/auth/signup', authController.signup);

// 로그인
router.post('/auth/login', authController.login);

module.exports = router;