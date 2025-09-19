import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import adminRoutes from "./routes/adminRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public/")));

app.use("/api/admin", adminRoutes);
app.use("/api", apiRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:4000");
});
