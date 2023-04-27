
import express from 'express'
import mongoose  from "mongoose";
import bodyParser from "body-parser"
import fs from 'fs'
let app = express();


import { getByUserId,getByUserName,  getUserByPoliciesId } from './services/user.js';
import { userModel } from './models/userSchema.js';
import { policiesModel } from './models/policiesSchema.js';
import { getPoliciesByUserName} from './services/policies.js'
import {isAdmin,generateAuth} from './services/utils.js';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = express.Router();
//await mongoose.connect('mongodb://mongo:27017/mocky');

const env = process.env.NODE_ENV || '';

if (env === 'local' || env === 'test') {
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/mocky'
} else 
{
  process.env.MONGODB_URI = 'mongodb://mongo:27017/mocky'
}
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI);



//Router that handle of the request that will return an User or an array of User
router.get("/user", async function(req,res){

  if (req.query.id){
    let val = await  getByUserId(req?.query?.id);
      if (val != 1){
        res.status(200).send(val);
      } else
        res.sendStatus(204);
  }
  else if (req?.query?.name){
      let val = await getByUserName(req?.query?.name);
      if (val != 1){
        res.status(200).send(val);
      } else
        res.sendStatus(204);
  }
    else if (req.query.policiesId){
      if (await isAdmin(req?.query?.token) == 0){
            res.sendStatus(401);
      }
      else {
        let val =  await getUserByPoliciesId(req?.query?.policiesId);
      if (val != 1){
        res.status(200).send(val);
      } else
        res.sendStatus(204);
  }}
})


//
router.post("/auth", async function(req,res){
  let username = req?.body?.name;
  let token = await generateAuth(username);
  if (token == 1){
    res.status(204).send("authentification failed");
  }
  else
    res.status(201).send(token);
})


router.get("/policies", async function(req,res){

  if (await isAdmin(req.query.token) == 0){
    
    res.sendStatus(401)
  }
  else{
    if (req.query.name){
    let val =  await getPoliciesByUserName(req.query.name);
    res.status(200).send(val)
    }

   }
}
)

app.listen(3000, async function () {
});
app.use(router);
