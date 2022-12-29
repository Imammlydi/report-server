
  const UserModel = require('../models/usersMysql');
  const bcrypt = require('bcryptjs')
  const jwt = require('jsonwebtoken');
  const Role= require('../models/roleMysql');


//   UserModel.hasMany(UserRole, { as: "roles" });
// UserRole.belongsTo(UserModel, {
//   foreignKey: "userId",
//   as: "users" 
// });
  module.exports ={

      actionSignIn: async (req,res) =>{
        try {
            const { email, password } = req.body;
            const user = await UserModel.findOne({ where: { email: email },include:['roles'] });
            if (!user | undefined | null) {
            
              res.json({
                'status': 401,
                'data': "Email tidak terdaftar"
            })
            // res.status(401).json({
            //       'status': 401,
            //       'data': "Email tidak terdaftar"
            //   })
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch | undefined | null) {

            //   res.json({
            //     'status': 401,
            //     'data': "Password Salah"
            // })
            res.statusCode = 404
            }
            if(user && isPasswordMatch) {
              const roleID = user.roles[0].roleId;
              const thisRole = await Role.findOne({where: { id: roleID }});
              console.log('-----------',thisRole.role)
              
              const SCRET_KEY = "reportscret"
              const token = jwt.sign({id: user.id, role:thisRole.role}, SCRET_KEY, { expiresIn: 200 });
              console.log(token)
              // res.header('auth_token',token).json({
              //     token:token
              // });
              res.json({
                  token:token
              });
            }
           
    
        } catch (error) {
    
                console.log('ERROROOO', error.message,req.session.user, '---')
            res.json({
                'status': 401,
                'data': error
            })
        }
    },
  }