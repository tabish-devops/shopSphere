const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "shopsphere_user",
  password: "ShopSphere@123",
  database: "shopsphere"
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection failed:", err.message);
    return;
  }

  console.log("MySQL connected successfully!");
});

app.get("/", (req, res) => {
  res.json({
    message: "ShopSphere Backend is Running!"
  });
});

app.get("/api/products", (req, res) => {
  const sql = "SELECT * FROM products";

  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database error"
      });
    }

    res.json(results);
  });
});

app.get("/api/products/:id", (req, res) => {
  const sql = "SELECT * FROM products WHERE id = ?";

  db.query(sql, [req.params.id], (err, results) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database error"
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(results[0]);
  });
});

app.post("/api/products", (req, res) => {
  const { name, category, price, rating } = req.body;

  const sql = `
    INSERT INTO products (name, category, price, rating)
    VALUES (?, ?, ?, ?)
  `;

  db.query(
    sql,
    [name, category, price, rating],
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Database error"
        });
      }

      res.status(201).json({
        message: "Product added successfully",
        product: {
          id: result.insertId,
          name: name,
          category: category,
          price: price,
          rating: rating
        }
      });
    }
  );
});

app.put("/api/products/:id", (req, res) => {
  const { name, category, price, rating } = req.body;

  const sql = `
    UPDATE products
    SET name = ?,
        category = ?,
        price = ?,
        rating = ?
    WHERE id = ?
  `;

  db.query(
    sql,
    [name, category, price, rating, req.params.id],
    (err, result) => {
      if (err) {
        console.error(err);

        return res.status(500).json({
          message: "Database error"
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      res.json({
        message: "Product updated successfully"
      });
    }
  );
});

app.delete("/api/products/:id", (req, res) => {
  const sql = "DELETE FROM products WHERE id = ?";

  db.query(sql, [req.params.id], (err, result) => {
    if (err) {
      console.error(err);

      return res.status(500).json({
        message: "Database error"
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product deleted successfully"
    });
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`ShopSphere backend running on port ${PORT}`);
});

