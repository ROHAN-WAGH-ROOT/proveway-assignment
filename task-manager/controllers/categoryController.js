const Category = require('../models/Category');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const newCategory = new Category({ name: req.body.name, user: req.user._id });
        const category = await newCategory.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error });
    }
};

// Fetch all categories for the user
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ user: req.user._id });
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        await Category.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error });
    }
};
