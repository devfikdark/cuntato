module.exports = (app) => {
  app.get('/', (req, res) => {
    res.header('Content-Type', 'text/html');
    res.render('index');
  });
  
  app.get('/profile', isLoggedIn, (req, res) => {
    res.header('Content-Type', 'text/html');
    res.render('profile' , {
      user: req.user
    });
  });
  
  app.get('/project', isLoggedIn, (req, res) => {
    res.header('Content-Type', 'text/html');
    res.render('project', {
      user: req.user
    });
  });

  // Logout common
  app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });
};

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) 
    return next();
  res.redirect('/');
}