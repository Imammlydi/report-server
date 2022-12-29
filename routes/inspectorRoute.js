const router = require('express').Router();
const inspectorModel =require('../controllers/inspectorMysql');


router.post('/createInspector/:userId/:engineerId', inspectorModel.createInspector);
router.put('/editInspector/:id', inspectorModel.updateInspector);
router.get('/viewInspector', inspectorModel.getInspector);
router.delete('/deleteInspector/:id', inspectorModel.deleteInspector);

module.exports = router;