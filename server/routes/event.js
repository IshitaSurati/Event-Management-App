const express = require("express");
const {
  createEvent,
  getAllEvents,
  rsvpEvent,
  deleteEvent,
} = require("../controllers/event.controller");
const authenticateToken = require("../middlewares/user.middleware");
const upload = require("../middlewares/upload.middleware");

const eventRoute = express.Router();

// Create Event
eventRoute.post("/", authenticateToken, upload.single("image"), createEvent);


// Get All Events
eventRoute.get("/", getAllEvents);

// RSVP to Event
eventRoute.post("/:id/rsvp", authenticateToken, rsvpEvent);

// Delete Event
eventRoute.delete("/:id", authenticateToken, deleteEvent);

module.exports = eventRoute;
