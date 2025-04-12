const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
const path = require("path");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
require("dotenv").config();

const dbPath = path.resolve(__dirname, "database", "dua_main.sqlite");
const connectDB = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.log("Database Error", err?.message);
  } else {
    console.log("Sqlite Connected");
  }
});

app.get("/api/categories", async (req, res) => {
  const searchCategory = req.query.search || "";
  const query = "SELECT * FROM category WHERE cat_name_en LIKE ?";
  const searchValue = `%${searchCategory}%`;
  connectDB.all(query, [searchValue], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/api/dua", async (req, res) => {
  connectDB.all("SELECT * FROM dua", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.get("/api/subcategories", async (req, res) => {
  connectDB.all("SELECT * FROM sub_category", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

app.get("/", (req, res) => {
  res.send("Dua Dhikr");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
