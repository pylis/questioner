'use strict';

const config = require('config');
const idLength = config.get('validation.idLength');

module.exports = (ctx) => {
  ctx.checkParams('questionId').notEmpty().len(idLength, idLength, 'questionId\'s length should be 24');
  ctx.checkParams('answerId').notEmpty().len(idLength, idLength, 'answerId\'s length should be 24');
};