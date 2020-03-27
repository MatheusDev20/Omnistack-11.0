const connection = require('../database/connection')
module.exports = {
    async login(req,res){
        const { id } = req.body
        if(!id){
            return res.status(400).json({
                status:"400",
                message: "Bad request id is necessary"
            })
        }
        const user = await connection('users').where('id', id).select('name').first()

        if(!user){
            return res.select(400).json({
                Error:"No users found with this ID"
            })
        }
        return res.status(200).json({
            status:"200",
            message: "Succesufull login"
        })
}
}
