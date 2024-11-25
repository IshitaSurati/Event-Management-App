# Event Management System

A simple Event Management System built with React (Frontend) and Node.js with Express (Backend). Users can create, view, edit, manage events, RSVP, and get notified about event updates.

## Frontend (React)

### Tech Stack:
- React.js
- React Router (for page navigation)
- Axios (for API calls)
- CSS (Custom styles)

### Features:
- **Home Page**: Displays a list of upcoming events with the ability to filter by date, location, and event type.
- **Login**: Users can log in using JWT authentication.
- **Signup**: New users can register by providing their name, email, and password.
- **Add Event**: Users can create new events with details like title, description, date, and location.
- **RSVP**: Registered users can RSVP to events, limiting attendees based on event max capacity.

### Installation:
1. Clone the repository.
2. Run `npm install` to install dependencies.
3. Start the app with `npm start`.

### Running Locally:
- To run the frontend locally, use:
  ```bash
  npm start
- The app will be available at http://localhost:3000.

### Backend (Node.js & Express)

### Tech Stack:
- Node.js
- Express.js
- MongoDB (for storing events and user data)
- JWT (for user authentication)

### API Endpoints:
- POST /api/signup: Create a new user (name, email, password).
- POST /api/login: User login with JWT authentication.
- GET /api/events: Get a list of all upcoming events.
- POST /api/events: Create a new event.
- PATCH /api/events/:id: Edit an existing event.
- DELETE /api/events/:id: Delete an event.

### Installation:
- Clone the repository.
- Run npm install to install dependencies.
- Set up your .env file with the required variables (e.g., JWT_SECRET, MONGO_URI).
- Start the server with npm start.
- Running Locally:
- To run the backend locally, use:
    ```bash
    npm start
- The server will be available at http://localhost:8000.

### Deployment

### Frontend:
- Deployed on Vercel: [Frontend URL](https://event-management-app-vyr7.vercel.app/)
- 

### Backend:
- Deployed on Vercel: [Backend URL](https://event-management-app-ashen.vercel.app/)

### Usage
- Users can create accounts, log in, view events, RSVP, and manage events.
- The backend is secured using JWT authentication to manage user sessions
