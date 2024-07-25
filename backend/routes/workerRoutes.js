const express = require('express');
const { addWorker, getWorkers } = require('../controllers/workerController');

const router = express.Router();

router.post('/add', addWorker);
router.get('/', getWorkers);

module.exports = router;