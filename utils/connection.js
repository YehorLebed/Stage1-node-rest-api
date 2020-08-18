const mysql = require('mysql2/promise');

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

module.exports.getConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME
    });
    return connection;
  } catch (error) {
    console.log('Connection Error');
    throw error;
  }
}