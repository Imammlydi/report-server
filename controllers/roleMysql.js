const RoleModel =  require('../models/roleMysql')

module.exports ={
    createRole   :async (req,res) =>{
        try {
            const {role} = req.body
            const datas = {
             
                role:role,
              
            }
            await RoleModel.create(req.body);
            res.json({
                'status': 201,
                'data': datas
            })
        } catch (error) {
            console.log('nya ....',error)
        }
    },
    
}