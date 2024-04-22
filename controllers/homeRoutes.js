// CRUD
const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuths = require('../Utils/auth');

//homepage route homepage will redirect to logged in or not logged in 
router.get('/', async (req, res) => {
    try {
        res.render('homepage', { //express looks for homepage within handlebars
            // passes loggedin state to the template,
            loggedIn: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//login page route 
router.get('/login', async (req, res) => {
    try {
        res.render('login', { 
            loginPage: true//express looks for homepage within handlebars
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//signin page route 
router.get('/signup', async (req, res) => {
    try {
        res.render('signup', { 
            signupPage: true//express looks for homepage within handlebars
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;