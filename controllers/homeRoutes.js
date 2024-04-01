// CRUD
const router = require('express').Router();
const {Blog, User} = require ('../../models');
const withAuths = require('../Utils/auth');

//get all Blogs
router.get('/', (req, res) => {
    res.render(main)

})
router.put()
router.delete()