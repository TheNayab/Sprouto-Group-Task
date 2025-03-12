const mongoose = require("mongoose");
const crypto = require("crypto");
const validator = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the name of the user"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email address"],
    unique: true, // Ensure unique emails
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minlength: [8, "Password must be at least 8 characters long"],
    validate: {
      validator: function (value) {
        return validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        });
      },
      message:
        "Password must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
    },
  },
  confirmPassword: {
    type: String,
    required: [false, "Please enter your confirm password"],
    validate: {
      validator: function (value) {
        return value === this.password; // Ensure password match
      },
      message: "Passwords do not match",
    },
    select: false, // Prevent storing in DB
  },
  resettoken: {
    type: String,
  },
  tasks: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Task",
      required: true,
    },
  ],
});

// **Hashing Password Before Saving**
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.confirmPassword = undefined; // Remove confirmPassword before saving
  next();
});

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  const resetTokens = crypto.randomBytes(20).toString("hex");
  this.resettoken = crypto
    .createHash("sha256")
    .update(resetTokens)
    .digest("hex");
  return resetTokens;
};

module.exports = mongoose.model("User", userSchema);
