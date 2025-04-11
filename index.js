const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 4000;
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());
require("dotenv").config();

const connectDB = new sqlite3.Database("/database/dua_main.sqlite", (err) => {
  if (err) {
    console.log("Database Error", err?.message);
  } else {
    console.log("Sqlite Connected");
  }
});

app.get("/", (req, res) => {
  res.send("Dua Dhikr");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
