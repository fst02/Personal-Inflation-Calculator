const fs = require('fs');

const imageExists = (categoryId) => new Promise((resolve, reject) => {
  const path = `../public/images/image-${categoryId}.jpg`;
  fs.access(path, fs.F_OK, (err) => {
    if (err) {
      reject();
    } else {
      resolve();
    }
  });
});

module.exports = {
  imageExists,
};
