const express = require('express');
const CategoryController = require('../controllers/CategoryController');
const RegistrationController = require('../controllers/RegistrationController');
const SignInController = require('../controllers/SignInController');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

router.get('/categories', CategoryController.getAll);
router.post('/registration', RegistrationController.register);
router.get('/registration/verify', RegistrationController.verify);
router.post('/signIn', SignInController.signIn);
router.post('/auth/verify', AuthController.verifyToken);
router.get('/userCategories', CategoryController.getUserSpecific);
router.post('/userCategories/edit', CategoryController.setUserSpecific);

module.exports = router;
