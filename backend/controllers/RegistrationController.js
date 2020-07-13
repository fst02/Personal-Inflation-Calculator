const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const mjml2html = require('mjml');

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
      const templateFile = fs.readFileSync(path.join(__dirname, '../views/email.hbs'), 'utf8');
      const template = Handlebars.compile(templateFile);
      const context = {
        nickname: user.nickname,
        frontendURL: process.env.BASE_URL_FRONTEND,
        token,
      };
      const hbsProcessedTemplate = template(context);
      const mjmlProcessedTemplate = mjml2html(hbsProcessedTemplate);
      MailerService.send(
        userData.email,
        'Megerősítő email',
        mjmlProcessedTemplate.html,
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
          MailerService.send(
            user.email,
            'Confirmation email',
            `Let's confirm your email address.
            Please finish your registration by clicking on the link below:
            ${process.env.BASE_URL_FRONTEND}/registration/verify?token=${token}`,
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
