/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-var-requires */
const data = require('./db.json');

module.exports = () => ({
  data: data,
});
