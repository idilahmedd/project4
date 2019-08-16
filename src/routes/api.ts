import express from 'express';
const router = express.Router();
import User from '../models/user';
import axios from 'axios';

// router.get('/:id/repos', (req, res) => {
//    let config = {
//       headers: {
//          'Authorization': `Bearer ${req.user.accessToken}`,
//          'User-Agent': 'Idil-OAuth-boilerplate'
//       }
//    }
//    axios.get(`https://api.github.com/user/repos`, config)
//    .then((response) => {
//       res.json(response.data)
//    }).catch((err) => {
//       console.log(err);
//    })
// })

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
})

export default router;