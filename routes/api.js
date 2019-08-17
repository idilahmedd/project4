const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');
const axios  = require('axios');



router.get('/user/events', (req, res) => {
   console.log('get event for user: ', req.user.facebookId)
   let config = {
      headers: {
         'Authorization': `Bearer ${req.user.accessToken}`
      }
   }

   axios.get(`https://graph.facebook.com/${req.user.facebookId}?fields=id,name,events`, config).then(response => {
      res.json(response.data);
   })
   axios.get()
})
//POST - create a event--

router.post('/user/events', (req, res) => {
   console.log(req.params.id)
   // User.findById(req.params.id, function (err, user) {
   //    console.log("THIS IS THE USER:", user)
      Event.create({
         location: req.body.location,
         name: req.body.name,
         startTime: req.body.startTime,
         place: req.body.place,
         description: req.body.description
      }, function (err, event) {
         console.log(event)
         user.events.push(event)
         user.save(function(err, user){
            if (err) res.json(err)
            res.json(user)
         })
      })
   // })
})

module.exports = router;