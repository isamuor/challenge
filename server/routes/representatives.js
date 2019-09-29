const express = require('express');
const router = express.Router();
const representativeController =  require('../controllers/representatives');



router.get('/sales', representativeController.list)


module.exports = router;