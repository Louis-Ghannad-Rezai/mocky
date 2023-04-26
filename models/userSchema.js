import mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  id: String, // String is shorthand for {type: String}
  name: String,
  email: String,
  role: String
});
 
export const userModel = mongoose.model('User', userSchema);