// CRUD
const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuths = require('../Utils/auth');

//homepage route homepage will redirect to logged in or not logged in 
router.get('/', async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const blogData = await Blog.findAll({
                include: [{ model: User }],
                order: [['created', 'DESC']] // Assuming 'created' is a timestamp field
            });

            const blogs = blogData.map(blog => blog.get({ plain: true })); //serialize data

            res.render('homepage', {
                allBlogs: blogs,
                loggedIn: req.session.loggedIn,
                username: req.session.username
            });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    } else {
        // If not logged in, redirect or render a different template
        res.render('homepage', {  // or redirect using res.redirect('/login') but prefference was to go to homepage intro
           homepage:true,
        });
    }
});

//login page route 
router.get('/login', async (req, res) => {
    try {

        if (req.session.loggedIn) {
            res.redirect('/');
        } else {
        res.render('login', { 
            loginPage: true,//express looks for homepage within handlebars
        })};

    } catch (err) {
        res.status(500).json(err);
    }
});

//signup page route 
router.get('/signup', async (req, res) => {
    try {
        if (req.session.loggedIn) {
            res.redirect('/');
        } else {
        res.render('signup', { 
            signupPage: true,//express looks for homepage within handlebars
        })};
    } catch (err) {
        res.status(500).json(err);
    }
});

//single blog reading page route
router.get('/blog/:id', withAuths, async (req, res) => {
    try {
        
        const blogData = await Blog.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment, include: { model: User, attributes: ['username'] } }
              ]
            });
        if (blogData) {
            const blog = blogData.get({plain: true}) //serialize data so handlebars does not reject data
            console.log(blog);
            res.render('oneblog', { 
                ...blog, 
                loggedIn: req.session.loggedIn })
            
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
            newblogPage: true,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        console.error('Server error finding new blog page:', err); 
        res.status(500).send('Server error finding new blog page:'); 
    }
})

module.exports = router;