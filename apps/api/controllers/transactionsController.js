import store from '../store/inMemoryStore.js';
import { nanoid } from 'nanoid';

function toISO(date) {
  return new Date(date).toISOString();
}

export const getAll = (req, res) => {
  const items = store.getAll();
  res.json(items);
};

export const getById = (req, res) => {
  const item = store.getById(req.params.id);
  if (!item) return res.status(404).json({ error: 'Transaction not found' });
  res.json(item);
};

export const create = (req, res) => {
  const { description, amount, type } = req.body;
  const newItem = {
    id: nanoid(),
    description,
    amount: Number(amount),
    type,
    createdAt: toISO(Date.now()),
  };

  store.add(newItem);
  res.status(201).json(newItem);
};
