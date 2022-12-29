const connection = require('../middlewares/conn');
const { v4: uuidv4 } = require('uuid');
const ReportModel = require('../models/reportMysql');
const Equipment = require('../models/equipmentMysql');
const Weather = require('../models/weatherMysql');
const Worker = require('../models/workerMysql');
const WorkerHours = require('../models/workerHoursMysql');
const WeatherApi = require('openweather-apis');

const Image =require('../models/imageUrlMySql')

const fs = require('fs-extra');
const path = require('path');


ReportModel.hasMany(Image, { as: "image", onDelete:'CASCADE' });
Image.belongsTo(ReportModel, {
  foreignKey: "reportId",
  as: "reportImage" 
});
ReportModel.hasMany(WorkerHours, { as: "workerHours", onDelete:'CASCADE' });
WorkerHours.belongsTo(ReportModel, {
    foreignKey: "reportId",
    as: "reportWh" 
});
ReportModel.hasMany(Worker, { as: "worker", onDelete:'CASCADE' });
Worker.belongsTo(ReportModel, {
    foreignKey: "reportId",
    as: "reportworker" 
});
ReportModel.hasMany(Weather, { as: "weather", onDelete:'CASCADE' });
Weather.belongsTo(ReportModel, {
    foreignKey: "reportId",
    as: "reportweather" 
});
ReportModel.hasMany(Equipment, { as: "equipment", onDelete:'CASCADE' });
Equipment.belongsTo(ReportModel, {
    foreignKey: "reportId",
    as: "reportequipment" 
});
module.exports ={

    createReportOnly :async (req,res) =>{
        try {
            const {
                title,
                description,
                shift,
                tanggal
            } = req.body
            const data ={
                title:title,
                description:description,
                shift:shift,
                tanggal:tanggal,
                inspectorId:req.params.inspectorId,
                
            }
           
            const reports = await ReportModel.create(data);
            res.json({
                'status': 201,
                'data': reports
            })
        } catch (error) {
            console.log('nya ....',error)
        }
      },
    createReport :async (req,res) =>{
        try {
            const {
                title,
                description,
                shift,
                tanggal,
                name,
                qty,
                type_of_work,
                qtyW,
                working_name,
                length,
                weather

            } = req.body

          const img =[]
        //   for (let i = 0; i < req.files.length; i++) {
        //    const obj = { imageUrl: `images/${req.files[i].filename}`}
        //     img.push(obj)
        //   }
      
        const equipment = req.body.equipment
        const worker = req.body.worker
        const workerHours = req.body.workerHours
            const datas = {
                inspectorId:req.params.inspectorId,
                title:title,
                description:description,
                shift:shift,
                tanggal:tanggal,
                // equipment:req.body
            }
            // ReportModel.image.push({ImageSave});
           const reportResult = await ReportModel.create(datas,{insclude:['equipment']}).then(result =>{
                console.log('hasilnya...... ',JSON.stringify(result.id))
                // res.status(200).json({
                //     message:'create category successfully',
                //     data:result
                // })
                return result;
            })
            const idReport =reportResult.id

            var wh = workerHours.map(who => ({ working_name: who.working_name, length: who.length, reportId:idReport }));
            await WorkerHours.bulkCreate(wh)

            var eqmn = equipment.map(eq => ({ name: eq.name, qty: eq.qty, reportId:idReport }));
            await Equipment.bulkCreate(eqmn)

            var works = worker.map(wk => ({ type_of_work: wk.type_of_work, qtyW: wk.qtyW, reportId:idReport }));
            await Worker.bulkCreate(works)

            const ee = await ReportModel.findOne({where: { id: idReport },include:['equipment','worker','workerHours','image']})
             res.json({
                 'status': 201,
                 'data': ee
             })
            // const equipments =[]
            //     for (let i = 0; i < req.body.name.length; i++) {
            //         const new_arr= {
            //             name:name,
            //             qty:qty,
            //             reportId:idReport
            //         }
            //         equipments.push(new_arr);
            //         await Equipment.bulkCreate(equipments)
            //         console.log(equipments)
            //     }
                // await Equipment.bulkCreate(req.body)
                
               
                // Worker.create({
                //     type_of_work:type_of_work,
                //     qtyW:qtyW,
                //     reportId:idReport
                // })
                // WorkerHours.create({
                //     working_name:working_name,
                //     length:length,
                //     reportId:result.id
                // })
                // Weather.create({
                //     weather:weather,
                //     reportId:result.id
                // })
                //  Image.create({ imageUrl: `images/${req.file.filename}`,reportId:result.id})
                for (let i = 0; i < req.files.length; i++) {
                    await Image.create({ imageUrl: `images/${req.files[i].filename}`,reportId:idReport });
                      
                  }
                  access_key = "b2260445-cdd9-4a53-ab8b-a608fb0c16ce"
                  query = `{
                    weatherByPoint(request: { lat: 52.37125, lon: 4.89388 }) {
                      now {
                        temperature
                      }
                    }`
                  
                    headers = {
                        "X-Meteum-API-Key": access_key
                    }
                  fetch(`https://api.meteum.ai/graphql/query', headers=${headers}, json={'query': ${query}}`)
                    .then((response) => response.json())
                    .then((data) => console.log('weather-------- ',data));
                
            console.log(JSON.stringify(workerHours),'------',JSON.stringify(eqmn))
         
            
        } catch (error) {
            console.log('nya ....',JSON.stringify(error))
            console.log('nya ....',error)
        }
      },
    getReport :async (req,res) =>{
        try {
            
            const report = await ReportModel.findAll({
                
                include:[
                    'inspector',
                    'image',
                    'workerHours',
                    'worker',
                    'weather',
                    'equipment',
                    
                ]
                });
            res.json({
                'status': 201,
                'data': report
            })
        } catch (error) {
            console.log('nya ....',error)
        }
      },
      getReportByIdInspector :async (req,res) =>{
        try {
            const {idInspector} = req.params
            const report = await ReportModel.findAll({
                where: { inspectorId: idInspector },
                include:[
                    'inspector',
                    'image',
                    'workerHours',
                    'worker',
                    'weather',
                    'equipment',
                ]
                });
            res.json({
                'status': 201,
                'data': report
            })
        } catch (error) {
            console.log('nya ....',error)
        }
      },
    getReportById :async (req,res) =>{
        try {
            const {idReport,description,shift,tanggal} = req.params
            const report = await ReportModel.findAll({
                where: { id: idReport },
                include:[
                    'inspector',
                    'image',
                    'workerHours',
                    'worker',
                    'weather',
                    'equipment',
                ]
                });
            res.json({
                'status': 201,
                'data': report
            })
        } catch (error) {
            console.log('nya ....',error)
        }
      },
  
      updateReport :async (req,res) =>{
        try {
            const {title,description,shift,tanggal} = req.body
            const datas = {
                inspectorId:req.params.inspectorId,
                title:title,
                description:description,
                shift:shift,
                tanggal:tanggal
            }
            await ReportModel.update(req.body, {
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
      deleteReport :async (req,res) =>{
        try {
           
            await ReportModel.destroy({
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
    createWorker :async (req,res) =>{
        try {
            const {qtyW,type_of_work,} = req.body
            const data ={
                type_of_work:type_of_work,
                qtyW:qtyW,
                reportId:req.params.reportId
                
            }
            const worker = await Worker.create(data);
            res.json({
                'status': 201,
                'data': worker
            })
        } catch (error) {
            console.log('nya ....',error)
        }
      },
    createEquipment :async (req,res) =>{
        try {
            const {name,qty,} = req.body
            const data ={
                qty:qty,
                name:name,
                reportId:req.params.reportId
                
            }
            const equipment = await Equipment.create(data);
            res.json({
                'status': 201,
                'data': equipment
            })
        } catch (error) {
            console.log('nya ....',error)
        }
      },
      deleteReportEquipment :async (req,res) =>{
        try {
           
            await Equipment.destroy({
                where: {
                    id: req.params.idWorker
                }
            });
            res.json({
                data:'Berhasil di delete'
            })
        } catch (error) {
            console.log('nya ....',error)
        }
    },
    createWorkerHours :async (req,res) =>{
        try {
            const {working_name,length,} = req.body
            const data ={
                length:length,
                working_name:working_name,
                reportId:req.params.reportId
                
            }
            const equipment = await WorkerHours.create(data);
            res.json({
                'status': 201,
                'data': equipment
            })
        } catch (error) {
            console.log('nya ....',error)
        }
      },
      deleteWorkerHours :async (req,res) =>{
        try {
           
            await WorkerHours.destroy({
                where: {
                    id: req.params.idWorker
                }
            });
            res.json({
                data:'Berhasil di delete'
            })
        } catch (error) {
            console.log('nya ....',error)
        }
    },
    createImage :async (req,res) =>{
        try {
           
            for (let i = 0; i < req.files.length; i++) {
                const img = await Image.create({ imageUrl: `images/${req.files[i].filename}`,reportId:req.params.reportId });
                return img
                  
              }
            res.json({
                'status': 201,
                'data':req.files.length
            })
        } catch (error) {
            console.log('nya ....',error)
        }
      },
      deleteImage :async (req,res) =>{
        try {
         await Image.findOne({
            where: {
                id: req.params.idWorker
            }
        }).then((img) =>{
            fs.unlink(path.join(`public/${img.imageUrl}`));
            img.destroy()
        })
            // await Image.destroy({
            //     where: {
            //         id: req.params.idWorker
            //     }
            // });
            res.json({
                data:'Berhasil di delete'
            })
        } catch (error) {
            console.log('nya ....',error)
        }
    },
    getWorkerById :async (req,res) =>{
        try {
            const {idWorker} = req.params
            const worker = await Worker.update({
                where: { id: idWorker }
                });
            res.json({
                'status': 201,
                'data': worker
            })
        } catch (error) {
            console.log('nya ....',error)
        }
      },
      deleteReportWorker :async (req,res) =>{
        try {
           
            await Worker.destroy({
                where: {
                    id: req.params.idWorker
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