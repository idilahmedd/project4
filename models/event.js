// Don;t forget to use the ES6 import syntax
const mongoose = require ('mongoose');
const { Schema } = require ('mongoose');

const eventsSchema = new Schema({
   facebookId: {
      type: Number,
      required: [true, 'You need to have a profile id']
   },
   name: {
      type: String,
      required: [true, 'You need to have a name']
   },
   startTime: {
      type: Date,
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
         place: ret.place
      }
      return returnJson;
   }
})

module.exports = mongoose.model('Events', eventsSchema);
