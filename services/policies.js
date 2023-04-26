import { userSchema,userModel } from "../models/userSchema.js";
import { policiesModel } from "../models/policiesSchema.js";



export async function getPoliciesByUserName(userName){
    console.log("request policies for name : " + userName);

   let user =  await userModel.findOne({name : userName})
   if (user){
   console.log(user.id)

   let policies = await policiesModel.find({clientId : user.id})
   console.log(policies)
    return policies;
}
else {
    return []
}
}