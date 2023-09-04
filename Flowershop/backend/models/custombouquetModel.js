import mongoose from 'mongoose';

const customBouquetSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product', 
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const CustomBouquet = mongoose.model('CustomBouquet', customBouquetSchema);

export default CustomBouquet;
