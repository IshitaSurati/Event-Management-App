const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Event title is required"] },
  description: { type: String, trim: true },
  date: { type: Date, required: [true, "Event date is required"] },
  location: { type: String, trim: true },
  maxAttendees: {
    type: Number,
    default: 50,
    validate: {
      validator: Number.isInteger,
      message: "Maximum attendees must be an integer",
    },
  },
  image: { type: String, default: null }, // Image file path
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // RSVP attendees
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Event creator
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
