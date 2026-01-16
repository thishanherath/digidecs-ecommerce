import Product from "../models/product.js";
import mongoose from "mongoose";


export const createProduct = async (req, res) => {
  try {
    const {
      productId,
      name,
      slug,
      altNames = [],
      description,
      images = [],
      labeledPrice,
      price,
      stock,
      category
    } = req.body;

    /* ---------- Validation ---------- */
    if (
      !productId ||
      !name ||
      !slug ||
      !description ||
      labeledPrice === undefined ||
      price === undefined ||
      stock === undefined ||
      !category
    ) {
      return res.status(400).json({
        message: "All required fields must be provided"
      });
    }

    if (price <= 0 || labeledPrice <= 0) {
      return res.status(400).json({
        message: "Prices must be greater than zero"
      });
    }

    if (price > labeledPrice) {
      return res.status(400).json({
        message: "Selling price cannot exceed labeled price"
      });
    }

    if (stock < 0) {
      return res.status(400).json({
        message: "Stock cannot be negative"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        message: "Invalid category ID"
      });
    }

    /* ---------- Normalize slug ---------- */
    const normalizedSlug = slug.toLowerCase().trim();

    /* ---------- Duplicate check ---------- */
    const exists = await Product.findOne({
      $or: [{ productId }, { slug: normalizedSlug }]
    });

    if (exists) {
      return res.status(409).json({
        message: "Product with same productId or slug already exists"
      });
    }

    /* ---------- Create product ---------- */
    const product = await Product.create({
      productId,
      name,
      slug: normalizedSlug,
      altNames,
      description,
      images,
      labeledPrice,
      price,
      stock,
      category
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      message: "Failed to create product"
    });
  }
};


export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      search
    } = req.query;

    const query = {
      isActive: true,
      isAvailable: true
    };

    if (category && mongoose.Types.ObjectId.isValid(category)) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.$text = { $search: search };
    }

    const products = await Product.find(query)
      .populate("category", "name slug")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      products
    });
  } catch (error) {
    console.error("Get products error:", error);
    res.status(500).json({
      message: "Failed to fetch products"
    });
  }
};


export const getProductBySlug = async (req, res) => {
  try {
    const product = await Product.findOne({
      slug: req.params.slug.toLowerCase(),
      isActive: true
    }).populate("category", "name slug");

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({
      message: "Failed to fetch product"
    });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const allowedFields = [
      "name",
      "description",
      "price",
      "labeledPrice",
      "stock",
      "images",
      "isAvailable",
      "category"
    ];

    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (updates.price && updates.labeledPrice) {
      if (updates.price > updates.labeledPrice) {
        return res.status(400).json({
          message: "Selling price cannot exceed labeled price"
        });
      }
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json(product);
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      message: "Failed to update product"
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.json({
      message: "Product disabled successfully"
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      message: "Failed to delete product"
    });
  }
};
