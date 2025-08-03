import React, { useState } from 'react';
import { Building2, Menu, X, Shield, LogOut, Sun, Moon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import AdminLogin from './AdminLogin';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const { isAdmin, logout } = useAuth();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button 
            onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer"
            title="Go to top"
          >
            <Building2 className="h-8 w-8 text-blue-700" />
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Tulip Park CHSL</h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">Marol, Andheri East</p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            <button onClick={() => { document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-300 font-medium">Home</button>
            <button onClick={() => { document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-green-600 transition-all duration-300 font-medium">Events</button>
            <button onClick={() => { document.getElementById('layout')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-purple-600 transition-all duration-300 font-medium">Building Layout</button>
            <button onClick={() => { document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }); }} className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-300 font-medium">Contact</button>
            
            {/* Dark Mode Toggle */}
            <div className="ml-4 pl-4 border-l border-gray-200 dark:border-gray-600">
              <button
                onClick={toggleDarkMode}
                className="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-indigo-600 transition-all duration-300 font-medium"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
              >
                {isDarkMode ? <Sun className="h-4 w-4 mr-1" /> : <Moon className="h-4 w-4 mr-1" />}
                {isDarkMode ? 'Light' : 'Dark'}
              </button>
            </div>
            
            {/* Admin Section */}
            <div className="ml-4 pl-4 border-l border-gray-200">
              {isAdmin ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-600 font-medium">Admin</span>
                  <button
                    onClick={logout}
                    className="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-300 font-medium"
                    title="Logout"
                  >
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="flex items-center px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-300 font-medium"
                  title="Admin Login"
                >
                  <Shield className="h-4 w-4 mr-1" />
                  Admin
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
            <div className="flex flex-col space-y-2 px-2">
              <button onClick={() => { document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-blue-600 transition-all duration-300 font-medium">Home</button>
              <button onClick={() => { document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-green-600 transition-all duration-300 font-medium">Events</button>
              <button onClick={() => { document.getElementById('layout')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-purple-600 transition-all duration-300 font-medium">Building Layout</button>
              <button onClick={() => { document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }); setIsMenuOpen(false); }} className="w-full text-left px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-300 font-medium">Contact</button>
              
              {/* Mobile Dark Mode Toggle */}
              <div className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                <button
                  onClick={() => { toggleDarkMode(); setIsMenuOpen(false); }}
                  className="w-full text-left px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-indigo-600 transition-all duration-300 font-medium"
                >
                  {isDarkMode ? <Sun className="h-4 w-4 mr-2 inline" /> : <Moon className="h-4 w-4 mr-2 inline" />}
                  {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                </button>
              </div>
              
              {/* Mobile Admin Section */}
              <div className="border-t border-gray-300 dark:border-gray-600 pt-2 mt-2">
                {isAdmin ? (
                  <div className="space-y-2">
                    <div className="px-4 py-2 text-green-600 dark:text-green-400 font-medium">Admin Mode Active</div>
                    <button
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                      className="w-full text-left px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-300 font-medium"
                    >
                      <LogOut className="h-4 w-4 mr-2 inline" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => { setShowAdminLogin(true); setIsMenuOpen(false); }}
                    className="w-full text-left px-4 py-3 rounded-lg text-gray-700 dark:text-gray-300 hover:text-white hover:bg-red-600 transition-all duration-300 font-medium"
                  >
                    <Shield className="h-4 w-4 mr-2 inline" />
                    Admin Login
                  </button>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
      </header>
      
      <AdminLogin 
        isOpen={showAdminLogin} 
        onClose={() => { setShowAdminLogin(false); setIsMenuOpen(false); }} 
      />
    </>
  );
};

export default Header;