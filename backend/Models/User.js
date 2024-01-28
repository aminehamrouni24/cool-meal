const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);


const User = mongoose.model('user' , userSchema)

module.exports = User