import path from "path";
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";
import products from "./data/products.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/AdminRoutes.js"
import scheduleRoutes from "./routes/scheduleRoutes.js"
import restockRoutes from "./routes/restockRoutes.js"
import articleRoutes from "./routes/articleRoutes.js"
import customBouquetRoutes from "./routes/customBouquetRoutes.js"


import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import mongoose from "mongoose";
import cors from "cors";


const __dirname = path.resolve();

dotenv.config();



const app = express();
// Allow CORS preflight requests
app.options("/*", cors());

app.use(express.json());

app.use(cors());

console.log("MONGO_URL:", process.env.MONGO_URL);
mongoose.connect("mongodb+srv://angela:pnvvgldufJNvKPNu@flowershop.hw4xyar.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error(' Sta je ovo MongoDB connection error:', error);
  });

app.use('/api/schedules', scheduleRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", adminRoutes); 
app.use('/api/restocks', restockRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/custombouquets', customBouquetRoutes);


// Add this console log to check requested URL
app.use("/api/products", (req, res, next) => {
  console.log("Requested URL:", req.originalUrl); // Log the requested URL
  next();
});


app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  //any route that is not api will be redirected to index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `server listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
