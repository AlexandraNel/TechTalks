// CRUD
const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuths = require('../../Utils/auth');

//new blog
router.post('/', withAuths, async (req, res) => {
  try {
    
    const newBlog = await Blog.create({
      ...req.body,
      user_id: req.session.userId,
    });

    res.status(200).json(newBlog);
  } catch (err) {
    res.status(400).json(err);
  }
});


//getOneBlog (id is fed through the button FETCH request)
router.get('/:id', withAuths, async (req, res) => {
  try {
    const singleBlog = await Blog.findByPk(req.params.id, {
      include: [
        { model: User, attributes: ['username'] },
        { model: Comment, include: { model: User, attributes: ['username'] } }
      ]
    });
    res.json(singleBlog);
  } catch (err) {
    res.status(500).json(err);
  }
});


//delete blog
router.delete('/:id', withAuths, async (req, res) => {
  try {
    const blogData = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!blogData) {
      res.status(404).json({ message: 'No blog found with this id!' });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    console.log(err.message);
    res.status(500).json(err);
  }
});

module.exports = router;
