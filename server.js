import express from "express";
import cors from "cors";
import portfolioRoute from "./routes/portfolioRoute.js";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

const app = express();
// ES Module Fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// statics Files
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("/api/v1/portfolio", portfolioRoute);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
