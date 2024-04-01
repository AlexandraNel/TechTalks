//initialise sequelize to define db tables
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

//creat e ablog class that inherits sequelize Model attributes 
//for creating blog posts
class Blog extends Model { }

Blog.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        created: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        body: {
            type: DataTypes.TEXT,
            allownull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true, //do not pluralise table names
        underscored: true, //use snake case instead of camelCase ie user_id not userId
        modelName: 'blog',
    }
);

module.exports = Blog;
