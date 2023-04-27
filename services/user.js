import { userModel } from "../models/userSchema.js";
import {tokenModel} from "../models/tokenSchema.js"
import { policiesModel } from "../models/policiesSchema.js";
import { generateToken, generateDate } from "./utils.js";




export async function getByUserId(idUser){
    
    let user =  await userModel.findOne({id : idUser})
    if (user){
        return user;     
    }
    console.log("No user found with the id :" + idUser)
   return 1;
}

export async function getByUserName(nameUser){

    let user =  await userModel.findOne({name : nameUser})
    if (user){
        return user;     
    }
    console.log("No user found with the id :" + nameUser)
   return 1;
}

export async function generateAuth(username){
    let user =  await userModel.findOne({name : username})
    let tokenValue = await generateToken();
    let date = await generateDate();
    let role = user?.role;

    let token = new tokenModel({"token":tokenValue,"role":role,"date":date})
    await token.save();
    return token.token;

}

export async function getUserByPoliciesId(policiesId){
    let policie = await policiesModel.findOne({id : policiesId});
    if (policie != null){
        let user = userModel.findOne({id : policie.clientId})
        if (user != null){
            return user;
        }
    }

}