import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // Business-readable Order ID
    orderId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    // User reference (logged-in users)
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    // Snapshot of shipping & contact info
    customer: {
      name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      phone: {
        type: String,
        required: true
      },
      address: {
        type: String,
        required: true
      }
    },

    // Ordered items (product snapshot + reference)
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true
        },

        productSnapshot: {
          productId: String,
          name: String,
          altNames: [String],
          images: [String]
        },

        quantity: {
          type: Number,
          required: true,
          min: 1
        },

        labeledPrice: {
          type: Number,
          required: true
        },

        price: {
          type: Number,
          required: true
        }
      }
    ],

    // Pricing summary
    labeledTotal: {
      type: Number,
      required: true
    },

    totalAmount: {
      type: Number,
      required: true
    },

    // Order lifecycle
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
      index: true
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "card", "online"],
      default: "cod"
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

export default mongoose.model("Order", orderSchema);
