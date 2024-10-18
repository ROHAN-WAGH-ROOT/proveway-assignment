const express = require('express');
const { createCategory, getCategories, deleteCategory } = require('../controllers/categoryController');
const isAuthenticated = require('../middlesware/authMiddleware');
const router = express.Router();

router.get('/categories', isAuthenticated, getCategories);
router.post('/categories', isAuthenticated, createCategory);
router.delete('/categories/:id', isAuthenticated, deleteCategory);

module.exports = router;
