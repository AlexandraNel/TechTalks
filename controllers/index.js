const router = require('express').Router();
const apiRoutes = require ('./api'); //require apiRoutes
const homeRoutes = require ('./homeRoutes'); //require homeRoutes

router.use('/api', apiRoutes); //mount api Routes
router.use('/', homeRoutes) //mount home Routes

module.exports = router;