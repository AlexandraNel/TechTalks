// Register a Handlebars helper to truncate text
const Handlebars = require('handlebars');

Handlebars.registerHelper('truncate', function(text, length) {
  if (text.length > length) {
    return text.substring(0, length) + '...';
  } else {
    return text;
  }
});
