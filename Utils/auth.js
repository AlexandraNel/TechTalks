//simple custom middleware authentication that redicrects user that is not logged in
//to the login.js

const withAuths = (req, res, next) => {
    if (!req.session.loggedIn) {
      res.redirect('/login');
    } else {

      next();
    }
  };
  
module.exports = withAuths;