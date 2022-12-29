const connection = require('../middlewares/conn');
const { v4: uuidv4 } = require('uuid');
const ReportModel = require('../models/reportMysql')
const InspectorModel = require('../models/inspectorMysql')
const EngineerModel = require('../models/engineerMysql')
const Image =require('../models/imageUrlMySql')

// const Report = ReportModel.belongsTo(InspectorModel, { as: 'report' });
InspectorModel.hasMany(ReportModel, { as: "report", onDelete:'CASCADE' });
  ReportModel.belongsTo(InspectorModel, {
  foreignKey: "inspectorId",
  as: "inspector" 
});

EngineerModel.hasMany(InspectorModel, { as: "inspectors" });
  InspectorModel.belongsTo(EngineerModel, {
  foreignKey: "engineerId",
  as: "engineers" 
});
module.exports ={
     createInspector :async (req,res) =>{

        try {
            const {name,field,position} = req.body
            const datas = {
             
                name:name,
                field:field,
                position:position,
                userId:req.params.userId,
                engineerId:req.params.engineerId,
            }
            await InspectorModel.create(datas);
            res.json({
                'status': 201,
                'data': datas   
            })
        } catch (error) {
            console.log('nya ....',error)
        }
      },
      updateInspector  :async (req,res) =>{
        try {
            const {name,field,position} = req.body
            const datas = {
             
                name:name,
                email:field,
                password:position
            }
            await InspectorModel.update(req.body, {
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
      getInspector :async (req,res) =>{
        try {
            const inspector = await InspectorModel.findAll({include:['engineers','report']});
            res.json({
                'status': 200,
                'data': inspector
            })
        } catch (err) {
            console.log(err);
        }
    },
    deleteInspector  :async (req,res) =>{
        try {
          
            await InspectorModel.destroy({
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