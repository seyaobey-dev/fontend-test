import express from "express";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.post("/api/save-rules", (req, res) => {
  const rules = req.body;
  const filePath = path.join(process.cwd(), "rules.json");

  fs.writeFile(filePath, JSON.stringify(rules, null, 2), (err) => {
    if (err) {
      return res.status(500).send("Failed to save file");
    }
    res.send("Success");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
