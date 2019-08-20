const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');
const axios  = require('axios');



router.get('/events', (req, res) => {
   console.log(req.user.facebookId)
   console.log('get event for user: ', req.user.facebookId)
   let config = {
      headers: {
         'Authorization': `Bearer ${req.user.accessToken}`
      }
   }

   axios.get(`https://graph.facebook.com/${req.user.facebookId}?fields=id,name,events,birthday,email`, config).then(response => {
      console.log('get data back: ', response.data.events)
      res.json(response.data);
   })
   //axios.get()
})

// //GET- get all events associated with that user
router.get("/:uid/events", (req, res) => {
   User.findById(req.params.uid).populate('events').exec((err, user) => {
      console.log("User at get assoc. events",user);
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
         console.log("THis is POST newEVENT",event)
         user.events.push(event)
         user.save(function(err, user){
            if (err) res.json(err)
            res.json(user)
         })
      })
   })
})
//PUT /events/:id -- update a job
router.put('/:eid', (req, res) => {
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
router.delete("/:eid", (req, res) => {
   Event.findByIdAndRemove(req.params.eid, function (err) {
      if (err) res.json(err)
      res.json({ message: "DELETED!!" })
   })
});

module.exports = router;