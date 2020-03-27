const {} = require('../utils/util')
const crypto = require('crypto')
const connection = require('../database/connection')

module.exports = {
async createUser(req,res){
    const {name,email,whatsapp,city,uf} = req.body
    const id = crypto.randomBytes(6).toString('HEX')
    if(typeof name == "string" && typeof email == "string" && typeof city == "string" && typeof uf =="string")
    {
        if(uf.length <= 2){
            await connection('users').insert({
                id,
                name,
                email,
                whatsapp,
                city,
                uf
            })
        } else return res.status(400).send("Only the two characters for UF, Ex: MG (Minas Gerais)")
   }else {
        return res.status(400).send("Name,email,city and UF should be string values")
    }
return res.json({id})
},
async getUsersList(req,res){
        const users = await connection('users').select('*')
        return res.json(users)
}
}