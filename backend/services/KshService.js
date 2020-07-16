const util = require('util');
const wget = util.promisify(require('node-wget'));
const xlsx = require('xlsx');

const KSH_XLS_URL = 'http://www.ksh.hu/docs/hun/xstadat/xstadat_evkozi/xls/3_6_2h.xls';
const KSH_XLS_FILE = '/tmp/ksh.xlsx';

const downloadFile = async () => {
  return wget({
    url: KSH_XLS_URL,
    dest: KSH_XLS_FILE,
  });
};

class CategoryDto {
  constructor(id, name, percentage, value) {
    this.id = id;
    this.name = name;
    this.percentage = percentage;
    this.value = value;
    // this.parentCategory = null;
    this.active = true; // @todo
  }
}

const setParentCategoryIfNotExists = (categories, parentKey, keyMin, keyMax) => {
  Object.keys(categories).forEach((subkey) => {
    if (subkey.includes('–')) return;
    const subValue = categories[subkey];
    if (subkey >= keyMin && subkey <= keyMax && subValue.parentCategory === null) {
      subValue.parentCategory = parentKey;
    }
  });
};

const readXLS = async () => {
  const categories = [];
  const xlsFile = await xlsx.readFile(KSH_XLS_FILE);
  const workSheet = xlsFile.Sheets[xlsFile.SheetNames[0]];
  const indexCol = 'A';
  const nameCol = 'B';
  const valueCol = 'BI';
  const percentageCol = 'BC';
  const firstRow = 5;
  const lastRow = 190;

  for (let i = firstRow; i < lastRow; i++) {
    const id = workSheet[indexCol + i].v;
    const name = workSheet[nameCol + i].v.trimEnd();
    const value = workSheet[valueCol + i].v;
    const percentage = workSheet[percentageCol + i].v;
    categories[id] = new CategoryDto(id, name, percentage, value);
  }

  Object.keys(categories).forEach((key) => {
    if (key < 100) {
      setParentCategoryIfNotExists(categories, key, key * 10, key * 10 + 10);
    }
    if (key.includes('–')) {
      const keys = key.split('–');
      setParentCategoryIfNotExists(categories, key, keys[0], keys[1]);
      if (keys[0][0] === keys[1][0]) {
        categories[key].parentCategory = keys[0][0]; // eslint-disable-line prefer-destructuring
      }
    }
    if (key >= 60 && key < 70 && categories[key].parentCategory == null) {
      // a 600 felettieknek nincs '–'-es szülője todo
      categories[key].parentCategory = 6;
    }
  });
  return Object.values(categories).filter((category) => category);
};

const importStatistics = async () => {
  await downloadFile();
  return readXLS();
};

module.exports = {
  importStatistics,
};
