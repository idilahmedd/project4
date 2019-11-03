const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
//const passportGithub2 = ('passport-github2';
const passportFacebook = require('passport-facebook');
//const GithubStrategy = passportGithub2.Strategy
const FacebookStrategy = passportFacebook.Strategy
const User = require('../models/user');

// passport.use(new GithubStrategy({
//    clientID: process.env.GITHUB_CLIENT_ID,
//    clientSecret: process.env.GITHUB_CLIENT_SECRET,
//    callbackURL: "http://localhost:3000/auth/github/callback"
// },

//    function (accessToken, refreshToken, profile, cb) {
//       User.findOne({
//          githubId: profile.id
//       }, (err, user) => {
//          if (!user) {
//             User.create({
//                githubId: profile.id
//             }, (err, user) => {
//                return cb(null, { ...user.toObject(), accessToken })
//             })
//          } else {
//             return cb(null, { ...user.toObject(), accessToken })
//          }
//       })
//    }))

passport.use(new FacebookStrategy({
   clientID: process.env.FACEBOOK_APP_ID,
   clientSecret: process.env.FACEBOOK_APP_SECRET,
   callbackURL: "http://kause/herokuapp.com/auth/facebook/callback",
   enableProof: true
   },
   // function (accessToken, refreshToken, profile, cb) {
   //    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
   //       return cb(err, user);
   //    });
   // }
   function (accessToken, refreshToken, profile, cb) {
      console.log('get info back from facebook.', profile)
      User.findOne({
         facebookId: profile.id,
         name: profile.displayName,
         birthday: profile.birthday,
         email: profile.email
      }, (err, user) => {
         console.log("FIND ERR", err)
         if (!user) {
            User.create({
               facebookId: profile.id,
               name: profile.displayName,
               birthday: profile.birthday,
               email: profile.email,
               events: profile.events
            }, (err, user) => {
               console.log('ERR',err)
               console.log("USER CREATE", user)
               return cb(null, { ...user, accessToken })
            })
         } else {
            console.log('we find user: ', user)
            return cb(null, { ...user.toObject(), accessToken })
         }
      })
}))

passport.serializeUser(function (user, cb) {
   cb(null, user);
})
passport.deserializeUser(function (obj, cb) {
   cb(null, obj);
})

module.exports = passport