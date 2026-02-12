export default function validateTransaction(req, res, next) {
  const { description, amount, type } = req.body || {};
  const errors = [];

  if (!description || typeof description !== 'string') {
    errors.push('description is required and must be a string');
  }

  if (amount === undefined || isNaN(Number(amount))) {
    errors.push('amount is required and must be a number');
  }

  if (type !== 'income' && type !== 'expense') {
    errors.push("type is required and must be 'income' or 'expense'");
  }

  if (errors.length) return res.status(400).json({ errors });
  next();
};
