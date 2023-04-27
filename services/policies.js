import { userSchema,userModel } from "../models/userSchema.js";
import { policiesModel } from "../models/policiesSchema.js";


//request all the policies link to an User by username
//params : String : username;
export async function getPoliciesByUserName(userName){

   let user =  await userModel.findOne({name : userName})
    if (user){
        let policies = await policiesModel.find({clientId : user?.id});
        if (policies == []){
            console.log("No policies found for the given username");
        }
        else
            return policies;
    }
    else {
        console.log(" No user found with the username");
        return [];
    }
}