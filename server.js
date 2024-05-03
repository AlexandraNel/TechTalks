const path = require('path'); //express requires to access static front end
const express = require('express');
const session = require('express-session'); //required for auth/security 
const exphbs = require('express-handlebars'); //handlebars optimised package w/ express
const routes = require('./controllers');
const handlebarsHelper = require('./Utils/handlebarsHelper'); // Require the helper file

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({
  // Specify the directory for partials
  partialsDir: ['views/partials/'],
  helpers: {
    truncate: handlebarsHelper.truncate // Register the truncate helper from Utils
  }
});
 
const sess = {
  secret: 'Super secret secret', //prevents hijacking of session
  cookie: {
    maxAge: 3600000, //session expires after 1hour
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening on port 3001'));
});



