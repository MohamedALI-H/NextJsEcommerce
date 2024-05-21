const mongoose= require("mongoose");

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type:String},
  price: { type: Number, required: true },
  images: [{ type: String }],
  category: { type: mongoose.Types.ObjectId, ref: 'Category' },
  brand:{type:String},
  properties: { type: Object },
  stockQuantity: { type: Number, default: 0 }, // Default to 0
  timesBought: { type: Number, default: 0 }, // Default to 0
}, {
  timestamps: true,
});

ProductSchema.methods.increaseStockQuantity = function(quantity) {
  this.stockQuantity += quantity;
};

ProductSchema.methods.decreaseStockQuantity = function(quantity) {
  if (this.stockQuantity >= quantity) {
    this.stockQuantity -= quantity;
  } else {
    throw new Error("Insufficient stock quantity");
  }
};

ProductSchema.methods.increaseTimesBought = function() {
  this.timesBought += 1;
};
module.exports = mongoose.models?.Product || mongoose.model('Product', ProductSchema);
