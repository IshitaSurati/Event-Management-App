// AddEvent.jsx
import React, { useState } from 'react';
import { createEvent } from '../api'; 

const AddEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    maxAttendees: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem('authToken');
    console.log('Retrieved Token:', token); // Debug log

    // If no token is found, prompt the user to log in
    if (!token) {
      alert('You need to log in to create an event.');
      return;
    }

    // Create a FormData object to handle the file and other form fields
    const eventData = new FormData();
    eventData.append('title', formData.title);
    eventData.append('description', formData.description);
    eventData.append('date', formData.date);
    eventData.append('location', formData.location);
    eventData.append('maxAttendees', formData.maxAttendees);
    eventData.append('image', formData.image);

    try {
      // Call the API to create the event, passing the token in the Authorization header
      await createEvent(eventData, `Bearer ${token}`);
      alert('Event created successfully!');
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Event creation failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="maxAttendees"
        placeholder="Max Attendees"
        value={formData.maxAttendees}
        onChange={handleChange}
        required
      />
      <input
        type="file"
        name="image"
        onChange={handleFileChange}
        required
      />
      <button type="submit">Create Event</button>
    </form>
  );
};

export default AddEvent;
