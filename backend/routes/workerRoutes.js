const express = require('express');
const { addWorker, getWorkers, updateWorker } = require('../controllers/workerController');

const router = express.Router();

router.post('/add', addWorker);
router.get('/', getWorkers);
router.put('/:id', updateWorker);

module.exports = router;