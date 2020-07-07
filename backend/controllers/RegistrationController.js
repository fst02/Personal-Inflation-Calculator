const hasha = require('hasha');
const cryptoRandomString = require('crypto-random-string');

const MailerService = require('../services/MailerService');
const AuthService = require('../services/AuthService');
const { VerificationError } = require('./errors/VerificationError');
const { RegistrationError } = require('./errors/RegistrationError');
const UserService = require('../services/UserService');

const User = require('../models/User');

module.exports = {
  register: async (req, res) => {
    try {
      const userData = req.body;
      userData.password = hasha(userData.password);
      userData.isVerified = false;
      const user = await UserService.create(userData);
      const token = cryptoRandomString({ length: 15, type: 'url-safe' });
      await UserService.activate(user, token);

      MailerService.send(
        userData.email,
        'Confirmation email',
        `Let's confirm your email address.
        Please finish your registration by clicking on the link below:
        ${process.env.BASE_URL_FRONTEND}/registration/verify?token=${token}`,
      );
      res.json(user);
    } catch (err) {
      if (err instanceof RegistrationError) {
        res.status(422).json({ message: err.message, errors: err.errors });
      } else {
        res.status(500).json({ message: err.message, errors: err.errors });
      }
    }
  },
  verify: async (req, res) => {
    try {
      const currentDate = new Date();
      const userActivation = await AuthService.select(req.query.token);
      if (userActivation && userActivation.expiredAt >= currentDate) {
        const user = await User.findOne({
          where: { id: userActivation.userId },
        });
        if (user.isVerified) {
          throw new VerificationError('Account is already verified');
        }
        user.isVerified = true;
        user.save();
        res.json(user);
      } else {
        throw new VerificationError('Invalid or expired token');
      }
    } catch (err) {
      if (err instanceof VerificationError) {
        res.status(422).json({ message: err.message });
      } else {
        res.status(500).json({ message: err.message, errors: err.errors });
      }
    }
  },
};
