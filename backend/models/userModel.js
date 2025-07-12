const pool = require('../config/db');
const bcrypt = require('bcryptjs');

async function createUser(name, email, password, address, role) {
  // Hash password before saving
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const result = await pool.query(
    `INSERT INTO users (name, email, password, address, role) 
     VALUES ($1, $2, $3, $4, $5) RETURNING id, name, email, role`,
    [name, email, hashedPassword, address, role]
  );

  return result.rows[0];
}

async function getUserByEmail(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
}

module.exports = { createUser, getUserByEmail };
