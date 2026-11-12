import { useState, useEffect } from 'react';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 font-sans">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setCurrentView('home')}>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-2xl">
                🏥
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  City Hospital
                </h1>
                <p className="text-xs text-gray-500">Caring for Your Health</p>
              </div>
            </div>
            
            <div className="hidden lg:flex items-center space-x-6">
              <button onClick={() => setCurrentView('home')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Home
              </button>
              <button onClick={() => setCurrentView('about')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About
              </button>
              <button onClick={() => setCurrentView('services')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Services
              </button>
              <button onClick={() => setCurrentView('doctors')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Doctors
              </button>
              <button onClick={() => setCurrentView('contact')} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact
              </button>
              <button onClick={() => setCurrentView('book')} className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all">
                Book Appointment
              </button>
              
              {!isLoggedIn ? (
                <button onClick={() => setCurrentView('login')} className="border-2 border-blue-500 text-blue-500 px-6 py-2 rounded-full font-semibold hover:bg-blue-500 hover:text-white transition-all">
                  Staff Login
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                      👤
                    </div>
                    <span className="text-sm font-medium text-gray-700">{currentUser?.name}</span>
                  </div>
                  <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Render pages */}
      {currentView === 'home' && <HomePage onBook={() => setCurrentView('book')} />}
      {currentView === 'about' && <AboutPage />}
      {currentView === 'services' && <ServicesPage />}
      {currentView === 'doctors' && <DoctorsPage />}
      {currentView === 'contact' && <ContactPage />}
      {currentView === 'book' && <BookAppointmentPage onBack={() => setCurrentView('home')} />}
      {currentView === 'login' && <LoginPage onLogin={handleLogin} />}
      
      {currentView === 'dashboard' && isLoggedIn && <DoctorDashboard user={currentUser} />}
      {currentView === 'dashboard' && !isLoggedIn && (
        <div className="text-center mt-20">
          <p className="text-red-500 text-xl font-bold">Please login to access the dashboard.</p>
        </div>
      )}
    </div>
  );
}

// --- HOME PAGE ---
function HomePage({ onBook }) {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/feedback')
      .then(res => res.json())
      .then(data => setFeedback(data.slice(0, 3)))
      .catch(err => console.error("Failed to fetch feedback", err));
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Your Health, <span className="text-cyan-300">Our Priority</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Experience world-class healthcare with compassionate doctors and cutting-edge technology
            </p>
            <button onClick={onBook} className="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-bold hover:shadow-2xl transform hover:scale-105 transition-all">
              Book Appointment Now →
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="text-4xl mb-3">👨‍⚕️</div>
            <h3 className="text-3xl font-bold text-blue-600 mb-2">50+</h3>
            <p className="text-gray-600">Expert Doctors</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="text-4xl mb-3">🏥</div>
            <h3 className="text-3xl font-bold text-cyan-600 mb-2">24/7</h3>
            <p className="text-gray-600">Emergency Care</p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-shadow">
            <div className="text-4xl mb-3">❤️</div>
            <h3 className="text-3xl font-bold text-pink-600 mb-2">10,000+</h3>
            <p className="text-gray-600">Happy Patients</p>
          </div>
        </div>
      </div>

      {/* Services Preview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Specialties</h2>
          <p className="text-xl text-gray-600">Comprehensive care across all medical disciplines</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: '🫀', name: 'Cardiology', desc: 'Advanced heart care and surgery', color: 'from-red-500 to-pink-500' },
            { icon: '🧒', name: 'Pediatrics', desc: 'Specialized care for children', color: 'from-blue-500 to-cyan-500' },
            { icon: '🧠', name: 'Neurology', desc: 'Brain and nervous system experts', color: 'from-purple-500 to-pink-500' }
          ].map((service, idx) => (
            <div key={idx} className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
              <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feedback Section */}
      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">Real feedback from our valued patients</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {feedback.map(fb => (
              <div key={fb.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {fb.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">{fb.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(fb.rating)].map((_, i) => (
                        <span key={i}>⭐</span>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{fb.message}"</p>
                <p className="text-sm text-gray-400 mt-4">{fb.date}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">City Hospital</h3>
              <p className="text-gray-400">Providing exceptional healthcare services with compassion and excellence.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <p className="text-gray-400">📞 Emergency: +1 234-567-8900</p>
              <p className="text-gray-400">📧 info@cityhospital.com</p>
              <p className="text-gray-400">📍 123 Medical Center Blvd</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Hours</h3>
              <p className="text-gray-400">Monday - Friday: 8AM - 8PM</p>
              <p className="text-gray-400">Saturday: 9AM - 6PM</p>
              <p className="text-gray-400">Emergency: 24/7</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 City Hospital. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// --- ABOUT PAGE ---
function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">About City Hospital</h1>
        <p className="text-xl text-gray-600">Dedicated to excellence in healthcare since 1990</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-gray-600 text-lg mb-4">
            At City Hospital, we are committed to providing the highest quality healthcare services with compassion, integrity, and respect for every patient.
          </p>
          <p className="text-gray-600 text-lg mb-4">
            Our team of experienced doctors, nurses, and support staff work together to ensure that every patient receives personalized care in a comfortable and healing environment.
          </p>
          <p className="text-gray-600 text-lg">
            We believe that healthcare is a fundamental right, and we strive to make quality medical services accessible to all members of our community.
          </p>
        </div>
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-12 text-white text-center">
          <div className="text-6xl mb-4">🏥</div>
          <h3 className="text-2xl font-bold mb-2">30+ Years</h3>
          <p className="text-blue-100">of Excellence in Healthcare</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h3>
          <p className="text-gray-600">To be the leading healthcare provider recognized for clinical excellence and compassionate care.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">💎</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Values</h3>
          <p className="text-gray-600">Compassion, Integrity, Excellence, Innovation, and Patient-Centered Care guide everything we do.</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-5xl mb-4">🏆</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Our Achievements</h3>
          <p className="text-gray-600">Award-winning hospital with multiple accreditations and recognition for healthcare excellence.</p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-12 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Why Choose City Hospital?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div>
            <div className="text-4xl mb-2">👨‍⚕️</div>
            <h4 className="font-bold mb-2">Expert Doctors</h4>
            <p className="text-sm text-blue-100">50+ specialists</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🔬</div>
            <h4 className="font-bold mb-2">Modern Equipment</h4>
            <p className="text-sm text-blue-100">Latest technology</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🚑</div>
            <h4 className="font-bold mb-2">24/7 Emergency</h4>
            <p className="text-sm text-blue-100">Always available</p>
          </div>
          <div>
            <div className="text-4xl mb-2">❤️</div>
            <h4 className="font-bold mb-2">Patient Care</h4>
            <p className="text-sm text-blue-100">Compassionate service</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- SERVICES PAGE ---
function ServicesPage() {
  const services = [
    { icon: '🫀', name: 'Cardiology', desc: 'Comprehensive heart care including diagnostics, treatment, and surgery for all cardiac conditions.', color: 'from-red-500 to-pink-500' },
    { icon: '🧒', name: 'Pediatrics', desc: 'Specialized healthcare for infants, children, and adolescents with dedicated pediatric specialists.', color: 'from-blue-500 to-cyan-500' },
    { icon: '🧠', name: 'Neurology', desc: 'Expert diagnosis and treatment of brain, spinal cord, and nervous system disorders.', color: 'from-purple-500 to-pink-500' },
    { icon: '🦴', name: 'Orthopedics', desc: 'Advanced care for bones, joints, muscles, and skeletal system injuries and conditions.', color: 'from-green-500 to-teal-500' },
    { icon: '👁️', name: 'Ophthalmology', desc: 'Complete eye care services from routine exams to complex surgical procedures.', color: 'from-indigo-500 to-blue-500' },
    { icon: '🦷', name: 'Dental Care', desc: 'Modern dental treatments including cosmetic dentistry, orthodontics, and oral surgery.', color: 'from-cyan-500 to-blue-500' },
    { icon: '🫁', name: 'Pulmonology', desc: 'Specialized care for respiratory system diseases and conditions.', color: 'from-teal-500 to-green-500' },
    { icon: '🩺', name: 'General Medicine', desc: 'Comprehensive primary care for all ages with experienced general practitioners.', color: 'from-orange-500 to-red-500' },
    { icon: '🧬', name: 'Oncology', desc: 'Advanced cancer treatment with cutting-edge technology and compassionate care.', color: 'from-pink-500 to-purple-500' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Services</h1>
        <p className="text-xl text-gray-600">Comprehensive healthcare services for all your medical needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => (
          <div key={idx} className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <div className={`w-20 h-20 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform`}>
              {service.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.name}</h3>
            <p className="text-gray-600 leading-relaxed">{service.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- DOCTORS PAGE ---
function DoctorsPage() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error("Failed to fetch doctors", err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Our Doctors</h1>
        <p className="text-xl text-gray-600">Meet our team of experienced healthcare professionals</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {doctors.map(doctor => (
          <div key={doctor.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300">
            <div className="text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-6xl mx-auto mb-6">
                {doctor.image}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">{doctor.name}</h3>
              <p className="text-blue-600 font-semibold mb-4">{doctor.specialization}</p>
              <div className="flex justify-center space-x-4 text-sm text-gray-600">
                <div>
                  <p className="font-bold text-gray-800">{doctor.experience}</p>
                  <p className="text-xs">Experience</p>
                </div>
                <div className="border-l border-gray-300"></div>
                <div>
                  <p className="font-bold text-gray-800">${doctor.fee}</p>
                  <p className="text-xs">Consultation</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- CONTACT PAGE ---
function ContactPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
        <p className="text-xl text-gray-600">We're here to help. Reach out to us anytime.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Get in Touch</h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                📞
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Phone</h3>
                <p className="text-gray-600">Emergency: +1 234-567-8900</p>
                <p className="text-gray-600">General: +1 234-567-8901</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                📧
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Email</h3>
                <p className="text-gray-600">info@cityhospital.com</p>
                <p className="text-gray-600">appointments@cityhospital.com</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                📍
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Address</h3>
                <p className="text-gray-600">123 Medical Center Boulevard</p>
                <p className="text-gray-600">Healthcare City, HC 12345</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                🕐
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">Working Hours</h3>
                <p className="text-gray-600">Monday - Friday: 8:00 AM - 8:00 PM</p>
                <p className="text-gray-600">Saturday: 9:00 AM - 6:00 PM</p>
                <p className="text-gray-600">Sunday: Closed (Emergency 24/7)</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-6">Emergency Contact</h2>
          <p className="text-blue-100 mb-8">For medical emergencies, please call our 24/7 emergency hotline immediately.</p>
          
          <div className="bg-white bg-opacity-20 rounded-2xl p-6 mb-6">
            <div className="text-4xl mb-2">🚑</div>
            <h3 className="text-2xl font-bold mb-2">Emergency Hotline</h3>
            <p className="text-3xl font-bold">+1 234-567-8900</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">✓</div>
              <p>Ambulance service available 24/7</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-2xl">✓</div>
              <p>Emergency doctors on standby</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-2xl">✓</div>
              <p>ICU and critical care facilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form Section */}
      <div className="mt-16 bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <FeedbackForm />
      </div>
    </div>
  );
}

// --- FEEDBACK FORM COMPONENT ---
function FeedbackForm() {
  const [formData, setFormData] = useState({ name: '', rating: 5, message: '' });
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Submitting...');
    
    try {
      const response = await fetch('http://localhost:5000/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      
      if (response.ok) {
        setMessage('✅ Thank you for your feedback!');
        setFormData({ name: '', rating: 5, message: '' });
      } else {
        setMessage('❌ Error: ' + data.error);
      }
    } catch (error) {
      setMessage('❌ Failed to submit feedback.');
    }
  };

  return (
    <div>
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
          💬
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Share Your Feedback</h2>
        <p className="text-gray-600">We value your opinion. Help us improve our services.</p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
          <input type="text" placeholder="Enter your name" required
            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({...formData, rating: star})}
                className={`text-4xl transition-transform hover:scale-110 ${
                  star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
              >
                ⭐
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Your Feedback</label>
          <textarea placeholder="Share your experience with us..." required rows="5"
            value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
            className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none" />
        </div>

        <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
          Submit Feedback
        </button>
      </form>

      {message && (
        <div className={`mt-6 p-4 rounded-xl text-center font-semibold max-w-2xl mx-auto ${
          message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  );
}

// --- BOOKING PAGE ---
function BookAppointmentPage({ onBack }) {
  const [doctors, setDoctors] = useState([]);
  const [formData, setFormData] = useState({ patientName: '', doctorId: '', date: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error("Failed to fetch doctors", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Booking...');
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('✅ Appointment booked successfully!');
        setFormData({ patientName: '', doctorId: '', date: '' });
      } else {
        setMessage('❌ Error: ' + data.error);
      }
    } catch (error) {
      setMessage('❌ Failed to connect to server.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
            📅
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Your Appointment</h2>
          <p className="text-gray-600">Schedule a visit with our expert doctors</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input type="text" placeholder="Enter your full name" required
              value={formData.patientName} onChange={e => setFormData({...formData, patientName: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Select Doctor</label>
            <select required value={formData.doctorId} onChange={e => setFormData({...formData, doctorId: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors">
              <option value="">Choose a specialist</option>
              {doctors.map(doc => (
                <option key={doc.id} value={doc.id}>{doc.name} - {doc.specialization}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Date & Time</label>
            <input type="datetime-local" required
              value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" />
          </div>

          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
            Confirm Booking
          </button>
        </form>

        {message && (
          <div className={`mt-6 p-4 rounded-xl text-center font-semibold ${
            message.includes('✅') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {message}
          </div>
        )}

        <button onClick={onBack} className="mt-6 w-full text-blue-500 hover:text-blue-700 font-medium">
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

// --- LOGIN PAGE ---
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        onLogin(data.user);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Server connection failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
            👨‍⚕️
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Staff Login</h2>
          <p className="text-gray-600">Access your hospital dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input type="email" placeholder="staff@hospital.com" required
              value={email} onChange={e => setEmail(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input type="password" placeholder="Enter your password" required
              value={password} onChange={e => setPassword(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors" />
          </div>

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl text-center font-semibold">
              {error}
            </div>
          )}

          <button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl font-bold text-lg hover:shadow-xl transform hover:scale-105 transition-all">
            Login
          </button>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-xl">
          <p className="text-sm font-bold text-blue-900 mb-2">Test Credentials:</p>
          <div className="text-xs text-blue-700 space-y-1">
            <p>👑 Admin: admin@hospital.com / admin123</p>
            <p>👨‍⚕️ Doctor: doctor@hospital.com / doctor123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- DASHBOARD ---
function DoctorDashboard({ user }) {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = () => {
    fetch('http://localhost:5000/api/dashboard/appointments')
      .then(res => res.json())
      .then(data => setAppointments(data));
  };

  useEffect(() => { fetchAppointments(); }, []);

  const updateStatus = async (id, newStatus) => {
    await fetch(`http://localhost:5000/api/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    fetchAppointments();
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'Pending').length,
    approved: appointments.filter(a => a.status === 'Approved').length
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl p-8 text-white mb-8 shadow-xl">
        <h2 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h2>
        <p className="text-blue-100">Here's your dashboard overview for today</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Appointments</p>
              <p className="text-3xl font-bold text-gray-800">{stats.total}</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Pending</p>
              <p className="text-3xl font-bold text-gray-800">{stats.pending}</p>
            </div>
            <div className="text-4xl">⏳</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Approved</p>
              <p className="text-3xl font-bold text-gray-800">{stats.approved}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800">Appointments List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Patient Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date & Time</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">
                    <div className="text-4xl mb-2">📭</div>
                    No appointments yet
                  </td>
                </tr>
              ) : (
                appointments.map(apt => (
                  <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold mr-3">
                          {apt.patientName.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">{apt.patientName}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(apt.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        apt.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                        apt.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-2">
                        <button onClick={() => updateStatus(apt.id, 'Approved')} 
                          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                          Approve
                        </button>
                        <button onClick={() => updateStatus(apt.id, 'Cancelled')} 
                          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;