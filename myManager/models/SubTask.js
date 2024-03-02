const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
  subtaskDescription: {
    type: String,
    required: true,
    maxLength:50, 
  },
  status: {
    type: Number,
    enum: [0, 1],
    default: 0,
  },
  created_at:{
    type: Date,
    default: Date.now,
  },
  updated_at:{
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Subtask', subtaskSchema);
