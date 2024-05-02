// Utils/handlebarsHelper.js

const Handlebars = require('handlebars');

// Define your helper functions
const truncateHelper = (text, length) => {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  }
  return text;
};

// Export your helper functions
module.exports = {
  truncate: truncateHelper
};
