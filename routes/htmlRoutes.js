var { ensureAuthenticated } = require('../config/auth');

module.exports = function(app, passport, db) {
  // Load index page
  app.get("/", function(req, res) {
    db.Litty.findAll({}).then(function(dbLittys) {
      res.render("index", {
        msg: "Welcome!",
        litty: dbLittys,
        name: req.user[0].dataValues.email
      });
    });
  });
  // Login Page
  app.get("/users/login", function (req, res) {
    res.render("login", {msg: req.flash('error')})
  });
  // Register Page
  app.get("/users/register", function (req, res) {
    res.render("register")
  });
  // Register Handle
  app.post("/users/register", function (req, res) {
    var { name, email, password, password2 } = req.body;
    
    // Check passwords match
    if(password !== password2) {
      res.render("register", {msg:"** Passwords do not match **"});
    }
    
     else {
      // Validation Passed
      db.Users.findOne({ where: { email: email }})
        .then(function(user) {
          if(user) {
           //User Exists
           res.render("register",
           {msg:"** Email already registered **"});

          } else {
            var newUser = new db.Users({
              name,
              email,
              password
            });
            
            newUser.save()
              .then(function(user) {
                res.render('register', { msg: "You have been registered and can now log in. Lit fam." });
              })
              .catch(function(err) {
                console.log(err);
              });

            console.log("New user was created", + newUser.name)
            // res.send("hello");
          }
        });
    }

  });

  // Login
  app.post('/users/login',
    passport.authenticate('local', {
      successRedirect: '/dashboard',
      failureRedirect: '/users/login',
      failureFlash: 'Invalid email or password.'
    })
  );

  // Logout
  app.get('/logout', function(req, res){
    req.logout();
    // create message or logout page
    res.redirect('/users/login');
  });

  // Dashboard
  app.get('/dashboard', ensureAuthenticated, function(req, res) {
  // That took a minute to figure out  
  // console.log(req.user[0].dataValues.email);
  res.render('dashboard', { name: req.user[0].dataValues.name })
  });


  // Load Litty page and pass in an Litty by id
  app.get("/litty/:id", function(req, res) {
    db.Litty.findOne({ where: { id: req.params.id } }).then(function(dbLitty) {
      res.render("Litty", {
        litty: dbLitty
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
