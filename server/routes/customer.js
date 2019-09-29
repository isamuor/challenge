const express = require('express');
const router = express.Router();
const customerController =  require('../controllers/customer');



router.post('/new', customerController.create)
router.get('/view', customerController.list)
router.delete('/:_id', customerController.delete)
router.put('/:_id', customerController.update)


module.exports = router;