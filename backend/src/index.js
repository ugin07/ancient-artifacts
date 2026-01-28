const express = require("express");
const cors = require("cors");
require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { pool } = require("./db");
const { auth } = require("./middleware-auth");
const { CATEGORIES } = require("./data");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req, res) => res.json({ ok: true }));

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: "Missing fields" });

  const [rows] = await pool.query(
    "SELECT id, username, password_hash FROM users WHERE username = ?",
    [username]
  );

  const user = rows[0];
  if (!user) return res.status(401).json({ message: "Bad credentials" });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ message: "Bad credentials" });

  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "30d" });
  res.json({ token });
});

app.get("/catalog", auth, (_req, res) => {
  res.json(CATEGORIES);
});

app.get("/notes/:itemKey", auth, async (req, res) => {
  const itemKey = String(req.params.itemKey);
  const [rows] = await pool.query(
    "SELECT item_key, content, updated_at FROM notes WHERE item_key = ?",
    [itemKey]
  );
  res.json(rows[0] || { item_key: itemKey, content: "" });
});

app.put("/notes/:itemKey", auth, async (req, res) => {
  const itemKey = String(req.params.itemKey);
  const content = String(req.body?.content ?? "");

  await pool.query(
    "INSERT INTO notes (item_key, content) VALUES (?, ?) ON DUPLICATE KEY UPDATE content = VALUES(content)",
    [itemKey, content]
  );

  const [rows] = await pool.query(
    "SELECT item_key, content, updated_at FROM notes WHERE item_key = ?",
    [itemKey]
  );
  res.json(rows[0]);
});

app.delete("/notes/:itemKey", auth, async (req, res) => {
  const itemKey = String(req.params.itemKey);
  await pool.query("DELETE FROM notes WHERE item_key = ?", [itemKey]);
  res.json({ ok: true });
});

const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`API running on http://localhost:${port}`));
