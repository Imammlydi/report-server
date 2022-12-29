const { v4: uuidv4 } = require('uuid');
const ReportModel = require('../models/reportMysql')
const EngineerModel = require('../models/engineerMysql')
const InspectorModel = require('../models/inspectorMysql')


EngineerModel.hasMany(InspectorModel, { as: "inspector" });
  InspectorModel.belongsTo(EngineerModel, {
  foreignKey: "engineerId",
  as: "engineer" 
});
module.exports ={
    createEngineer:async (req,res) =>{

        try {
            const {name,field,position} = req.body
            const datas = {
             
                name:name,
                field:field,
                position:position,
                userId:req.params.userId,
            }
            await EngineerModel.create(datas);
            res.json({
                'status': 201,
                'data': datas   
            })
        } catch (error) {
            console.log('nya ....',error)
        }
      },
      getEngineer:async (req,res) =>{
        try {
            const inspector = await EngineerModel.findAll({include:['inspector']});
            res.json({
                'status': 200,
                'data': inspector
            })
        } catch (err) {
            console.log(err);
        }
    },
}