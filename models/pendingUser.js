// PendingUser schema
// This collection stores users who have signed up
// but have NOT yet verified their email using OTP / link

const mongoose = require('mongoose');

const pendingUserSchema = new mongoose.Schema(
  {
    // ================= EMAIL =================
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please enter a valid email address'
      ],
      index: true
    },

    // ================= USERNAME =================
    username: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [20, 'Username cannot exceed 20 characters'],
      match: [
        /^[a-zA-Z0-9_ ]+$/,
        'Username can contain only letters, numbers, underscore and spaces'
      ]
    },

    // ================= PASSWORD =================
    // Temporarily stored password (will be hashed later by passport-local-mongoose)
    // and password must contain one uppercase, one lowercase, one digit and one special character
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
        match: [
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character'
        ]
    },

    // ================= OTP =================
    otp: {
      type: String, // stored as string to avoid type mismatch
      required: [true, 'OTP is required'],
      match: [/^\d{6}$/, 'OTP must be a 6-digit number']
    },

    // ================= OTP EXPIRY =================
    otp_expiry: {
      type: Date,
      required: [true, 'OTP expiry time is required']
    }
  },
  {
    timestamps: true // adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('PendingUser', pendingUserSchema);
