const express = require('express');
const router = express.Router();
const customerController =  require('../controllers/customer');



router.post('/new', customerController.create)


module.exports = router;