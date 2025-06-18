require('dotenv').config();
const { Pool } = require('pg');

// const pool = new Pool({
//   host: process.env.PGHOST,
//   port: process.env.PGPORT,
//   database: process.env.PGDATABASE,
//   user: process.env.PGUSER,
//   password: process.env.PGPASSWORD,
// });

const pool = new Pool({
  connectionString: process.env.IDBURL,
  ssl: {
    rejectUnauthorized: false, // Для Render.com потрібен цей параметр, бо SSL
  },
});

module.exports = pool;
