const express = require('express');
const router = express.Router();

const verifyToken = require('../middlewares/verifyToken');
const taskCtrl = require('../controllers/taskController');

// protect all routes
router.post('/', verifyToken, taskCtrl.createTask);
router.get('/', verifyToken, taskCtrl.getTasks);
router.put('/:id', verifyToken, taskCtrl.updateTask);
router.delete('/:id', verifyToken, taskCtrl.deleteTask);

module.exports = router;