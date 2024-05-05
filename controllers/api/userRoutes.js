const { Op } = require('sequelize'); //for Or statement

// CRUD
const router = require('express').Router();
const { User } = require('../../models');


// CREATE new user
router.post('/', async (req, res) => {
  try {

    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email: req.body.email },
          { username: req.body.username }
        ]
      }
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with the given username or email.' });
    }

    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });


    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id; // Storing user ID
      req.session.username = dbUserData.username; // Storing username for personalisation

         res.status(200).json({
        id: dbUserData.id, username: dbUserData.username, email: dbUserData.email, message: 'You are now logged in!'
      });
    });

} catch (err) {
  console.log(err);
  res.status(500).json({ message: 'Server error during login' });
}
  });


// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.id; // Storing user ID
      req.session.username = dbUserData.username; // Storing username for personalisation

      res.status(200).json({
        id: dbUserData.id, username: dbUserData.username, email: dbUserData.email, message: 'You are now logged in!'
      });
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Failed to log out, please try again.' })
      }
      res.redirect('/'); //redirect to homepage

    });
  } else {
    res.status(404).send("no active session to log out");
  }
});

module.exports = router;
