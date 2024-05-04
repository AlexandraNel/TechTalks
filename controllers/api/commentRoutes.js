// CRUD
const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');
const withAuths = require('../../Utils/auth');

//new comment
router.post('/', withAuths, async (req, res) => {
    try {
      
      const newComment = await Comment.create({
        ...req.body,
        blog_id: req.params.id,
        user_id: req.session.userId,
      });
     
  
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });


// Delete a comment
router.delete('/:id', withAuths, async (req, res) => {
  try {
      // Get the comment by its ID
      const comment = await Comment.findByPk(req.params.id);

      // Check if the user who is trying to delete the comment is the same as the user who posted the comment or the user who owns the blog
      if (comment.user_id === req.session.userId || comment.Blog.user_id === req.session.userId) {
          // If the user is the same as the user who posted the comment or the user who owns the blog, delete the comment
          const commentDelete = await Comment.destroy({
              where: {
                  id: req.params.id,
              },
          });

          if (!commentDelete) {
              res.status(404).json({ message: 'No comment found with this id!' });
              return;
          }

          res.status(200).json(commentDelete);
      } else {
          // If the user is not the same as the user who posted the comment or the user who owns the blog, return a 403 Forbidden response
          res.status(403).json({ message: 'You are not authorized to delete this comment!' });
      }
  } catch (err) {
      res.status(500).json(err);
  }
});

module.exports = router;