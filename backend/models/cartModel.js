import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
const cartSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
        quantity: Number,
      },
    ],
    cartTotal: Number,
  },
  { timestamps: true }
);

//Export the model
export default mongoose.model('Cart', cartSchema);
