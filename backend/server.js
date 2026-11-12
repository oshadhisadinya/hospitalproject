const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- MOCK DATA ---
let doctors = [
    { id: 1, name: 'Dr. Sarah Smith', specialization: 'Cardiology', fee: 150, experience: '15 years', image: '👩‍⚕️' },
    { id: 2, name: 'Dr. John Doe', specialization: 'Pediatrics', fee: 100, experience: '10 years', image: '👨‍⚕️' },
    { id: 3, name: 'Dr. Emily Chen', specialization: 'Dermatology', fee: 120, experience: '8 years', image: '👩‍⚕️' },
    { id: 4, name: 'Dr. Michael Brown', specialization: 'Neurology', fee: 180, experience: '20 years', image: '👨‍⚕️' },
    { id: 5, name: 'Dr. Lisa Wang', specialization: 'Orthopedics', fee: 160, experience: '12 years', image: '👩‍⚕️' },
    { id: 6, name: 'Dr. David Lee', specialization: 'Ophthalmology', fee: 140, experience: '14 years', image: '👨‍⚕️' }
];

let appointments = [
    { id: 1, patientName: 'Alice Johnson', doctorId: 1, date: '2026-11-15T10:00', status: 'Approved' }
];

let feedback = [
    { id: 1, name: 'John Doe', rating: 5, message: 'Excellent service! The doctors are very caring and professional.', date: '2026-11-10' },
    { id: 2, name: 'Jane Smith', rating: 4, message: 'Good experience. Clean facilities and friendly staff.', date: '2026-11-08' },
    { id: 3, name: 'Mike Wilson', rating: 5, message: 'Best hospital in the city. Highly recommended!', date: '2026-11-05' }
];

// --- PUBLIC ROUTES ---

// Get all doctors
app.get('/api/doctors', (req, res) => {
    res.json(doctors);
});

// Book appointment
app.post('/api/appointments', (req, res) => {
    const { patientName, doctorId, date } = req.body;
    
    if (!patientName || !doctorId || !date) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newAppointment = {
        id: appointments.length + 1,
        patientName,
        doctorId: parseInt(doctorId),
        date,
        status: 'Pending'
    };
    
    appointments.push(newAppointment);
    res.status(201).json({ message: 'Appointment booked successfully!', data: newAppointment });
});

// Submit feedback
app.post('/api/feedback', (req, res) => {
    const { name, rating, message } = req.body;
    
    if (!name || !rating || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const newFeedback = {
        id: feedback.length + 1,
        name,
        rating: parseInt(rating),
        message,
        date: new Date().toISOString().split('T')[0]
    };
    
    feedback.unshift(newFeedback); // Add to beginning
    res.status(201).json({ message: 'Feedback submitted successfully!', data: newFeedback });
});

// Get all feedback
app.get('/api/feedback', (req, res) => {
    res.json(feedback);
});

// --- STAFF LOGIN ---
const staffUsers = [
    { email: 'admin@hospital.com', password: 'admin123', role: 'admin', name: 'Admin User' },
    { email: 'doctor@hospital.com', password: 'doctor123', role: 'doctor', name: 'Dr. Sarah' },
    { email: 'reception@hospital.com', password: 'rec123', role: 'receptionist', name: 'Reception Staff' }
];

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = staffUsers.find(u => u.email === email && u.password === password);
    
    if (user) {
        res.json({ 
            message: 'Login successful', 
            user: { email: user.email, role: user.role, name: user.name } 
        });
    } else {
        res.status(401).json({ error: 'Invalid email or password!' });
    }
});

// --- DASHBOARD ROUTES ---
app.get('/api/dashboard/appointments', (req, res) => {
    res.json(appointments);
});

app.put('/api/appointments/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const apt = appointments.find(a => a.id === parseInt(id));
    if (apt) {
        apt.status = status;
        res.json({ message: 'Status updated', data: apt });
    } else {
        res.status(404).json({ error: 'Appointment not found' });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});