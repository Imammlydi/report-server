const router = require('express').Router();
const userRole =require('../controllers/user_roleMusql');


router.post('/createUserRole/:userId/:roleId', userRole.createRole);
// router.put('/upadteReport/:inspectors/:id', reportModel.updateReport);
// router.get('/viewReport', reportModel.getReport);
// router.delete('/deleteReport/:id', reportModel.deleteReport);

module.exports = router;