const connection = require('../database/connection')
const crypto = require('crypto')


module.exports = {

    async getActionsList(req,res){
        const {page = 1} = req.
        const [count] = await connection('actions').count()
        const actions = await connection('actions')
        .join('users', 'users.id', '=', 'actions.user_id')
        .limit(5)
        .offset((page-1)*5)
        .select('*');
        res.header('X-Total-Count', count['count(*)'])
        return res.json(actions)
    },
    async create(req,res){
        const {title,description,value} = req.body
        const user_id = req.headers.authorization
        console.log(user_id)
        if(!user_id) {
            return res.status(401).send("No authentication")
        }
            if(typeof title == 'string' && typeof description == 'string' && typeof value == 'number'){
            const result = await connection('actions').insert({
                    title,
                    description,
                    value,
                    user_id
             })
             const id = result[0]
             return res.status(200).send(`Action created id:${id}`)
            } else{
                return res.status(400).send("Bad request")
            }
  },
  async deleteAction(req,res){
      const { id } = req.params
      const user_id = req.headers.authorization // Usuário que pertence essa ong
      const action_id = await connection('actions').where('id',id).select('id')
      if(action_id.length == 0){
        return res.status(400).json({
            status:"400",
            message:"Action does not exists"
        })
    }
      const actions = await connection('actions').where('id', id).select('user_id').first()

      if(user_id !== actions.user_id){
          return res.status(401).json({error: "Denied"})
      }
    await connection('actions').where('id',id).delete()
    return res.status(200).json({message:"Deleted",status:"200"})
    },
    async getUserActions(req,res){
        const {user_id} = req.params

        if(!user_id || user_id.length < 6){
            return res.status(400).json({
                status: "400",
                message: "Bad request"
            })
        }
        const id = await connection('users').where('id', user_id)
        if(id.length == 0){
            return res.status(400).json({
                status:"400",
                message: "User does not exists"
            })
        }
      const actions = await connection('actions').where('user_id', user_id).select('*')
      if(actions.length == 0){
          return res.status(200).json({
              status:"200",
              message:"There is no act"
            })
              
      }
      return res.status(200).json(actions)
    }
}
