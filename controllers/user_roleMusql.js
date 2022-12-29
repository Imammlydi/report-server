const UserRoleModel =  require('../models/user_roleMysql')

module.exports ={
    createRole   :async (req,res) =>{
        try {
            const {userId,roleId} = req.params
            const datas = {
             
                userId:userId,
                roleId:roleId,
              
            }
            await UserRoleModel.create(req.params);
            res.json({
                'status': 201,
                'data': datas
            })
        } catch (error) {
            console.log('nya ....',error)
        }
    },
    
}