import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema(
  {
    // Business-readable product ID (SKU)
    productId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    name: {
      type: String,
      required: true,
      trim: true,
      index: true
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },

    // Alternative names (AI search, typo handling, synonyms)
    altNames: [
      {
        type: String,
        lowercase: true,
        trim: true
      }
    ],

    brand: {
      type: String,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    images: [
      {
        type: String
      }
    ],

    // Original price (MRP / labeled price)
    labeledPrice: {
      type: Number,
      required: true
    },

    // Selling price
    price: {
      type: Number,
      required: true
    },

    stock: {
      type: Number,
      required: true,
      min: 0
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true
    },

    ratingsAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },

    ratingsCount: {
      type: Number,
      default: 0
    },

    isAvailable: {
      type: Boolean,
      default: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

//SLUG GENERATION MIDDLEWARE 
productSchema.pre("save", function (next) {
  if (!this.isModified("name")) return next();

  this.slug = slugify(this.name, {
    lower: true,
    strict: true
  });

  next();
});

productSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
  }
  next();
});

// Compound index for AI search & filtering
productSchema.index({
  name: "text",
  altNames: "text",
  description: "text"
});

export default mongoose.model("Product", productSchema);
