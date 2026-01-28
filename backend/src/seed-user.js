require("dotenv").config();
const bcrypt = require("bcrypt");
const { pool } = require("./db");

(async () => {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  const hash = await bcrypt.hash(password, 10);

  await pool.query(
    "INSERT INTO users (username, password_hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)",
    [username, hash]
  );

  console.log(`User ready: ${username} / ${password}`);
  process.exit(0);
})();
