import React, { useEffect, useState } from 'react';
import { getAllEvents } from '../api';
import '../index.css';

const Home = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents().then((res) => setEvents(res.data)).catch(console.error);
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
                src={`http://localhost:8000/${event.image}`} 
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
