import { getDbPool } from "./db.js";

try {
  const pool = await getDbPool();

  const result = await pool.request().query(`
    SELECT
      DB_NAME() AS DatabaseName,
      COUNT(*) AS OrderCount
    FROM dbo.Orders
  `);

  console.log("Azure SQL connection successful!");
  console.log(result.recordset[0]);

  await pool.close();
} catch (error) {
  console.error("Database connection failed:", error.message);
  process.exitCode = 1;
}