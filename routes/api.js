const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');
const axios = require('axios');



// router.get('/events', (req, res) => {
//    console.log(req.user.facebookId)
//    console.log('get event for user: ', req.user.facebookId)
//    let config = {
//       headers: {
//          'Authorization': `Bearer ${req.user.accessToken}`
//       }
//    }
//    axios.get(`https://graph.facebook.com/${req.user.facebookId}?fields=id,name,events,birthday,email`, config).then(response => {
//       console.log('get data back: ', response.data.events)
//       res.json(response.data);
//    }).then(

//    )

// })


// axios.all([
//    axios.get(`https://graph.facebook.com/${User}?fields=id,name,events,birthday,email`),
//    router.get("/events"),
// ]).then(axios.spread((events1, events2) => {
//    console.log('FacebookEvents: ', events1.data);
//    console.log('UserEvents: ', events2.data);
//    res.status(200).json(user.events, response.data);
// }));

// axios.get('/events')
//    .catch(function (error) {
//       if (error.response) {
//          // The request was made and the server responded with a status code
//          // that falls out of the range of 2xx
//          console.log(error.response.data);
//          console.log(error.response.status);
//          console.log(error.response.headers);
//       } else if (error.request) {
//          // The request was made but no response was received
//          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
//          // http.ClientRequest in node.js
//          console.log(error.request);
//       } else {
//          // Something happened in setting up the request that triggered an Error
//          console.log('Error', error.message);
//       }
//       console.log(error.config);
// });
//OR DO THIS??
// function getUserAccount() {
//    return axios.get('/user/12345');
// }
// function getUserPermissions() {
//    return axios.get('/user/12345/permissions');
// }
// axios.all([getUserAccount(), getUserPermissions()])
//    .then(axios.spread(function (acct, perms) {
//       // Both requests are now complete
//    }));



//GET- get all events associated with that user
router.get("/events", (req, res) => {
   User.findById(req.params.id).populate('events').exec((err, user) => {
      console.log("User at get assoc. events", user);
      res.status(200).json(user.events);
   })
})

//POST - create a event--
router.post('/events', (req, res) => {
   console.log("THIS IS THE USER._id:", req.user._id)
   User.findById(req.user._id, function (err, user) {
      console.log("THIS IS THE USER:", user)
      Event.create({
         location: req.body.location,
         name: req.body.name,
         startTime: req.body.startTime,
         place: req.body.place,
         description: req.body.description
      }, function (err, event) {
         console.log("ERRRRR:   ", err)
         console.log("THis is POST newEVENT", event)
         user.events.push(event)
         user.save(function (err, user) {
            if (err) res.json(err)
            res.json(user)
         })
      })
   })
})
//PUT /api/:uid/events/:id -- update an event
router.put('/events/:eid', (req, res) => {
   Event.findByIdAndUpdate(
      req.params.eid,
      {
         $set: {
            location: req.body.location,
            name: req.body.name,
            startTime: req.body.startTime,
            place: req.body.place,
            description: req.body.description
         }
      },
      { new: true },
      function (err, event) {
         if (err) res.json(err)
         res.json(event)
      })
})

//DELETE -delete one event
router.delete("/event/:eid", (req, res) => {
   Event.findByIdAndRemove(req.params.eid, function (err) {
      if (err) res.json(err)
      res.json({ message: "DELETED!!" })
   })
});

module.exports = router;