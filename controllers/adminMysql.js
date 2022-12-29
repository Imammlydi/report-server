const UserModel = require('../models/usersMysql');
const bcrypt = require('bcryptjs')
const Inspector = require('../models/inspectorMysql');
const Report = require('../models/reportMysql');
const Engineer = require('../models/engineerMysql');
const Role= require('../models/roleMysql');
const UserRole= require('../models/user_roleMysql');
const { Sequelize } =require ("sequelize");




// Engineer.hasMany(Inspector, { as: "inspectors" });
// Inspector.belongsTo(Engineer, {
//   foreignKey: "engineerId",
//   as: "engineers" 
// });
module.exports ={
    viewSignIn :(req,res) =>{
        try {
   
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus}
            
            if(req.session.user == null || req.session.user == undefined) {
                res.render('index' , {
                    alert,
                    title:'Staycation | Login'
                   } 
                    );
                    // console.log("-------------------- it is",req.session.user.id )
            }else {
                res.redirect('/admin/dashboard')
                
            }
            
        } catch (error) {
                req.flash('alertMessage', `${error.message}`);
                req.flash('alertStatus', 'danger');
                res.render('index' , {
                    // alert,
                    title:'Staycation | Login'
                   } 
                    );
        }
    },
    actionSignIn: async (req,res) =>{
        try {
            const { email, password } = req.body;
            
            const user = await UserModel.findOne({ where: { email: email }});
            
            
            
            if (!user ) {
              req.flash('alertMessage', 'User yang anda masukan tidak terdaftar!!');
              req.flash('alertStatus', 'danger');
              res.redirect('/admin/signin');
            }
            const user_r = await UserModel.findOne({ where: { email: email },include:['roles'] });
            const roleIDs =user_r.roles
            const admin = await Role.findOne({where: { role: 'admin' }})
            var found = false;
            for(var i = 0; i < roleIDs.length; i++) {
                if (roleIDs[i].roleId !== admin.id) {
                    found = true;
                    break;
                }
            }
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
              req.flash('alertMessage', 'Password yang anda masukan tidak cocok!!');
              req.flash('alertStatus', 'danger');
              res.redirect('/admin/signin');
            }
            if(found ) {
             
                // console.log('role tidak benar',roleIt.role)
                req.flash('alertMessage', 'Anda Bukan Admin');
                req.flash('alertStatus', 'danger');
                // await Sequelize.close();
                res.redirect('/admin/signin');
                
                
            }
      
          req.session.user ={
            id:user.id,
            email: user.email
          }
            res.redirect('/admin/dashboard')
            
            console.log('--------------------- apakah benar =',JSON.stringify(user.email))
            // console.log('--------------------- apakah benar =',found)
            // console.log('--------------------- this is',JSON.stringify(roleIDs))
        } catch (error) {
            console.log(error)
                
            // res.redirect('/admin/signin');
        }
    },
    actionLogout :async (req,res) =>{
        req.session.destroy();
        res.redirect('/admin/signin');
    },
    viewDashboard :async (req,res) =>{
        try {
            res.render(
                'admin/dashboard/view_dashboard', 
                {
                    title:'Staycation | Dashboard',
                    user: req.session.user,
                });
        } catch (error) {
            
        }
    },

    viewInspector : async (req,res) => {

        try {
            const inspector = await Inspector.findAll({include:['engineers','report']});
            const users = await UserModel.findAll();
            const engineer = await Engineer.findAll();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus}
            res.render('admin/inspector/view_inspector' , {
                inspector, 
                users,
                engineer,
                user: req.session.user,
                alert,
                title:'Staycation | inspector'} 
                );
                // console.log('sdfghjk',engineer)
        } catch (error) {
                // req.flash('alertMessage', `${err.message}`);
                // req.flash('alertStatus', 'danger');
                console.log(error)
            res.redirect('/admin/inspector');
        }
       
    },
    createInspector :async (req,res) =>{

        try {
            const {name,field,position,userId} = req.body
            const datas = {
             
                name:name,
                field:field,
                position:position,
                userId:userId,
                // engineerId:engineerId
            }
            await Inspector.create( req.body);
            req.flash('alertMessage', `Success Add inspector '${name}'   `);
            req.flash('alertStatus', 'success');
            res.redirect('/admin/inspector');
        } catch (error) {
            console.log('nya ....',error)
        }
      },
    updateInspector : async (req,res) => {

        try {
            const {id,name,field,position} = req.body
       
            const datas = {
             
                name:name,
                email:field,
                position:position
            }
            await Inspector.update(req.body, {
                where: {
                    id:id
                }
            });
            req.flash('alertMessage', `Success Update inspector '${name}'   `);
            req.flash('alertStatus', 'success');
            res.redirect('/admin/inspector');
        } catch (error) {
                req.flash('alertMessage', `${err.message}`);
                req.flash('alertStatus', 'danger');
                console.log(error)
            res.redirect('/admin/inspector');
        }
       
    },
    deleteInspector  :async (req,res) =>{
        try {
          
            await Inspector.destroy({
                where: {
                    id: req.params.id
                }
            });
            req.flash('alertMessage', `Success delete inspector '   `);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/inspector');
        } catch (error) {
            console.log('nya ....',error)
            // res.redirect('/admin/inspector');
        }
    },
    viewReport : async (req,res) => {

        try {
            const report = await Report.findAll({
                include:[
                    'inspector',
                    'image',
                    'workerHours',
                    'worker',
                    'weather',
                    'equipment',
                ]
            })
            // const alertMessage = req.flash('alertMessage');
            // const alertStatus = req.flash('alertStatus');
            // const alert = {message: alertMessage, status:alertStatus}
            res.render('admin/report/view_report' , {
                report, 
                user: req.session.user,
                // alert,
                title:'Staycation | report'} 
                );
                for(let i = 0; i < report.length; i++){
                    for(let x = 0; x < report[i].workerHours.length; x++){

                        console.log('------------- the loop',{
                            id: JSON.stringify(report[i].workerHours[x].id),
                            name :JSON.stringify(report[i].workerHours[x].working_name)
                        })
                    }
                }
                console.log('------------- the loop',JSON.stringify(report))
        } catch (error) {
                // req.flash('alertMessage', `${err.message}`);
                // req.flash('alertStatus', 'danger');
            res.redirect('/admin/report');
        }
       
    },
    view_detail_report : async (req,res) => {

        try {
            const {id} = req.params
            const report = await Report.findAll({where: { id: id } ,include:['inspector','image']});
           
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus}
            res.render('admin/report/show_detail_report' , { 
                report,
                // role_id,
                // users,
                user: req.session.user,
                alert,
                title:'Staycation | Detail Role',} 
                );
            
           
             
                console.log('-------------users Role',JSON.stringify(report))
                // console.log('-------------users',JSON.stringify(users.name))
        } catch (error) {
                // req.flash('alertMessage', `${err.message}`);
                // req.flash('alertStatus', 'danger');
                console.log(error)
            res.redirect('/admin/report');
        }
       
    },
    deleteReport :async (req,res) =>{
        try {
          
            await Report.destroy({
                where: {
                    id: req.params.id
                }
            });
            res.redirect('/admin/report');
        } catch (error) {
            console.log('nya ....',error)
            res.redirect('/admin/report');
        }
    },
    viewEngineer : async (req,res) => {

        try {
            // const inspector = await Inspector.findAll({include:['engineers','report']});
            const users = await UserModel.findAll();
            const engineer = await Engineer.findAll();
            
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus}
            res.render('admin/engineer/view_engineer' , {
                users,
                engineer,
           
                user: req.session.user,
                alert,
                title:'Staycation | engineer'} 
                );
                // console.log('sdfghjk',engineer)
        } catch (error) {
                // req.flash('alertMessage', `${err.message}`);
                // req.flash('alertStatus', 'danger');
                console.log(error)
            res.redirect('/admin/engineer');
        }
       
    },
    createEngineer :async (req,res) =>{

        try {
            const {name,field,position,userId,} = req.body
            const datas = {
             
                name:name,
                field:field,
                position:position,
                userId:userId,
            
            }
            await Engineer.create( req.body);
            req.flash('alertMessage', `Success add engineer '${name}'   `);
            req.flash('alertStatus', 'success');
            res.redirect('/admin/engineer');
        } catch (error) {
            console.log('nya ....',error)
        }
      },
      updateEngineer : async (req,res) => {

        try {
            const {id,name,field,position} = req.body
       
            const datas = {
             
                name:name,
                email:field,
                password:position
            }
            await Engineer.update(req.body, {
                where: {
                    id:id
                }
            });
            req.flash('alertMessage', `Success Update engineer '${name}'   `);
            req.flash('alertStatus', 'success');
            res.redirect('/admin/engineer');
        } catch (error) {
                // req.flash('alertMessage', `${err.message}`);
                // req.flash('alertStatus', 'danger');
                console.log(error)
            res.redirect('/admin/engineer');
        }
       
    },
    deleteEngineer  :async (req,res) =>{
        try {
          
            await Engineer.destroy({
                where: {
                    id: req.params.id
                }
            });
            req.flash('alertMessage', `Success deleted engineer   `);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/engineer');
        } catch (error) {
            console.log('nya ....',error)
            // res.redirect('/admin/inspector');
        }
    },


    
    viewRolesUser : async (req,res) => {

        try {
            const inspector = await Inspector.findAll({include:['engineers','report']});
            const users = await UserModel.findAll({include:['roles']});
            const role = await Role.findAll();
            const user_role= await UserRole.findAll({include:['rolex','users']});
            // const roleID = users.roles[0].roleId;
            // const thisRole = await Role.findOne({where: { id: roleID }});
        
            // const alertMessage = req.flash('alertMessage');
            // const alertStatus = req.flash('alertStatus');
            // const alert = {message: alertMessage, status:alertStatus}
            res.render('admin/roles/view_userrole' , {
                inspector, 
                users,
                role,
                user_role,
                user: req.session.user,
                // alert,
                title:'Staycation | inspector',} 
                );
                // console.log('------------- role Id: ',users[0].roles[0].roleId )
                console.log('-------------nya',user_role[0].rolex.role )
                console.log('-------------rolenya',JSON.stringify(user_role[0].rolex ))
                console.log('-------------nya',JSON.stringify(user_role))
                console.log('-------------users',JSON.stringify(users))
                
                console.log('-------------role Id table UserRole: ',user_role[6].rolex.id );
        } catch (error) {
                // req.flash('alertMessage', `${err.message}`);
                // req.flash('alertStatus', 'danger');
                console.log(error)
            res.redirect('/admin/role');
        }
       
    },
    viewUser : async (req,res) => {

        try {
            const inspector = await Inspector.findAll({include:['engineers','report']});
            const users = await UserModel.findAll({include:['roles']});
            const role = await Role.findAll();
            const user_role= await UserRole.findAll({include:['rolex','users']});
            // const roleID = users.roles[0].roleId;
            // const thisRole = await Role.findOne({where: { id: roleID }});
        
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus}
            res.render('admin/user/view_user' , {
                inspector, 
                users,
                role,
                user_role,
                user: req.session.user,
                alert,
                title:'Staycation | inspector',} 
                );
                // console.log('------------- role Id: ',users[0].roles[0].roleId )
                // console.log('-------------rolenya',JSON.stringify(user_role[0].rolex ))
                // console.log('-------------nya',JSON.stringify(user_role))
                // console.log('-------------role',JSON.stringify(users[0].roles))
                // console.log('-------------users',JSON.stringify(users))
        } catch (error) {
                // req.flash('alertMessage', `${err.message}`);
                // req.flash('alertStatus', 'danger');
                console.log(error)
            res.redirect('/admin/role');
        }
       
    },
    view_detail_user : async (req,res) => {

        try {
            const {id} = req.params
            const role = await UserRole.findAll({where: { userId: id } ,include:['rolex','users']});
            const role_id = await Role.findAll();
            const users = await UserModel.findOne({where: { id: id } ,include:['roles']});
            const user_role= await UserRole.findAll({include:['rolex','users']});
        
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {message: alertMessage, status:alertStatus}
            res.render('admin/user/show_detail_role' , { 
                role,
                role_id,
                users,
                user: req.session.user,
                alert,
                title:'Staycation | Detail Role',} 
                );
            
           
             
                // console.log('-------------users Role',JSON.stringify(users.id))
                // console.log('-------------users',JSON.stringify(users.name))
        } catch (error) {
                // req.flash('alertMessage', `${err.message}`);
                // req.flash('alertStatus', 'danger');
                console.log(error)
            res.redirect('/admin/user');
        }
       
    },
    createUser:async (req,res) =>{

        try {
            const {name,email,password} = req.body
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const datas = {
                name:name,
                email:email,
                password:hashedPassword
            }
            await UserModel.create(datas);
            const idUser = await UserModel.findOne({
                limit: 0,
                 where: { email: email },
                 order: [ [ 'createdAt', 'DESC' ]]
                 })
           
            console.log('----------------------00000------ id nya',idUser)
            req.flash('alertMessage', `Success add user '${name}'   `);
            req.flash('alertStatus', 'success');
            res.redirect('/admin/user');
        } catch (error) {
            console.log('nya ....',error);
            res.redirect('/admin/user');
        }
      },
    createRole:async (req,res) =>{

        try {
            
            const {role,userId} = req.body
            const datas = {
                role:role,
            }
            
            if(found){
                res.json({
                    
                    'message': `Data ${role} sudah ada `
                })
            }
            await Role.create(datas);
            
            console.log('---------------------------- ',userId)
            res.redirect('/admin/role');
        } catch (error) {
            console.log('nya ....',error);
            res.redirect('/admin/role');
        }
      },
      createUserRole   :async (req,res) =>{
        try {
            const {id} = req.params
            const {userId,roleId} = req.body
            const frole = await UserRole.findAll({where: { userId: userId } ,include:['rolex','users']});
            const users = await UserModel.findOne({where: { id: userId } });
            const role = await Role.findOne({where: { id: roleId } });
            var found = false;
            for(var i = 0; i < frole.length; i++) {
                if (frole[i].rolex.id == roleId) {
                    found = true;
                    break;
                }
            }
            const datas = {
             
                userId:id,
                roleId:roleId,
              
            }
            if(found){
                console.log(`data ${roleId} --------------------------sudah ada`)
                req.flash('alertMessage', `Role '${role.role}' sudah ada `);
                req.flash('alertStatus', 'danger');
                await Sequelize.close()
                res.redirect('/admin/user');
            }
            await UserRole.create(req.body);
            req.flash('alertMessage', `Success Add Role '${role.role}'  for '${users.name}' `);
            req.flash('alertStatus', 'success');
            console.log('----------------------00000------ ',found)
            
            res.redirect('/admin/user');
        } catch (error) {
            console.log('terdapat error ....',error)
            res.redirect('/admin/user');
        }
    },
    deleteUserRole  :async (req,res) =>{
        try {
        //   const role = UserRole.findAll({
        //     where: {
        //         id: req.params.id
        //     },
        //     include:['rolex','users']
        //   })
            await UserRole.destroy({
                where: {
                    id: req.params.id
                },
                include:['rolex','users']
            });
       
            // console.log('-------------users Role',JSON.stringify(role))
            req.flash('alertMessage', `Success delete Role `);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/user');

        } catch (error) {
            console.log('nya ....',error)
            res.redirect('/admin/user');
        }
    },
    
    updateUser : async (req,res) => {
        const salt = await bcrypt.genSalt(10);
        const {id} = req.body
        const {roleId} = req.body
        try {
            const {name,email,password} = req.body
            const hashedPassword = await bcrypt.hash(password, salt);
            const datas = {
             
                name:name,
                email:email,
                password:hashedPassword
            }
            // const user_role = {
            //     userId:id,
            //     roleId:roleId,
            // }
            // await UserRole.update(user_role, {
            //     where: {
            //         userId:id
            //     }
            // })
            await UserModel.update(datas, {
                where: {
                    id:id
                }
            });
            // console.log(user_role)
            req.flash('alertMessage', `Success Update user '${name}'   `);
            req.flash('alertStatus', 'success');
            res.redirect('/admin/user');
        } catch (error) {
                // req.flash('alertMessage', `${err.message}`);
                // req.flash('alertStatus', 'danger');
                console.log(error)
            res.redirect('/admin/user');
        }
       
    },
    
}