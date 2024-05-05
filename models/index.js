const User = require('./User');
const Blog = require('./Blog');
const Comment = require ('./Comment');

User.hasMany(Blog, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Blog.belongsTo(User, {
    foreignKey: 'user_id',
});

Blog.hasMany(Comment, {foreignKey: "blog_id"})
Comment.belongsTo(Blog)


User.hasMany(Comment, {foreignKey: "user_id"})
Comment.belongsTo(User)
// must export each model here 
module.exports = {User, Blog, Comment}