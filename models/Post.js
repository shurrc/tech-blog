//Import sequelize library/package
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//Defines 'Post' as a model
class Post extends Model {}

//Creates a new model for a Post
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: ""
    },
    api_json: { 
      type: DataTypes.TEXT,  
    },
    api_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },

  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

//Export this model as 'Post'
module.exports = Post;
