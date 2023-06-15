/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-restricted-syntax */
// eslint-disable-next-line import/no-extraneous-dependencies
const { mkdir, writeFile } = require('node-fs');
const db = require('../db')();

mkdir('./build/static/db', () => {
  for (const [key, value] of Object.entries(db.data)) {
    writeFile(
      `./build/static/db/${key}.json`,
      JSON.stringify(value),
      (err) => {
        if (err) {
          throw err;
        }
      },
    );
  }
});
