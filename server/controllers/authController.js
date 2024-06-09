// controllers
const mysql = require('mysql2/promise');
const dbconfig = require('../config.js');

// 데이터베이스 연결 설정
const pool = mysql.createPool(dbconfig);

// 로그인
async function login(req, res) {
    const { email, password } = req.body;

    try {
        const [result] = await pool.execute(
            `SELECT * FROM TB_USER WHERE email =? AND password =?`,
            [email, password]
        );

        if (result.length > 0) {
            res.json({ message: 'Login successful.', user: result[0] }); // 사용자 정보 반환
        } else {
            res.status(401).json({ message: 'Invalid credentials.' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
}

// 회원가입
async function signup(req, res) {
    const { userName, email, password, phoneNumber, postNum, addr1, addr2 } = req.body;

    try {
        const [result] = await pool.execute(
            `INSERT INTO TB_USER (userName, email, password, phoneNumber, postNum, addr1, addr2) VALUES (?,?,?,?,?,?,?)`,
            [userName, email, password, phoneNumber, postNum, addr1, addr2]
        );

        if (result.affectedRows > 0) {
            res.status(201).json({ message: 'User registered successfully.' });
        } else {
            res.status(400).json({ message: 'Registration failed.' });
        }
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Server error.' });
    }
}

module.exports = { login, signup }