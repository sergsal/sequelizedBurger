//initialize express
var express = require('express');
var app = express();
//requiring models folder
var models  = require('./models');
//extracting sequelize from models
var sequelizeConnection = models.sequelize;

var methodOverride = require('method-override');
var bodyParser = require('body-parser');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
	defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/burgers_controller.js');
//app.use('/', routes);

//setting up connection to the database
sequelizeConnection.query('SET FOREIGN_KEY_CHECKS = 0')


// a) sync our tables
.then(function(){
	return sequelizeConnection.sync({force:true})
})
.then(function(){
	app.use('/', routes);
})


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});