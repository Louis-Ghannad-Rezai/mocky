
import bodyParser from 'body-parser'
import express from 'express'
import mongoose  from "mongoose";

let app = express();

//const User = require("../services/user.mjs")

import { getByUserId,getByUserName,generateAuth, isAdmin, getUserByPoliciesId } from './services/user.mjs';
import { getPoliciesByUserName} from './services/policies.js'
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = express.Router();
await mongoose.connect('mongodb://127.0.0.1:27017/mocky');




// Get user data filtered by user id
/*
* Get User data by id or name
* 
*
*/
router.get("/user", async function(req,res){

if (req.query.id){
 let val = await  getByUserId(req.query.id);
  res.send(val);
}
else if (req.query.name){
  let val = await getByUserName(req.query.name);
    res.send(val);
  }
  else if (req.query.policiesId){
    if (await isAdmin(req.query.token) == 0){
    
      res.sendStatus(401)
      return 0;
    }
    else{
    let val =  await getUserByPoliciesId(req.query.policiesId)
    res.send(val);
  }}
}

)

router.post("/auth", async function(req,res){
  let username = req.body.name;
  let token = await generateAuth(username);
  res.send(token);
})


router.get("/policies", async function(req,res){

  if (await isAdmin(req.query.token) == 0){
    
    res.sendStatus(401)
    return 0;
  }
  else{
    if (req.query.name){
    let val =  await getPoliciesByUserName(req.query.name);
     res.send(val)}
  // }
  // else if (req.query.name){
  //   let val =1// await getUserByPoliciesId(req.query.policiesId);
  //     res.send(val)
  //   }
   }
}
)


router.get("/", function (req, res) {
  res.send("Hello World!");
});


app.listen(3000, function () {
  console.log("Node server running on http://localhost:3000");
});

app.use(router);
