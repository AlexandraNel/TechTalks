// CRUD
const router = require('express').Router();
const { Blog, User } = require('../models');
const withAuths = require('../Utils/auth');

//homepage route homepage will redirect to logged in or not logged in 
router.get('/', async (req, res) => {
    try {
        res.render('homepage', { //express looks for homepage within handlebars
            // passes loggedin state to the template,
            loggedIn: req.session.loggedIn, //pass logged in status
            username: req.session.username //pass username
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

//signup page route 
router.get('/signup', async (req, res) => {
    try {
        res.render('signup', { 
            signupPage: true//express looks for signup within handlebars
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

//single blog reading page route
router.get('/blog/:id', withAuths, async (req, res) => {
    try {
        const blog = await Blog.findByPk(req.params.id, {
            include: { model: User, attributes: ['username'] }
        });
        if (blog) {
            res.render('oneblog', { blog });
        } else {
            res.status(404).send('Blog not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/newblog', withAuths, async (req, res) => {
    try{
        res.render('newblog', {
            newblogPage: true
        });
    } catch (err) {
        console.error('Server error finding new blog page:', err); 
        res.status(500).send('Server error finding new blog page:'); 
    }
})

module.exports = router;