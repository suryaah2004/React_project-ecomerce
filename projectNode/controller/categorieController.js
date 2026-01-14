import Category from '../model/categorieSchema.js'

// create categoy (admin)

export const addCategory = async (req, res) => {
    try {
console.log("HEADERS:", req.headers);
console.log("BODY:", req.body);

        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const exists = await Category.findOne({ name });
        if (exists) {
            return res.status(401).json({ message: "Category already exists" });
        }

        const category = await Category.create({ name });

        res.status(200).json({
            message: "Category created successfully",
            category
        });

    } catch (error) {
        console.log("Category Error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// GET ALL CATEGORIES

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).sort({ createdAt: -1 });

        res.status(200).json({
            message: "All Categories",
            categories
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// GET SINGLE CATEGORY

export const getCategoryById = async (req, res) => {
    try {
        const categoryId = req.params.id;

        const category = await Category.findById(categoryId);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status.status(200).json({
            message: "Category Found",
            category
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// UPDATE CATEGORY (Admin Only)

export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const id = req.params.id;

        if (!name) {
            return res.status(400).json({ message: "Category name is required" });
        }

        const category = await Category.findByIdAndUpdate(
            id,
            { name },
            { new: true }
        );

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({
            message: "Category updated successfully",
            category
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// DELETE CATEGORY (Admin Only)

export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.json({
            message: "Category deleted successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
