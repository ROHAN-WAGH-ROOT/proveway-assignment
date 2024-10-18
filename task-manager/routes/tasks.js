const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const isAuthenticated = require('../middlesware/authMiddleware');
const router = express.Router();

router.get('/tasks', isAuthenticated, getTasks);
router.post('/tasks', isAuthenticated, createTask);
router.put('/tasks/:id', isAuthenticated, updateTask);
router.delete('/tasks/:id', isAuthenticated, deleteTask);

module.exports = router;
