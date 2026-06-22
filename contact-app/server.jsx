const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashed]
    );
    res.json({ message: "User created" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  if (rows.length === 0) return res.status(400).json({ error: "User not found" });

  const match = await bcrypt.compare(password, rows[0].password);
  if (!match) return res.status(400).json({ error: "Wrong password" });

  res.json({ id: rows[0].id, name: rows[0].name, email: rows[0].email });
});

app.get("/api/contacts", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM contacts");
  res.json(rows);
});

app.post("/api/contacts", async (req, res) => {
  const { name, phone, email } = req.body;
  await pool.query(
    "INSERT INTO contacts (name, phone, email) VALUES (?, ?, ?)",
    [name, phone, email]
  );
  res.json({ message: "Contact added" });
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));