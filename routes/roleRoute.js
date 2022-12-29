const router = require('express').Router();
const roleController =require('../controllers/roleMysql');


router.post('/createRole', roleController.createRole);
// router.put('/upadteReport/:inspectors/:id', reportModel.updateReport);
// router.get('/viewReport', reportModel.getReport);
// router.delete('/deleteReport/:id', reportModel.deleteReport);

module.exports = router;