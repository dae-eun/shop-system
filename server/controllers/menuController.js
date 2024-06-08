// controllers
const mysql = require('mysql2/promise');
const dbconfig = require('../config.js');

// 데이터베이스 연결 설정
const pool = mysql.createPool(dbconfig);

// 모든 메뉴 가져오기
async function getAllMenus(req, res) {
  try {
    const [rows] = await pool.execute(`
      SELECT *
      FROM TB_MENU
      ORDER BY sortOrdr ASC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching all menus:', error);
    res.status(500).json({ message: 'Failed to fetch menus' });
  }
}

// ID로 메뉴 가져오기
async function getMenuById(req, res) {
  try {
    const [rows] = await pool.execute(`
      SELECT *
      FROM TB_MENU
      WHERE menuId = ?
    `, [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Menu not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching menu by ID:', error);
    res.status(500).json({ message: 'Failed to fetch menu' });
  }
}

// 새 메뉴 생성하기
async function createMenu(req, res) {
  try {
    const { menuNm, upperMenuId, level, url, menuType, pageType, sortOrdr, useAt } = req.body.query;
    const [result] = await pool.execute(`
      INSERT INTO TB_MENU (
        menuNm, upperMenuId, level, url, menuType, pageType, sortOrdr, useAt
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?
      )
    `, [menuNm, upperMenuId ?? null, level, url, menuType, pageType, sortOrdr, useAt]);
    res.status(201).json({ id: result.insertId, message: 'Menu created successfully' });
  } catch (error) {
    console.error('Error creating menu:', error);
    res.status(500).json({ message: 'Failed to create menu' });
  }
}

// 메뉴 업데이트하기
async function updateMenu(req, res) {
  try {
    const { menuNm, upperMenuId, level, url, menuType, pageType, sortOrdr, useAt } = req.body;
    const [result] = await pool.execute(`
      UPDATE TB_MENU
      SET 
        menuNm = ?, 
        upperMenuId = ?, 
        level = ?, 
        url = ?, 
        menuType = ?, 
        pageType = ?, 
        sortOrdr = ?, 
        useAt = ?
      WHERE menuId = ?
    `, [menuNm, upperMenuId, level, url, menuType, pageType, sortOrdr, useAt, req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Menu not found or update failed' });
    }
    res.json({ message: 'Menu updated successfully' });
  } catch (error) {
    console.error('Error updating menu:', error);
    res.status(500).json({ message: 'Failed to update menu' });
  }
}

// 메뉴 삭제하기
async function deleteMenu(req, res) {
  try {
    const [result] = await pool.execute(`
      DELETE FROM TB_MENU
      WHERE menuId = ?
    `, [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Menu not found or deletion failed' });
    }
    res.json({ message: 'Menu deleted successfully' });
  } catch (error) {
    console.error('Error deleting menu:', error);
    res.status(500).json({ message: 'Failed to delete menu' });
  }
}

module.exports = {
  getAllMenus,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
};