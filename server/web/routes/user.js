'use strict';

const BaseRoute = require('./base');
// const auth = require('../../middlewares/security/auth');
const auth = {};

class UserRoute extends BaseRoute {
  constructor({ userController }) {
    super(userController);
  }

  get(router) {
    const self = this;
    // const { validator } = self;

    router.post('/register', self.registerHandler('register'));
    router.post('/login', self.registerHandler('login'));
    router.post('/logout', auth, self.registerHandler('logout'));
  }

  getBaseUrl() {
    return '/users';
  }

}

module.exports = UserRoute;
