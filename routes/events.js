const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');
const axios  = require('axios');


//GET - all events-
router.get('/', (req, res) => {
   // console.log("hello?");
   Event.find({}, function(err, events) {
      if (err) res.json(err)
      res.json(events)
   })
})
//GET - get/show one event-
router.get('/:eid', (req, res) => {
   console.log("Getting event data for", req.params.eid)
   // console.log(req.user._id);
   Event.findById(req.params.eid), function (err, event) {
      if (err) res.json(err)
      console.log(event)
      console.log(err)
      res.json(event)
   }
})
//POST - create a job--working
router.post('/', (req, res) => {
   console.log("Backend post route")
   Event.create({
      facebookId: req.body.facebookId,
      name: req.body.name,
      startTime: req.body.startTime,
      location: req.body.location,
      place: req.body.place,
      description: req.body.description
   }, function (err, event) {
      res.json(event)
      console.log("created event!")
   })
})
//PUT /jobs/:id -- update a job
router.put('/:eid', (req, res) => {
   Event.findByIdAndUpdate(
      req.params.eid,
      {
         $set: {
            facebookId: req.body.facebookId,
            name: req.body.name,
            startTime: req.body.startTime,
            location: req.body.location,
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

module.exports = router;