export async function handlePoliciesRequest(req,res){
    if (await isAdmin(req.query.token) == 0){
    
        res.sendStatus(401)
    }
    else {
        if (req.query.name){
            let val =  await getPoliciesByUserName(req.query.name);
            res.status(200).send(val)
            }
        }      
    
}