const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      require: [true, "Email required to continue"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required to continue"],
      //   select: false,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpire: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  // check if the password has not been modified
  if (!this.isModified("password")) {
    next();
  }

  // encrypt the password before saving it in the database
  console.log("password hashed");
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  // decrypt the saved password and compare to the request
  return this.password === password;
};

UserSchema.methods.generateSignedToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

UserSchema.methods.generateResetPasswordToken = async function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);
  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
