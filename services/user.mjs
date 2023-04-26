


import { userModel } from "../models/userSchema.js";
import {tokenModel} from "../models/tokenSchema.js"
import { policiesModel } from "../models/policiesSchema.js";
import { generateToken, generateDate } from "./utils.js";
export async function getByUserId(idRequest){

    console.log("request user for id : " + idRequest);
   let user =  await userModel.find({id : idRequest})
    return user;
}

export async function getByUserName(nameRequest){

    console.log("request user for name : " + nameRequest);

    let user =  await userModel.find({name : nameRequest})
    return user;
}

export async function generateAuth(username){
    let user =  await userModel.findOne({name : username})
    console.log(user)
    let tokenValue = await generateToken();
    let date = await generateDate();
    let role = user?.role;
    console.log(role)

    let token = new tokenModel({"token":tokenValue,"role":role,"date":date})
    await token.save();
    return token.token;

}

export async function isAdmin(tokenToCheck){
    console.log(tokenToCheck)
    let checkToken = await tokenModel.findOne({token : tokenToCheck})
    if (checkToken?.role == "admin"){
        return 1;
    }
    return 0;
}

export async function getUserByPoliciesId(policiesId){
    console.log(policiesId)
    let policie = await policiesModel.findOne({id : policiesId});
    if (policie != null){
        let user = userModel.findOne({id : policie.clientId})
        if (user != null){
            console.log(user);
            return user;
        }
    }

}