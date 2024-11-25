const Event = require("../models/event.model");

// Create Event
const createEvent = async (req, res) => {
  try {
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
    res.status(500).json({ msg: "Server error", error });
  }
};

// Get All Events
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate("creator", "name email");
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// RSVP to Event
const rsvpEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    if (event.attendees.includes(req.user.id)) {
      return res.status(400).json({ msg: "Already RSVP’d" });
    }

    if (event.attendees.length >= event.maxAttendees) {
      return res.status(400).json({ msg: "Event is full" });
    }

    event.attendees.push(req.user.id);
    await event.save();
    res.status(200).json({ msg: "RSVP successful", event });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

// Delete Event
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ msg: "Event not found" });

    if (event.creator.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized to delete this event" });
    }

    await Event.findByIdAndDelete(id);
    res.status(200).json({ msg: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error });
  }
};

module.exports = { createEvent, getAllEvents, rsvpEvent, deleteEvent };
