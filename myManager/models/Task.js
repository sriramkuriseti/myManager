
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    maxLength:50, 
  },

  subTasks: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Subtask"
		},
	],
  due_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['TODO', 'IN_PROGRESS', 'DONE'],
    default: 'TODO',
  },
  priority: {
    type: Number,
    required: true,
    default: 0,
  },
  deleted_at: {
    type: Date,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);

