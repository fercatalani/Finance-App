import express from "express";
import morgan from "morgan";
import transactionsRouter from "./routes/transactions.js";
import financesRouter from "./routes/finances.js";
import authRouter from "./routes/auth.js";

const app = express();
const port = process.env.PORT || 4000;

// Built-in parsing middleware
app.use(express.json());

// Simple request logger
app.use(morgan("short"));

// Health check
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Mount API routes under /api/* to match frontend expectations
app.use("/api/transactions", transactionsRouter);
app.use("/api/finances", financesRouter);
app.use("/api/auth", authRouter);

// Basic 404
app.use((req, res) => res.status(404).json({ error: "Not found" }));

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
