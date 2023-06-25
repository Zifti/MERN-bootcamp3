if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.routes')
const reviewRoutes = require('./routes/review.routes')
const dealershipsRoutes = require('./routes/dealership.routes')
const passport = require('passport')
require('./libs/passport/passport.confing')
const ExpressError = require("./utils/ExpressError");
const cors = require('cors')

mongoose.connect("mongodb://127.0.0.1:27017/MERNbootcampJWT");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("database connected");
});


const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(passport.initialize())
app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));


app.use("/dealerships", dealershipsRoutes);
app.use("/dealerships/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 404 } = err;
  if (!err.message) err.message = "Something went wrong";
  res.status(statusCode).json({ error: err.message });
});

app.listen(3000, () => {
    console.log("Started on port 3000");
  });
  