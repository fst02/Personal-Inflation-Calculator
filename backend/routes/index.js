const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const RegistrationController = require('../controllers/RegistrationController');

const router = express.Router();

router.get('/categories', CategoryController.getAll);
router.post('/registration', RegistrationController.register);
router.get('/registration/verify', RegistrationController.verify);

module.exports = router;
