import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/database.js";
import router from "./routes/auth.routes.js";
import promptRouter from "./routes/prompt.route.js";
dotenv.config();
connectDB()
const app = express();
app.use(cors({ origin: "http://localhost:5173" }))
app.use(express.json());
app.get("/", (req, res) => { res.json({ data: "json" }); });
app.use("/auth", router);
app.use("/api", promptRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`app listen on port ${port}`);
});