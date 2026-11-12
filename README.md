# City Hospital - Healthcare & Hospital Management System (HMS)

A full-stack healthcare web application featuring a public patient-facing portal and a staff dashboard for managing appointments.

## Features
- **Public Portal:**
  - Hospital overview and specialties.
  - Appointment booking form with doctor selection and date/time picker.
- **Staff / Doctor HMS Dashboard:**
  - View all booked appointments with patient name, assigned doctor, and time.
  - Approve or reject appointments in real time.

## Project Structure
```text
hospitalproject/
├── backend/
│   ├── server.js        # Express REST API (port 5000)
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # React frontend application
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html       # Entry HTML with Tailwind CSS
│   ├── vite.config.js
│   └── package.json
└── .gitignore
```

## How to Run

### 1. Start the Backend
In a terminal, navigate to the `backend` folder and start the server:
```bash
cd backend
npm start
```
The backend API will run at `http://localhost:5000`.

### 2. Start the Frontend
In another terminal, navigate to the `frontend` folder and start the Vite dev server:
```bash
cd frontend
npm run dev
```
The frontend application will run at `http://localhost:5173`.
