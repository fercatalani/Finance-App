import express from "express";
import store from "../store/inMemoryStore.js";

const router = express.Router();

// GET /api/finances - list
router.get("/", (req, res) => {
  const items = store.getAll();
  res.json({
    status: "ok",
    message: "Mock finances response from Express API",
    timestamp: new Date().toISOString(),
    data: items,
  });
});

// POST /api/finances - add item
router.post("/", (req, res) => {
  const { description, amount, type } = req.body || {};
  const newItem = {
    id: `i_${Date.now()}`,
    description: description || "Untitled",
    amount: Number(amount) || 0,
    type: type === "income" ? "income" : "expense",
    createdAt: new Date().toISOString(),
  };

  // reuse the in-memory store
  store.add(newItem);
  res.status(201).json(newItem);
});

export default router;
