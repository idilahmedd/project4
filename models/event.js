// Don;t forget to use the ES6 import syntax
const mongoose = require ('mongoose');
const { Schema } = require ('mongoose');

const eventsSchema = new Schema({
   name: {
      type: String,
      required: [true, 'You need to have a name']
   },
   startTime: {
      type: String,
      required: [true, 'You need to have a start time']
   },
   location: {
      type: String,
      required: [true, 'You need to have a location']
   },
   description: {
      type: String,
      required: [true, 'You need to have a description']
   },
   place: {
      type: String
   },
   user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }
})

eventsSchema.set('toObject', {
   transform: function(doc, ret, options) {
      let returnJson = {
         _id: ret._id,
         facebookId: ret.facebookId,
         name: ret.name,
         startTime: ret.startTime,
         location: ret.location,
         place: ret.place,
         description: ret.description
      }
      return returnJson;
   }
})

module.exports = mongoose.model('Events', eventsSchema);
