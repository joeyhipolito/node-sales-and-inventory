module.exports = function (app, passport) {

  // home
  app.get('/', function (req, res) {
    res.render('index');
  });

  // authentication
  var auth = require('../controllers/auth');
  app.post('/register', passport.authenticate('register'), auth.register);
  app.post('/auth', passport.authenticate('login'), auth.login);
  app.delete('/auth', auth.logout);

  // purchase order

  var po = require('../controllers/purchase-order');
  app.post('/purchase-order', po.create);
  app.get('/purchase-order', po.query);
  app.get('/purchase-order/:id', po.get);
  app.put('/purchase-order/:id', po.update);
  app.delete('/purchase-order/:id', po.delete);

  // supplier
  var supplier = require('../controllers/supplier');
  app.get('/supplier', supplier.query);
  app.post('/supplier', supplier.create);
  app.get('/supplier/:id', supplier.get);
  app.put('/supplier/:id', supplier.update);
  app.delete('/supplier/:id', supplier.delete);

}

function isAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {return next()};

  res.status(401);
  res.json({error: 'you are not logged in!'});

}