const sequelize = require('../config/connection');
const { User, Blog} = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
// const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: false });  // Resets your database, be cautious with this in production

  // Bulk create users
  const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
  });

  // Bulk create blogs and directly await their creation without storing them
  await Promise.all(
      blogData.map(blog => {
          return Blog.create({
              ...blog,
              user_id: users[Math.floor(Math.random() * users.length)].id,  // Randomly assign user ids to blogs
          });
      })
  );

  console.log('All models were synchronized successfully.');
  process.exit(0);
};

seedDatabase();
