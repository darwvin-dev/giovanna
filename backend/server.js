import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import adminRoutes from "./routes/adminRoutes.js";
import apiRoutes from "./routes/apiRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/admin", adminRoutes);
app.use("/api", apiRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:4000");
});
