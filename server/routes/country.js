const express = require('express');
const router = express.Router();
const countryController =  require('../controllers/country');



router.get('/country', countryController.list)


module.exports = router;