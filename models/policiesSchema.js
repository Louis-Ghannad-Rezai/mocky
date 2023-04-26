import mongoose from 'mongoose';
import { serializeInteger } from 'whatwg-url';

export const policiesSchema = new mongoose.Schema({
  id: String, // String is shorthand for {type: String}
  amountInsured: Number,
  email: String,
  inceptionDate: String,
  installmentPayment: Boolean,
  clientId: String
});
 
export const policiesModel = mongoose.model('policies', policiesSchema);