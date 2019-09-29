const express = require('express');
const router = express.Router();
const stateController =  require('../controllers/state');



router.get('/state', stateController.list)


module.exports = router;