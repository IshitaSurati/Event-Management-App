const Event = require("../models/event.model");

// Create Event
const createEvent = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { title, description, date, location, maxAttendees } = req.body;
    const event = new Event({
      title,
      description,
      date,
      location,
      maxAttendees,
      image: req.file?.path,
      creator: req.user.id,
    });
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    console.error("Error:", error); // Log the error
    res.status(500).json({ msg: "Server error", error });
  }
};


// Get All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("creator", "name email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error: error.message });
  }
};

// RSVP to Event
const rsvpEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ message: "You have already RSVP’d to this event" });
    }

    if (event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ message: "Event is full" });
    }

    event.attendees.push(req.user.id);
    await event.save();
    res.status(200).json({ message: "RSVP successful", event });
  } catch (error) {
    res.status(500).json({ message: "Error processing RSVP", error: error.message });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    if (event.creator.toString() !== req.user.id) {
      return res.status(403).json({ message: "You are not authorized to delete this event" });
    }

    await Event.findByIdAndDelete(id);
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error: error.message });
  }
};

module.exports = { createEvent, getAllEvents, rsvpEvent, deleteEvent };
