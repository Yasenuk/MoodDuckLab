const compression = require('compression');
const express = require('express');
const helmet = require('helmet');
const path = require('path');

const app = express();

app.set('trust proxy', 1);

const reviews = require('./routes/reviews');

const PORT = process.env.PORT || 3000;

app.use(compression());

// Безпечні заголовки
helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "script-src": [
        "'self'",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com",
        "'unsafe-inline'"
      ],
      "img-src": [
        "'self'",
        "data:",
        "https://www.googletagmanager.com",
        "https://www.google-analytics.com"
      ],
      "connect-src": [
        "'self'",
        "https://www.google-analytics.com"
      ]
    }
  }
});

// Парсинг тіла запиту
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Публічні файли
app.use(express.static('public'));


// Головна
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// Відгуки
app.use(reviews);

// 404
app.use((req, res) => {
  res.status(404).sendFile(path.resolve(__dirname, 'public', '404.html'));
});

// Старт
app.listen(PORT, () => {
  console.log(`Сервер працює`);
});