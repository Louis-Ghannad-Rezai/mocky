

import { getByUserId,getByUserName,  getUserByPoliciesId } from '../services/user.js';
import {isAdmin} from '../services/utils.js';

export async function  handleUserRequest(req,res){
    if (req.query.id){
        let val = await  getByUserId(req?.query?.id);
          if (val != 1){
            res.status(200).send(val);
          }else
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
}