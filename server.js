const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const hbs = exphbs.create({});

const sess = {
  secret: 'i am not a programmer',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


const port = process.env.PORT || 5002;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


// turn on routes
app.use(routes);

// turn on connection to db and serve
sequelize.sync({ force: false }).then(() => {
  app.listen(port, () => console.log('Now listening'));
});
