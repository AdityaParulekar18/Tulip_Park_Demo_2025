import React from 'react';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 dark:bg-black text-white py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Society Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Building2 className="h-8 w-8 text-blue-400" />
              <div>
                <h3 className="text-xl font-bold">Tulip Park CHSL</h3>
                <p className="text-gray-400 dark:text-gray-500">Cooperative Housing Society</p>
              </div>
            </div>
            <p className="text-gray-300 dark:text-gray-400 mb-4">
              A premium residential community in Marol, Andheri East, offering modern amenities and a vibrant social life.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <button 
                  onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Tulip+Park+CHSL,+Military+Road,+Opposite+Prime+Academy+School,+Andheri+East,+Mumbai', '_blank')}
                  className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors text-left"
                >
                  Marol, Andheri East, Mumbai - 400059
                </button>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <button 
                  onClick={() => window.open('tel:+919876543210')}
                  className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors"
                >
                  +91 8369561904
                </button>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                <button 
                  onClick={() => window.open('mailto:info@tulippark.com')}
                  className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors"
                >
                  info@tulippark.com
                </button>
              </div>
              <div className="flex items-center gap-3">
                <svg className="h-5 w-5 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                <button 
                  onClick={() => window.open('https://www.instagram.com/tulip_park_tales?igsh=azhqaGZhY202aHRj', '_blank')}
                  className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors"
                >
                  @tulip_park_tales
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#home" className="block text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Home</a>
              <a href="#events" className="block text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Events Gallery</a>
              <a href="#layout" className="block text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Building Layout</a>
              <a href="#contact-form" className="block text-gray-300 dark:text-gray-400 hover:text-blue-400 transition-colors">Contact Form</a>
              <div className="pt-2">
                <p className="text-sm text-gray-400 dark:text-gray-500">Society Registration: MH/Mumbai/CHSL/2020/123456</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 dark:text-gray-500">
            © 2024 Tulip Park CHSL. All rights reserved. | Website maintained by Aditya Parulekar
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;