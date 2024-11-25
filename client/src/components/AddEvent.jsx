import React, { useState } from 'react';
import { createEvent } from '../api';
import '../index.css';

const AddEvent = () => {
  const [formData, setFormData] = useState({ title: '', description: '', date: '', location: '', maxAttendees: '' });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const eventData = new FormData();
    eventData.append('title', formData.title);
    eventData.append('description', formData.description);
    eventData.append('date', formData.date);
    eventData.append('location', formData.location);
    eventData.append('maxAttendees', formData.maxAttendees);
    if (image) eventData.append('eventImage', image);  // Append image file

    createEvent(eventData, token)
      .then(() => alert('Event Created Successfully'))
      .catch((err) => alert('Event Creation Failed'));
  };

  return (
    <div className="addevent">
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={handleChange} required />
        <textarea name="description" placeholder="Description" onChange={handleChange} required></textarea>
        <input type="date" name="date" onChange={handleChange} required />
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <input type="number" name="maxAttendees" placeholder="Max Attendees" onChange={handleChange} required />
        <input type="file" name="eventImage" onChange={handleImageChange} accept="image/*" />
        <button type="submit">Create Event</button>
      </form>
    </div>
  );
};

export default AddEvent;
