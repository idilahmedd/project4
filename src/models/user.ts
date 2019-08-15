// Don;t forget to use the ES6 import syntax
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
const userSchema = new Schema({
   facebookId: {
      type: Number,
      required: [true, 'You need to have a profile id']
   }
})

userSchema.set('toObject', {
   transform: function(doc, ret, options) {
      let returnJson = {
         _id: ret._id,
         facebookId: ret.facebookId
      }
      return returnJson;
   }
})
export default mongoose.model('User', userSchema);




