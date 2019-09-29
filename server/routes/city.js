const express = require('express');
const router = express.Router();
const cityController =  require('../controllers/city');



router.get('/city', cityController.list)


module.exports = router;