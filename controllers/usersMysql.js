const UserModel =  require('../models/usersMysql');
const InspectorModel= require('../models/inspectorMysql');
const UserRole= require('../models/user_roleMysql');
const Role= require('../models/roleMysql');
const bcrypt = require('bcryptjs');


UserModel.hasMany(InspectorModel, { as: "inspector" });
InspectorModel.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "user" 
});
UserModel.hasMany(UserRole, { as: "roles" });
UserRole.belongsTo(UserModel, {
  foreignKey: "userId",
  as: "users" 
});
Role.hasMany(UserRole, { as: "a_role" });
UserRole.belongsTo(Role, {
  foreignKey: "roleId",
  as: "rolex" 
});
module.exports ={
    registerUsers   :async (req,res) =>{
        const salt = await bcrypt.genSalt(10);
        try {
            const {name,email,password} = req.body
            const hashedPassword = await bcrypt.hash(password, salt);
            const datas = {
             
                name:name,
                email:email,
                password:hashedPassword
            }
            await UserModel.create(datas);
            res.json({
                'status': 201,
                'data': datas
            })
        } catch (error) {
            console.log('nya ....',error)
        }
    },
    getUsers   :async (req,res) =>{
        try {
            const user = await UserModel.findAll({include:['inspector','roles']});
            res.json({
                'status': 200,
                'data': user
            })
            console.log('nya ....',user)
        } catch (err) {
            console.log(err);
        }
    },
    updateUsers   :async (req,res) =>{
        try {
            const {name,email,password} = req.body
            const datas = {
             
                name:name,
                email:email,
                password:password
            }
            await UserModel.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.json({
                'status': 201,
                'data': datas
            })
        } catch (error) {
            console.log('nya ....',error)
        }
    },
    deleteUsers   :async (req,res) =>{
        try {
          
            await UserModel.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.json({
                data:'Berhasil di delete'
            })
        } catch (error) {
            console.log('nya ....',error)
        }
    },
}