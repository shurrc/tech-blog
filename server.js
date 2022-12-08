const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { strict } = require('assert');
const clog = require('./middleware/clog');
const sequelize = require('./config/connection');
const {formatDate, isEqual} = require('./utils/helpers'); 
const routes = require('./controllers'); 



const app = express();
const PORT = process.env.PORT || 3001;

// Creates a session object and saves in sequelize
const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 5 * 60 * 1000,   // expires in 5 minutes
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
// use session middleware
app.use(session(sess));

// create handlebars view engine
app.engine('hbs', exphbs(      // name the engine 'hbs'
  {
    defaultLayout: 'main',     // set the default layout ot be main.hbs
    extname: '.hbs',           // set the extensions to end in .hbs instead of .handlebars
    helpers: {
      formatDate,  // helper to convert and format UTC date
      isEqual      // helper to check whether 2 values are equal
    }
  }
));
app.set('view engine', 'hbs'); // register view engine

// the standard trio
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// out logger middleware
app.use(clog);

// all routes get intercepted here
app.use(routes);

// start up the database and node server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, ()=>{
    console.log(`Server has started... Listening on http://localhost:${PORT}/`);
    console.log('Time:', Intl.DateTimeFormat('en-US',{dateStyle: 'long', timeStyle: 'long'}).format(new Date()));
  })
});
