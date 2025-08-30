const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// メモリに投稿保存(再起動で消える)
let posts = [];

// 投稿処理
app.post("/post", (req, res) => {
  const { name, content } = req.body;
  if (!name || !content) return res.send("名前と本文を入力してください");

  posts.push({
    id: posts.length + 1,
    name,
    content,
    time: new Date()
  });
  res.redirect("/");
});

// 投稿一覧をJSONで返す
app.get("/posts.json", (req, res) => {
  res.json(posts.slice().reverse());
});

// index.htmlを返す
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// RenderはPORT環境変数を使う
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BBS → http://localhost:${PORT}/`));
