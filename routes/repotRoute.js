const router = require('express').Router();
const reportModel =require('../controllers/reportMysql');
const authRole = require('../middlewares/authRole');
const {upload,uploadMultiple} = require('../middlewares/multer');
const multer = require("multer");


router.post('/createReport/:inspectorId', uploadMultiple,reportModel.createReport);
router.post('/createReport_only/:inspectorId',reportModel.createReportOnly);
router.put('/upadteReport/:inspectorId/:id', reportModel.updateReport);
router.get('/viewReportjwt', authRole.authRoleTunnel, reportModel.getReport);
router.get('/viewReport', reportModel.getReport);
router.get('/viewReport/:idReport', reportModel.getReportById);
router.get('/viewReport/inpector/:idInspector',authRole.authRoleTunnel, reportModel.getReportByIdInspector);
router.delete('/deleteReport/:id', reportModel.deleteReport);

router.post('/report/equipment/:reportId', reportModel.createEquipment);
router.delete('/report/equipment/:idWorker', reportModel.deleteReportEquipment);

router.post('/report/worker_hours/:reportId', reportModel.createWorkerHours);
router.delete('/report/worker_hours/:idWorker', reportModel.deleteWorkerHours);

router.post('/report/image/:reportId',uploadMultiple, reportModel.createImage);
router.delete('/report/image/:idWorker', reportModel.deleteImage);

router.post('/report/worker/:reportId', reportModel.createWorker);
router.put('/report/worker/:idWorker', reportModel.getReportById);
router.delete('/report/worker/:idWorker', reportModel.deleteReportWorker);

module.exports = router;