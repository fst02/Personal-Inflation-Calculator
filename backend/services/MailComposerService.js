const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const mjml2html = require('mjml');

module.exports = {
  compose: (context, templatePath) => {
    const templateFile = fs.readFileSync(path.join(__dirname, '../views/', templatePath), 'utf8');
    const template = Handlebars.compile(templateFile);
    const hbsProcessedTemplate = template(context);
    const mjmlProcessedTemplate = mjml2html(hbsProcessedTemplate);
    return mjmlProcessedTemplate.html;
  },
};
