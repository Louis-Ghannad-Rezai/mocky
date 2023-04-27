
import { tokenModel } from "../models/tokenSchema.js";
import { userModel } from "../models/userSchema.js";



export async function generateToken(){
    return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}


export async function generateDate(){

    var date = new Date();
    date.setDate(date.getDate() + 1);
    return date;

}


export async function generateAuth(username){
    let user =  await userModel.findOne({name : username})
    if (user != null){
    let tokenValue = await generateToken();
    let date = await generateDate();
    let role = user?.role;

    let token = new tokenModel({"token":tokenValue,"role":role,"date":date})
    await token.save();
    return token.token;
    }
    console.log("test")
    return 1;
}


//check if the token used for the request have admin rights
// params : String Token.
export async function isAdmin(tokenToCheck){
    console.log("Checking if the token is an admin token")
    let checkToken = await tokenModel.findOne({token : tokenToCheck})
    if (checkToken?.role == "admin" && valideDate(checkToken?.date)){
        console.log("Iit is an admin token")
        return 1;
    }
    console.log("User does not have the right to perfom this request");
    return 0;

}

//check if the token is still valide
// params : Date date 
async function valideDate(date){
if (date > new Date())
    return 0;
    return 1;
}