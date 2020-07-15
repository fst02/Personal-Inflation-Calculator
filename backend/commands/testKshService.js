const KshService = require('../services/KshService');

(async () => {
  console.log(await KshService.importStatistics()); // eslint-disable-line no-console
})();
