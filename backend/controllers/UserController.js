const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.json');
const User = require('../models/User');

const edit = async (req, res) => {
  try {
    let userId;
    try {
      const verify = jwt.verify(req.header('authorization').split(' ').pop(), secrets.jwtSecret);
      userId = verify.userId;
    } catch (err) {
      res.status(401).json(err);
      return;
    }
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (user) {
      user.weightType = req.body.weightType;
      user.save();
    }
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  edit,
};
