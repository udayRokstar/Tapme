import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  rating: {
    type: String,
    required: true,
    enum: ['Not Happy', 'Good', 'Satisfied']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);
