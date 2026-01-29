require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./db');
const { auth } = require('./middleware-auth');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Pragma'],
  optionsSuccessStatus: 200
}));

app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));

app.post('/auth/login', async (req, res) => {
  const { username, password } = req.body;

  const [[user]] = await db.query(
    'SELECT * FROM users WHERE username=?',
    [username]
  );
  if (!user) return res.status(401).json({ error: 'Bad credentials' });

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return res.status(401).json({ error: 'Bad credentials' });

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  res.json({ token });
});

const { CATEGORIES } = require('./data');

app.get('/catalog', auth, (req, res) => {
  res.json({
    id: 'ancient',
    title: 'Starożytność',
    categories: CATEGORIES
  });
});


app.get('/notes/:key', auth, async (req, res) => {
  const [[note]] = await db.query(
    'SELECT content FROM notes WHERE item_key=?',
    [req.params.key]
  );
  res.json({ content: note?.content || '' });
});

app.post('/notes/:key', auth, async (req, res) => {
  await db.query(
    `INSERT INTO notes (item_key, content)
     VALUES (?, ?)
     ON DUPLICATE KEY UPDATE content=?`,
    [req.params.key, req.body.content, req.body.content]
  );
  res.json({ ok: true });
});

app.listen(process.env.PORT, () =>
  console.log(`API running on http://localhost:${process.env.PORT}`)
);
