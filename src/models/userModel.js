const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    username: { type: String, required: true},
    passwordHash: { type: String, required: true },
    role: {type: String, required: true},
    validation: {type:Boolean, required: true}
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
