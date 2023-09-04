import mongoose from 'mongoose';
import Order from './models/orderModel.js'; 
import Product from './models/productModel.js'; 

const updateProductSoldCounts = async () => {
  try {
    await mongoose.connect("mongodb+srv://angela:pnvvgldufJNvKPNu@flowershop.hw4xyar.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const orders = await Order.find({});

    console.log(`Found ${orders.length} orders.`);

    for (const order of orders) {
      for (const orderItem of order.orderItems) {
        const product = await Product.findById(orderItem.product);

        if (product) {
          product.sold += orderItem.qty;
          await product.save();

          console.log(`Updated sold count for product ${product.name} (${product._id}) to ${product.sold}`);
        } else {
          console.log(`Product with ID ${orderItem.product} not found.`);
        }
      }
    }

    console.log('Finished updating sold counts.');


    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
};


updateProductSoldCounts();
