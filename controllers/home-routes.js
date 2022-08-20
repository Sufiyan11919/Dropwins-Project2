const router = require('express').Router();


router.get('/', (req, res) => {
  res.render('homepage');
  console.log(req.session);
});

router.get('/login', (req, res) => {
  // //if (req.session.loggedIn) {
  //   res.redirect('/');
  //   return;
  // }

  res.render('login');
});

router.get('/contact', (req,res)=>{
  res.render('contact')
})

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }
  else {
    res.status(404).end();
  }
});

router.get('/mainpage', (req,res)=>{
  res.render('mainpage')
})
router.get('/mainpage_loggedin', (req,res)=>{
  res.render('mainpage_loggedin')
});

router.get('/nike', (req,res)=>{
  res.render('nike')
})




router.get('/redirect', (req,res)=>{
  res.render('redirected')
})


module.exports = router;