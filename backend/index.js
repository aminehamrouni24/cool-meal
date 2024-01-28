const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 6000;
const db = process.env.MONGO_URI;

// database section
// mongoose
//   .connect(db)
//   .then(() => console.log("Database connected successfully "))
//   .catch((err) => console.log(err));

// api
app.use("/api/users", require("./Routes/userRoutes"));
// app.use("/api/cart", cors(), require("./Routes/cart"));
// app.use("/api/orders", cors(), require("./Routes/order"));
// app.use("/api/verify", require("./Routes/verify"));
// app.use("/api/forget", require("./Routes/forget"));
// app.use("/api/reset", require("./Routes/reset"));
// app.use("/api/resend", require("./Routes/resendCode"));
// app.use("/api/admin", require("./Routes/admin"));
// app.use("/api/items", require("./Routes/items"));
// app.use("/api/paytm", require("./Routes/paytm"));
// app.use("/api/get_orders", require("./Routes/orders"));

// server on listen
app.listen(PORT, function (err) {
  if (err) console.log(err);
  else console.log(`Server is running on Port : ${PORT}`);
});
