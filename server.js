require("dotenv").config();
var express = require("express");
let socket = require('socket.io')
var exphbs = require("express-handlebars");

var sequelize = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
sequelize.sync(syncOptions).then(function() {
  let server = app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });

  //socket connection established
  let io = socket(server);
  io.on('connection', (socket) =>{
    console.log('made socket connection', socket.id);
    
    socket.on('chat', (data)=>{
      io.sockets.emit('chat', data);
    });

    socket.on('typing', (data)=>{
      socket.broadcast.emit('typing', data)
    })
  })
});

module.exports = app;
