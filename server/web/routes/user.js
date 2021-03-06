'use strict';

const BaseRoute = require('./base');
// const passport = require('passport');
const validateLoginInfo = require('../validators/user/validateLoginInfo');
const validateRegisterInfo = require('../validators/user/validateRegisterInfo');
const ratelimit = require('../../middlewares/rateLimit/rateLimit');
const authenticate = require('../../middlewares/security/authenticate');

class UserRoute extends BaseRoute {
  constructor({ userController }) {
    super(userController);
  }

  get(router) {
    const self = this;
    const { validator } = self;

    router.post('/register', ratelimit, validator(validateRegisterInfo), self.registerHandler('register'));
    router.post('/login', ratelimit, validator(validateLoginInfo), authenticate);
    router.post('/logout', self.registerHandler('logout'));
  }

  getBaseUrl() {
    return '/users';
  }

}

module.exports = UserRoute;
