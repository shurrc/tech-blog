//Import sequelize library/package
const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

//Defines 'User' as a model
class User extends Model {
  //This instance method uses a bcrypt to check the password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newUserData) {
        // encrypt password
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        
        // save as lowercase
        newUserData.email = newUserData.email.toLowerCase();
       
        // make proper case
        newUserData.first_name = 
          newUserData.first_name[0].toUpperCase() + 
          newUserData.first_name.slice(1).toLowerCase();

        // make proper case
        newUserData.last_name = 
          newUserData.last_name[0].toUpperCase() + 
          newUserData.last_name.slice(1).toLowerCase();

        return newUserData;
      },

      async beforeUpdate(updateUser) {
         // encrypt password
        updateUser.password = await bcrypt.hash(updateUser.password, 10);
        return updateUser;
      },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "user",
  }
);

//Export this model as 'User'
module.exports = User;