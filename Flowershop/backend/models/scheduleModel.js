import mongoose from 'mongoose';

const scheduleSchema = mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  shift: {
    type: String,
    enum: ['morning', 'afternoon'],
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
