const hasha = require('hasha');
const cryptoRandomString = require('crypto-random-string');

const MailSenderService = require('../services/MailSenderService');
const MailComposerService = require('../services/MailComposerService');
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
      const context = {
        nickname: user.nickname,
        frontendUrl: process.env.BASE_URL_FRONTEND,
        backendUrl: process.env.BASE_URL_BACKEND,
        welcomeMessage: 'Köszönjük, hogy regisztráltál az Infláció Kalkulátor oldalra',
        token,
      };
      MailSenderService.send(
        user.email,
        'Megerősítő email',
        MailComposerService.compose(context, 'email.hbs'),
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
      if (userActivation) {
        const user = await User.findOne({
          where: { id: userActivation.userId },
        });
        if (user.isVerified) {
          throw new VerificationError('verification.errors.alreadyVerified');
        }
        if (userActivation.expiredAt < currentDate) {
          const token = cryptoRandomString({ length: 15, type: 'url-safe' });
          await UserService.updateToken(user.id, token);
          const context = {
            nickname: user.nickname,
            frontendUrl: process.env.BASE_URL_FRONTEND,
            backendUrl: process.env.BASE_URL_BACKEND,
            welcomeMessage: 'Újraküldtük az aktivációs linket',
            token,
          };
          MailSenderService.send(
            user.email,
            'Megerősítő email',
            MailComposerService.compose(context, 'email.hbs'),
          );
          throw new VerificationError('verification.errors.tokenExpired');
        }
        user.isVerified = true;
        user.save();
        res.json(user);
      } else {
        throw new VerificationError('verification.errors.tokenInvalid');
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
