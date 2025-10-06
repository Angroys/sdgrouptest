require("dotenv").config();
const express = require("express");
const router = express.Router();
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error("Eroare conexiune MariaDB:", err);
        setTimeout(handleDisconnect, 5000); // Retry connection
        return;
    }
    console.log("Conectat la MariaDB din review.js!");
});

// Handle database disconnects
function handleDisconnect() {
    db.connect(err => {
        if (err) {
            console.error("Eroare la reconectare MariaDB:", err);
            setTimeout(handleDisconnect, 5000);
        } else {
            console.log("Reconectat la MariaDB!");
        }
    });
}
db.on("error", (err) => {
    console.error("Eroare la conexiune:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        handleDisconnect();
    }
});

// Enable CORS
router.use(cors());

// Endpoint pentru adăugarea unei recenzii
router.post("/add-review", (req, res) => {
    console.log("Cerere primită:", req.body);

    const { name, rating, text } = req.body;
    if (!name || !rating || !text) {
        return res.status(400).json({ success: false, message: "Toate câmpurile sunt necesare!" });
    }

    const sql = "INSERT INTO reviews (name, rating, text) VALUES (?, ?, ?)";
    const values = [name.trim(), parseInt(rating), text.trim()];

    db.execute(sql, values, (err, result) => {
        if (err) {
            console.error("Eroare SQL:", err);
            return res.status(500).json({ success: false, message: "Eroare la salvarea recenziei!" });
        }
        console.log("Recenzie adăugată cu succes!", result);
        res.json({ 
            success: true, 
            message: "Recenzie adăugată cu succes!", 
            review: { id: result.insertId, name, rating, text, date: new Date().toISOString() }
        });
    });
});

module.exports = router;
