import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  discount: Number,
  description: String,
});

// 🛑 Force delete old cached model (only if you're reusing 'products')
delete mongoose.connection.models['products'];

export const Product = mongoose.model('products', productSchema);
