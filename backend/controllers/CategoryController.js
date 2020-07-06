const Category = require('../models/Category');

const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
};
