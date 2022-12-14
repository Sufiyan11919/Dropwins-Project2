const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  // When the user logs out, destroy the session
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;

































// const router = require('express').Router();
// const { User } = require('../../models');

// // GET /api/users
// router.get('/', (req, res) => {
//     // Access our User model and run .findAll() method)
//     User.findAll({
//       attributes: { exclude: ['password']}
//     })
//       .then(dbUserData => res.json(dbUserData))
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

// // GET /api/users/1
// router.get('/:id', (req, res) => {
//   User.findOne({
//     attributes: { exclude: ['password'] },
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(dbUserData => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

//   router.post('/', (req, res) => {
//     User.create({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password
//     })
//     .then(dbUserData => {
//       req.session.save(() => {
//         req.session.user_id = dbUserData.id;
//         req.session.username = dbUserData.username;
//         req.session.loggedIn = true;
    
//         res.json(dbUserData);
//       });
//     })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });


//   router.post('/login', (req, res) => {
//     User.findOne({
//       where: {
//         email: req.body.email
//       }
//     }).then(dbUserData => {
//       if (!dbUserData) {
//         res.status(400).json({ message: 'No user with that email address!' });
//         return;
//       }
  
//       const validPassword = dbUserData.checkPassword(req.body.password);
  
//       if (!validPassword) {
//         res.status(400).json({ message: 'Incorrect password!' });
//         return;
//       }
  
//       req.session.save(() => {
//         // declare session variables
//         req.session.user_id = dbUserData.id;
//         req.session.username = dbUserData.username;
//         req.session.loggedIn = true;
  
//         res.json({ user: dbUserData, message: 'You are now logged in!' });
//       });
//     });
//   });
  
// // PUT /api/users/1
// router.put('/:id', (req, res) => {
//     User.update(req.body, {
//       individualHooks: true,
//       where: {
//         id: req.params.id
//       }
//     })
//       .then(dbUserData => {
//         if (!dbUserData[0]) {
//           res.status(404).json({ message: 'No user found with this id' });
//           return;
//         }
//         res.json(dbUserData);
//       })
//       .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//       });
//   });

// // DELETE /api/users/1
// router.delete('/:id', (req, res) => {
//   User.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(dbUserData => {
//       if (!dbUserData) {
//         res.status(404).json({ message: 'No user found with this id' });
//         return;
//       }
//       res.json(dbUserData);
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json(err);
//     });
// });

// module.exports = router;