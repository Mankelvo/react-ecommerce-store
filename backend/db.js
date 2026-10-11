import sql from "mssql";
import "dotenv/config";

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || 1433),

  options: {
    encrypt: true,
    trustServerCertificate: false,
  },
};

export async function getDbPool() {
  return sql.connect(dbConfig);
}