import express from 'express';
const router = express.Router();
import passport from '../config/ppConfig';


// //GET /auth/github -displays the GH login page
// router.get('/github', passport.authenticate('github'));

// //GET /auth.github/callback - callback URL tthat recieves the token
// router.get('/github/callback',
//    passport.authenticate('github', { failureRedirect: '/auth/login' }),
//    (req, res) => {
//       //Successful authentication 
//       console.log('THIS IS THE GITHUB USER:', req.user);
//       res.render('success', { user: req.user });
//    })

//GET /auth/facebook -displays the FB login page
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback',
   passport.authenticate('facebook', { failureRedirect: '/' }),
   function (req, res) {
      console.log('we authenticate our user: ', req.user)
      // Successful authentication, redirect home.
      res.render('success', { user: req.user });
   });
router.get('/login/facebook',
   passport.authenticate('facebook', {
      scope: ['publish_actions', 'user_feed','user_events','user_friends','user_likes','publish_to_groups']
   }
   ));
export default router;