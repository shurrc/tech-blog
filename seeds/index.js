const sequelize = require("../config/connection");
const User = require("../models/User");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const userSeeds = require("./user-seeds.json");
const postSeeds = require("./post-seeds.json");
const commentSeeds = require("./comment-seeds.json");

const seedDatabase = async() => {
  try {
    await sequelize.sync({force: true})

    await User.create({
      first_name: "bot",
      last_name: "bot",
      username: "bot",
      email: "bot@bot.com",
      password: "botbotbot"
    },{
      individualHooks: true, 
      returning: true
    });
    await User.create({
      "first_name": "tony",
      "last_name": "shark",
      "username": "ironman",
      "email": "ironman@iron.com",
      "password": "tonyshark"
    },{
      individualHooks: true, 
      returning: true
    });
    await User.create({
      "first_name": "hulk",
      "last_name": "banner",
      "username": "hulk",
      "email": "hulkbanner@gmail.com",
      "password": "banner"
    },{
      individualHooks: true, 
      returning: true
    });
    await User.create({
      "first_name": "black",
      "last_name": "widow",
      "username": "blackwidow",
      "email": "blackwidow@gmail.com",
      "password": "natasha"
    },{
      individualHooks: true, 
      returning: true
    });
    await User.create({
      "first_name": "Lucifer",
      "last_name": "Jones",
      "username": "devious12",
      "email": "luciferjones@gmail.com",
      "password": "hellAwaits123"
    },{
      individualHooks: true, 
      returning: true
    });
    await User.create({
      "first_name": "Jesus",
      "last_name": "Christ",
      "username": "godly777",
      "email": "josechrist@gmail.com",
      "password": "blissfullJoy"
    },{
      individualHooks: true, 
      returning: true
    });
    await User.create({
      "first_name": "Ron",
      "last_name": "john",
      "username": "hackeroo",
      "email": "ronjohn@gmail.com",
      "password": "!@#$%^&*()_+"
    },{
      individualHooks: true, 
      returning: true
    });
    await User.create({
      "first_name": "Carlos",
      "last_name": "santana",
      "username": "MasterBlaster",
      "email": "carlossanta@gmail.com",
      "password": "boom12345"
    },{
      individualHooks: true, 
      returning: true
    });
    await User.create({
      "first_name": "Fred",
      "last_name": "wheeler",
      "username": "TheWitcher",
      "email": "wheelerfred@gmail.com",
      "password": "niceshow1"
    },{
      individualHooks: true, 
      returning: true
    });


    await Post.bulkCreate(postSeeds, {
        returning: true
    }); 

    await Comment.bulkCreate(commentSeeds, {
        returning: true
    }); 

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDatabase();