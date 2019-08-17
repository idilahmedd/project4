// Don;t forget to use the ES6 import syntax
const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
   facebookId: {
      type: Number,
      required: [true, 'You need to have a profile id']
   },
   user_name: {
      type: String,
      required: [true, 'You need to have a name']
   },
   user_birthday: {
      type: Date,
      required: [true, 'You need to have a birthday']
   },
   user_email: {
      type: String,
      required: [true, 'You need to have an email']
   },
   events: [{
      type: mongoose.Schema.Types.ObjectId,
      ret: 'Events'
   }]
})

userSchema.set('toObject', {
   transform: function(doc, ret, options) {
      let returnJson = {
         _id: ret._id,
         facebookId: ret.facebookId,
         user_name: ret.user_name,
         user_birthday: ret.user_birthday,
         user_email: ret.user_email,
         events: ret.events
      }
      return returnJson;
   }
})

module.exports = mongoose.model('User', userSchema);
