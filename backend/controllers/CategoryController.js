const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.json');
const Category = require('../models/Category');
const UserCategory = require('../models/UserCategory');

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
    let userId;
    try {
      const verify = jwt.verify(req.header('authorization').split(' ').pop(), secrets.jwtSecret);
      userId = verify.userId;
    } catch (err) {
      userId = null;
    }
    const categoriesWithUserCategories = await Category.findAll(
      { include: [{ model: UserCategory, where: { userId }, required: false }] },
    );
    res.json(categoriesWithUserCategories);
  } catch (err) {
    res.status(500).json(err);
  }
};

const setUserSpecific = async (req, res) => {
  try {
    let userId;
    try {
      const verify = jwt.verify(req.header('authorization').split(' ').pop(), secrets.jwtSecret);
      userId = verify.userId;
    } catch (err) {
      res.status(401).json(err);
      return;
    }
    let userCategory = await UserCategory.findOne({
      where: {
        userId,
        categoryId: req.body.categoryId,
      },
    });
    if (userCategory) {
      userCategory.active = req.body.active;
      userCategory.percentage = req.body.percentage;
      userCategory.amount = req.body.amount;
      userCategory.save();
    } else {
      userCategory = await UserCategory.create(req.body);
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
