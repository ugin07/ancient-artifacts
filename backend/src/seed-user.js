require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('./db');

(async () => {
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

  await db.query(
    `INSERT INTO users (username, password_hash)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE password_hash=?`,
    [process.env.ADMIN_USERNAME, hash, hash]
  );

  console.log('User ready:', process.env.ADMIN_USERNAME);
  process.exit();
})();
