const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

// 🔥 HTML 파일 연결
app.use(express.static(__dirname));

let memories = [];

if (fs.existsSync("data.json")) {
  memories = JSON.parse(fs.readFileSync("data.json"));
}

app.post("/add", (req, res) => {
  memories.push(req.body.text);
  fs.writeFileSync("data.json", JSON.stringify(memories));
  res.send({ success: true });
});

app.get("/list", (req, res) => {
  res.send(memories);
});

app.listen(3000, () => {
  console.log("서버 실행중");
});
