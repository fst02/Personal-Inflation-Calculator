const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const RegistrationController = require('../controllers/RegistrationController');
const SignInController = require('../controllers/SignInController');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/categories', CategoryController.getAll);
router.post('/registration', RegistrationController.register);
router.get('/registration/verify', RegistrationController.verify);
router.post('/signIn', SignInController.signIn);
router.post('/userCategories/edit', CategoryController.setUserSpecific);
router.put('/users/weightType', UserController.edit);

module.exports = router;
