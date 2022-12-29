const router = require('express').Router();
const engineerController =require('../controllers/engineerMysql');


router.post('/createEngineer/:userId', engineerController.createEngineer);
// router.put('/editInspector/:id', inspectorModel.updateInspector);
router.get('/viewEngineer', engineerController.getEngineer);
// router.delete('/deleteInspector/:id', inspectorModel.deleteInspector);

module.exports = router;