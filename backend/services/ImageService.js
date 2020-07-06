const fs = require('fs');
const util = require('util');
const path = require('path');

const fsAccess = util.promisify(fs.access);

const imageExists = (categoryId) => {
  const imagePath = path.join(__dirname, `../public/images/image-${categoryId}.jpg`);
  return fsAccess(imagePath, fs.F_OK);
};

module.exports = {
  imageExists,
};
