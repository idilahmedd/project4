const express = require('express');
const router = express.Router();
const passport= require('../config/ppConfig');



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

module.exports = router;