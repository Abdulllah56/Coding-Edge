const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  experience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  goals: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'active', 'completed', 'dropped'],
    default: 'pending'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'refunded'],
    default: 'pending'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  notes: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
enrollmentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create indexes for better query performance
enrollmentSchema.index({ email: 1 });
enrollmentSchema.index({ course: 1 });
enrollmentSchema.index({ status: 1 });
enrollmentSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Enrollment', enrollmentSchema);