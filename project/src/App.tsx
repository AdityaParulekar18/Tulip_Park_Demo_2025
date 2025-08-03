import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Marquee from './components/Marquee';
import Hero from './components/Hero';
import Events from './components/Events';
import BuildingLayout from './components/BuildingLayout';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <Marquee />
          <Hero />
          <Events />
          <BuildingLayout />
          <ContactForm />
          <Footer />
          <Chatbot />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;