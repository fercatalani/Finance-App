const items = [];

const getAll = () =>
  items.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

const getById = (id) => items.find((i) => i.id === id);

const add = (item) => items.push(item);

const store = { getAll, getById, add };

export default store;
