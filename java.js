

// Database Connection
// const connection = mysql.createConnection({
//   host: 'sql12.freesqldatabase.com',
//   user: 'sql12824523',           // Default XAMPP user
//   password: 'eWQpCEjluR',           // Default XAMPP password is empty
//   database: 'sql12824523' 
// });
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// --- CONFIDENTIAL DATABASE DETAILS ---
const db = mysql.createConnection({
    host: 'sql12.freesqldatabase.com',      // Your local server
    user: 'sql12824523',           // Your MySQL username
    password: 'eWQpCEjluR',           // Leave empty if using default XAMPP
    database: 'sql12824523' // Your specific database
});

db.connect(err => {
    if (err) {
        console.error("❌ Database Connection Failed: " + err.message);
    } else {
        console.log("✅ Connected to sql12824523 - Receipt Table Ready");
    }
});

// Implementation for the 'receipt' table
app.post('/save-receipt', (req, res) => {
    const { a, b, c, d } = req.body;
    
    // SQL Query matching columns a, b, c, d from image_2b4f80.png
    const sql = "INSERT INTO receipt (a, b, c, d) VALUES (?, ?, ?, ?)";
    
    db.query(sql, [a, b, c, d], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ success: true, id: result.insertId });
    });
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));