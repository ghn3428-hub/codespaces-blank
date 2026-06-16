const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

let memories = [];

// 데이터 불러오기
if (fs.existsSync("data.json")) {
  memories = JSON.parse(fs.readFileSync("data.json"));
}

// 저장 API
app.post("/add", (req, res) => {
  memories.push(req.body.text);
  fs.writeFileSync("data.json", JSON.stringify(memories));
  res.send({ success: true });
});

// 조회 API
app.get("/list", (req, res) => {
  res.send(memories);
});

app.listen(3000, () => {
  console.log("서버 실행중");
});
