import Category from "../models/category.js";
import mongoose from "mongoose";

export const createCategory = async (req, res) => {
    try {
        const { name, description } = req.body;
        if (!name) {
            return res.status(400).json({ message: "Name is required" });
        }

        const exists = await Category.findOne({ name });
        if (exists) {
            return res.status(400).json({ message: "Category already exists" });
        }

        const category = await Category.create({ name, description });

        res.status(201).json(category);
    } catch (error) {
        console.error("Create category error:", error);
        res.status(500).json({ message: "Failed to create category" });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ isActive: true });
        res.json(categories);
    } catch (error) {
        console.error("Get categories error:", error);
        res.status(500).json({ message: "Failed to fetch categories" });
    }
};

export const updateCategory = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid category ID format" });
        }

        const { name, description, isActive } = req.body;
        const updates = {};
        if (name) updates.name = name;
        if (description !== undefined) updates.description = description;
        if (isActive !== undefined) updates.isActive = isActive;

        const category = await Category.findByIdAndUpdate(req.params.id, updates, {
            new: true,
            runValidators: true
        });

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json(category);
    } catch (error) {
        console.error("Update category error:", error);
        res.status(500).json({ message: "Failed to update category" });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid category ID format" });
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({ message: "Category disabled successfully" });
    } catch (error) {
        console.error("Delete category error:", error);
        res.status(500).json({ message: "Failed to delete category" });
    }
};
