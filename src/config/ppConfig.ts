import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
//import passportGithub2 from 'passport-github2';
import passportFacebook from 'passport-facebook';
//const GithubStrategy = passportGithub2.Strategy
const FacebookStrategy = passportFacebook.Strategy
import User from '../models/user';

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
   callbackURL: "http://localhost:3000/auth/facebook/callback",
   enableProof: true
   },
   // function (accessToken, refreshToken, profile, cb) {
   //    User.findOrCreate({ facebookId: profile.id }, function (err, user) {
   //       return cb(err, user);
   //    });
   // }
   function (accessToken, refreshToken, profile, cb) {
      console.log('get info back from facebook.')
      User.findOne({
         facebookId: profile.id
      }, (err, user) => {
         if (!user) {
            User.create({
               facebookId: profile.id
            }, (err, user) => {
               return cb(null, { ...user.toObject(), accessToken })
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
export default passport