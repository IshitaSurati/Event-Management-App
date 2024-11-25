import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../api';
import '../index.css';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); 

    if (!token) {
      alert('You are not logged in. Please log in to access events.');
      return;
    }

    // Adding token to headers
    getAllEvents(token)
      .then((res) => setEvents(res.data))
      .catch((err) => {
        console.error(err);
        alert('Failed to load events');
      });
  }, []);

  return (
    <div className="home">
      <h2>Upcoming Events</h2>
      <div className="event-list">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {event.location}</p>
            {event.image && (
              <img 
                src={event.image} 
                alt={event.title} 
                className="event-image"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
