const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Create a connection to the MySQL database
const db = mysql.createConnection({
    host: "localhost",
    user: "NicolaeCondru",
    password: "Niku2004-",
    database: "sdgroupm_",
    port: 3306
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error("Eroare conexiune MariaDB în review.js:", err);
        return;
    }
    console.log("Conectat la MariaDB din review.js!");
});

// Endpoint pentru adăugarea unei recenzii
router.post("/add-review", async (req, res) => {
    try {
        console.log("Cerere primită:", req.body);

        // Destructurare din corpul cererii
        const { name, rating, text } = req.body;

        // Verifică dacă toate câmpurile sunt completate
        if (!name || !rating || !text) {
            return res.status(400).json({ success: false, message: "Toate câmpurile sunt necesare!" });
        }

        // SQL query pentru a adăuga recenzia în baza de date
        const sql = "INSERT INTO reviews (name, rating, text) VALUES (?, ?, ?)";
        
        db.query(sql, [name, rating, text], (err, result) => {
            if (err) {
                console.error("Eroare SQL:", err);
                return res.status(500).json({ success: false, message: "Eroare la salvarea recenziei!" });
            }

            // Răspuns de succes
            console.log("Recenzie adăugată cu succes!", result);
            res.json({ success: true, message: "Recenzie adăugată cu succes!" });
        });

    } catch (error) {
        console.error("Eroare server:", error);
        res.status(500).json({ success: false, message: "Eroare de server!" });
    }
});

module.exports = router;
