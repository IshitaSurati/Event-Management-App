const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  location: String,
  maxAttendees: Number,
  image: String, 
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
