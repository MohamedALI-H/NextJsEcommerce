const mongoose = require('mongoose');

const PurchaseSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, default: 1 },
  totalPrice: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
});

module.exports = mongoose.models?.Purchase || mongoose.model('Purchase', PurchaseSchema);
