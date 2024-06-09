const express = require('express');
const router = express.Router();
const menuController = require('../controllers/menuController.js');

// 모든 메뉴 가져오기
router.get('/menu', menuController.getAllMenus);

// ID로 메뉴 가져오기
router.get('/menu/:id', menuController.getMenuById);

// 새 메뉴 생성하기
router.post('/menu', menuController.createMenu);

// 메뉴 업데이트하기
router.put('/menu/:id', menuController.updateMenu);

// 메뉴 삭제하기
router.delete('/menu/:id', menuController.deleteMenu);

module.exports = router;