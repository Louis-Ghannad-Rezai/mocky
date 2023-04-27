
import express from 'express'
import mongoose  from "mongoose";
import bodyParser from "body-parser"
import {handleUserRequest} from "./controllers/userController.js"
import {generateAuth} from './services/utils.js';
import { handlePoliciesRequest } from './controllers/policiesController.js';



let app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = express.Router();
const env = process.env.NODE_ENV || '';

if (env === 'local' || env === 'test') {
  process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/mocky'
} else {
  process.env.MONGODB_URI = 'mongodb://mongo:27017/mocky'
}
mongoose.set('strictQuery',true);
mongoose.connect(process.env.MONGODB_URI);

//Router that handle of the request that will return an User or an array of User
router.get("/user", async function(req,res){
    handleUserRequest(req,res);
})


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
  handlePoliciesRequest(req,res);
})

app.listen(3000, async function () {
  console.log("App up and runnning, listening on port 3000")
});
app.use(router);
