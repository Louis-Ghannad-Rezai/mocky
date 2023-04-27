import mongoose from 'mongoose';

export const policiesSchema = new mongoose.Schema({
  id: String, // String is shorthand for {type: String}
  amountInsured: Number,
  email: String,
  inceptionDate: String,
  installmentPayment: Boolean,
  clientId: String
});
 
export const policiesModel = mongoose.model('policie', policiesSchema);

