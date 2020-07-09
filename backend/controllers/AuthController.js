const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.json');

const verifyToken = async (req, res) => {
  try {
    const verify = jwt.verify(req.header('authorization').split(' ').pop(), secrets.jwtSecret);
    res.json({ response: 'ok', userId: verify.userId });
  } catch (err) {
    res.status(403).json({ response: err.message });
  }
};

module.exports = { verifyToken };
