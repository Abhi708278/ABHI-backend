const express = require("express");
const app = express();
const cors = require("cors"); // allow cross platfrom req.
const bcrypt = require("bcrypt"); // hashing the pass.
const twilio = require("twilio"); // for otp on mob.

// Importing database models
const otpStore = require("./models/otpStore");
const user = require("./models/user");
const retailer = require("./models/retailer");
const passwordReset = require("./models/passwordReset");

// Middlewares
app.use(express.json()); // This is necessary to parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.json());

// Apis Modules
const userAuth = require("./Authentications/userAuth");
const addRetailers = require("./AdminPanel/addRetailers");
const productRoutes = require("./routes/products");
const {anylisis} = require("./routes/anylisis");
const categoryRoutes = require("./routes/category");

// Admin Routes
app.use("/category", categoryRoutes);

app.use("/admin", productRoutes);
// app.use("/anylisis", anylisis);


userAuth(app, twilio, otpStore, user, retailer, bcrypt);
addRetailers(app, retailer);

module.exports = app;
