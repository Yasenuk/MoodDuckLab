const express = require('express');
const router = express.Router();
const pool = require('../db');

const reviewLimiter = require('../middleware/limit');

router.post('/send-review', reviewLimiter, async (req, res) => {
  const { rating = 5, name, phone, message, pluses = '', minuses = 'Поки не бачу' } = req.body;
  const avatarId = Math.floor(Math.random() * 21) + 1;

	// Валідація
	const isValidName = name => /^[А-Яа-яA-Za-zЇїІіЄєҐґ'’\-\s]{2,50}$/.test(name);
	const isValidPhone = phone => /^\+380\d{9}$/.test(phone);
	const isValidMessage = msg => msg && msg.length >= 5 && msg.length <= 500;

	if (!isValidName(name)) return res.status(400).json({ success: false, error: 'Некоректне ім\'я або прізвище' });
	if (!isValidPhone(phone)) return res.status(400).json({ success: false, error: 'Некоректний номер телефону' });
	if (!isValidMessage(message)) return res.status(400).json({ success: false, error: 'Відгук занадто короткий' });

  try {
    await pool.query(
      `INSERT INTO reviews (username, rating, avatar_id, review_text, pros, cons, phone)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [name, rating, avatarId, message, pluses, minuses, phone]
    );
    res.status(200).json({ success: true, message: 'Відгук збережено!' });
  } catch (err) {
    console.error('💥 Помилка бази:', err.message);
    res.status(500).json({ success: false, error: 'Помилка сервера...' });
	}
	
	// Перевірка перевищення ліміту
  const tooManyRequests = false;

  if (tooManyRequests && req.body.subscription) {
    const payload = getRateLimitMessage(req.body.name);
    await sendPushNotification(req.body.subscription, payload);
    return res.status(429).json({ success: false, error: 'Забагато запитів!' });
  }
});

// Вивід відгуків
router.get('/reviews', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, username, rating, avatar_id, review_text, pros, cons, phone, published_at
       FROM reviews
       ORDER BY published_at DESC`
    );
    res.json(result.rows);
    console.log(result.rows);
    
  } catch (err) {
    console.error('Помилка при отриманні відгуків:', err.message);
    res.status(500).json({ error: 'Не вдалося отримати відгуки...' });
  }
});

module.exports = router;