// server.js
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

let posts = [];

app.post("/post", (req, res) => {
  const { name, content } = req.body;
  // フロントでチェック済みなのでここではそのまま保存
  posts.push({
    id: posts.length + 1,
    name,
    content,
    time: new Date()
  });
  res.redirect("/");
});

app.get("/posts.json", (req, res) => {
  res.json(posts.slice().reverse());
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BBS → http://localhost:${PORT}/`));
