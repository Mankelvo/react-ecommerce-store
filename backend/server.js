import express from "express";
import sql from "mssql";
import { getDbPool } from "./db.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Mankelvo Market API",
    message: "Backend is running successfully"
  });
});

app.post("/api/orders", async (req, res) => {
  const { customerName, email, total } = req.body;

  const amount = Number(total);

  if (
    typeof customerName !== "string" ||
    !customerName.trim() ||
    customerName.length > 100 ||
    typeof email !== "string" ||
    !email.includes("@") ||
    email.length > 150 ||
    !Number.isFinite(amount) ||
    amount <= 0
  ) {
    return res.status(400).json({
      error: "Invalid order details"
    });
  }

  try {
    const pool = await getDbPool();

    const result = await pool.request()
      .input("name", sql.NVarChar(100), customerName.trim())
      .input("email", sql.NVarChar(150), email.trim())
      .input("total", sql.Decimal(10, 2), amount)
      .query(`
        INSERT INTO dbo.Orders
          (CustomerName, Email, Total)
        OUTPUT INSERTED.OrderID
        VALUES (@name, @email, @total)
      `);

    res.status(201).json({
      message: "Demo order saved successfully",
      orderId: result.recordset[0].OrderID
    });

  } catch (error) {
    console.error("Order save failed:", error.message);

    res.status(500).json({
      error: "Unable to save order"
    });
  }
});

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Mankelvo API running on port ${PORT}`);
});