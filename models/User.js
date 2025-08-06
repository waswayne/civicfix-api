// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   name: { 
//     type: String,
//     required: [true, 'Name is required'],
//     trim: true
//   },

//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//     lowercase: true
//   },

//   password: {
//     type: String, 
//     required: [true, 'Password is required'],
//     minlength: 8
//   },

//   role: {
//     type: String,
//     enum: ['user', 'admin'],
//     default: 'user'
//   }
// }, { timestamps: true });

// export default mongoose.model('User', userSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 8
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
