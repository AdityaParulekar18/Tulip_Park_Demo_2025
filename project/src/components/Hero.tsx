import React from 'react';
import { MapPin, Users, Building } from 'lucide-react';

const Hero = () => {
  const openGoogleMaps = () => {
    // Exact location with landmarks for precise mapping
    const location = "Tulip Park CHSL, Military Road, Opposite Prime Academy School, Andheri East, Mumbai";
    const encodedLocation = encodeURIComponent(location);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedLocation}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <section id="home" className="bg-gradient-to-r from-blue-700 to-blue-900 dark:from-gray-800 dark:to-gray-900 text-white py-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Tulip Park CHSL
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 dark:text-gray-300">
            Your Premium Residential Community in Marol, Andheri East
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div 
              className="bg-white/10 dark:bg-gray-700/30 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/20 dark:hover:bg-gray-600/40 transition-all duration-300 transform hover:scale-105"
              onClick={openGoogleMaps}
              title="Click to view location on Google Maps"
            >
              <MapPin className="h-8 w-8 mx-auto mb-4 text-blue-200 dark:text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">Prime Location</h3>
              <p className="text-blue-100 dark:text-gray-300">Military Road, Opposite Prime Academy School - Prime Andheri East location</p>
              <p className="text-xs text-blue-200 dark:text-gray-400 mt-2 opacity-75">📍 Click to view on Google Maps</p>
            </div>
            
            <div 
              className="bg-white/10 dark:bg-gray-700/30 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/20 dark:hover:bg-gray-600/40 transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('layout')?.scrollIntoView({ behavior: 'smooth' })}
              title="Click to view building layout"
            >
              <Building className="h-8 w-8 mx-auto mb-4 text-blue-200 dark:text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">Building Layout</h3>
              <p className="text-blue-100 dark:text-gray-300">Interactive building layout with detailed flat information</p>
              <p className="text-xs text-blue-200 dark:text-gray-400 mt-2 opacity-75">🏢 Click to view layout</p>
            </div>
            
            <div 
              className="bg-white/10 dark:bg-gray-700/30 backdrop-blur-sm rounded-lg p-6 cursor-pointer hover:bg-white/20 dark:hover:bg-gray-600/40 transition-all duration-300 transform hover:scale-105"
              onClick={() => document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' })}
              title="Click to view community events"
            >
              <Users className="h-8 w-8 mx-auto mb-4 text-blue-200 dark:text-gray-300" />
              <h3 className="text-lg font-semibold mb-2">Community Living</h3>
              <p className="text-blue-100 dark:text-gray-300">Vibrant community with regular events and celebrations</p>
              <p className="text-xs text-blue-200 dark:text-gray-400 mt-2 opacity-75">🎉 Click to view events</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;