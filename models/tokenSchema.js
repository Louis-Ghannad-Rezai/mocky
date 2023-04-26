import mongoose from 'mongoose';

export const tokenSchema = new mongoose.Schema({
  token: String, // String is shorthand for {type: String}
  role: String,
  date: String
});
 
export const tokenModel = mongoose.model('tokens', tokenSchema);