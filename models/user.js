// Don;t forget to use the ES6 import syntax
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
   facebookId: {
      type: Number,
      required: [true, 'You need to have a profile id']
   },
   name: {
      type: String,
      required: [false, 'You need to have a name']
   },
   birthday: {
      type: Date,
      required: [false, 'You need to have a birthday']
   },
   email: {
      type: String,
      required: [false, 'You need to have an email']
   },
   events: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Events'
   }]
})

userSchema.set('toObject', {
   transform: function(doc, ret, options) {
      let returnJson = {
         _id: ret._id,
         facebookId: ret.facebookId,
         name: ret.name,
         birthday: ret.birthday,
         email: ret.email,
         events: ret.events
      }
      return returnJson;
   }
})

module.exports = mongoose.model('User', userSchema);
