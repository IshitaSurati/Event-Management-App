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

eventRoute.post("/", authenticateToken, upload.single("image"), createEvent); // Create Event
eventRoute.get("/", getAllEvents); // Get All Events
eventRoute.post("/:id/rsvp", authenticateToken, rsvpEvent); // RSVP to Event
eventRoute.delete("/:id", authenticateToken, deleteEvent); // Delete Event

module.exports = eventRoute;
