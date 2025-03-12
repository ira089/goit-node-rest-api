// require("dotenv").config();
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();

// const { Pool } = require("pg");
const { Pool } = pg;
export const pool = new Pool({
  max: 300,
  connectionTimeoutMillis: 5000,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
  ssl: {
    rejectUnauthorized: false, // Для Azure Cosmos DB
  },
});
// module.exports = {
//   pool,
// };
