const Category = require('../models/Category');
const UserCategories = require('../models/UserCategory');

const getAll = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserSpecific = async (req, res) => {
  try {
    const userSpecific = await UserCategories.findAll(
      { where: { userId: req.query.userId } },
    );
    res.json(userSpecific);
  } catch (err) {
    res.status(500).json(err);
  }
};

const setUserSpecific = async (req, res) => {
  try {
    let userCategory = await UserCategories.findOne({
      where: {
        userId: req.body.userId,
        categoryId: req.body.categoryId,
      },
    });
    if (userCategory) {
      userCategory.active = req.body.active;
      userCategory.weight = req.body.weight;
      userCategory.save();
    } else {
      userCategory = await UserCategories.create(req.body);
    }
    res.json(userCategory);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAll,
  getUserSpecific,
  setUserSpecific,
};
