
import { getPoliciesByUserName} from '../services/policies.js'
import {isAdmin} from '../services/utils.js';


export async function handlePoliciesRequest(req,res){
    if (await isAdmin(req.query.token) == 0){
    
        res.sendStatus(401)
    }
    else {
        if (req?.query?.name){
            let val =  await getPoliciesByUserName(req?.query?.name);
            if (val != []){
            res.status(200).send(val)
            }
        else
            res.status(204).send("No user found with the username")
        }

        }      
    
}