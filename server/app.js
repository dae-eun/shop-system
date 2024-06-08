const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = 4000;
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const mysql = require('mysql2')
const dbconfig = require('./config.js');
let connection;

try {
  connection = mysql.createConnection(dbconfig);
  console.log("Database connection successful.");
} catch (error) {
  console.error("Error connecting to database:", error);
}

const dbMiddleware = (req, res, next) => {
  if (!connection) {
    return res.status(500).send("Database connection failed.");
  }
  // 요청 시작 시점에 데이터베이스 연결을 설정
  req.db = connection.promise();
  next();
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(dbMiddleware);

const menuRoutes = require("./routes/menuRoutes.js");
app.use("/api", menuRoutes);

app.get('/', (req, res) => {
  res.send('hi')
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
