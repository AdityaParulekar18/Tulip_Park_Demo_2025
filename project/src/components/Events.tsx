import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Plus, Edit, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import EventGalleryModal from './EventGalleryModal';
import AddEventModal from './AddEventModal';

interface Event {
  id: string;
  name: string;
  date: string;
  description: string;
  type: string;
  image?: string;
  created_at: string;
}

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [showGallery, setShowGallery] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    loadEvents();
    initializeEventsData();
  }, []);

  const initializeEventsData = async () => {
    try {
      // Check if events table exists and has data
      const { data: existingEvents, error } = await supabase
        .from('events')
        .select('*')
        .limit(1);
      
      if (error && error.code === '42P01') {
        // Table doesn't exist, will use fallback events
        return;
      }
      
      if (existingEvents && existingEvents.length === 0) {
        // Table exists but is empty, populate with demo events
        await populateDemoEvents();
      }
    } catch (error) {
      console.warn('Could not initialize events data:', error);
    }
  };

  const populateDemoEvents = async () => {
    const demoEvents = [
      {
        name: 'Republic Day Satyanarayana Pooja',
        date: 'January 26, 2025',
        description: 'Annual Republic Day celebration with Satyanarayana Pooja, cultural programs, and community feast',
        type: 'religious',
        image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Holi Festival Celebration',
        date: 'March 14, 2025',
        description: 'Colorful Holi celebration with organic colors, music, dance, and traditional sweets',
        type: 'festival',
        image: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Independence Day Celebration',
        date: 'August 15, 2025',
        description: 'Patriotic celebration with flag hoisting, cultural programs, and community gathering',
        type: 'national',
        image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'TPPL Season 5 Cricket Tournament',
        date: 'October 15, 2025',
        description: 'Annual Tulip Park Premier League cricket tournament with exciting matches and prizes',
        type: 'sports',
        image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Diwali Festival Celebration',
        date: 'November 1, 2025',
        description: 'Grand Diwali celebration with lights, rangoli competition, sweets, and fireworks',
        type: 'festival',
        image: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800'
      },
      {
        name: 'Lohri Celebration',
        date: 'January 13, 2025',
        description: 'Traditional Lohri celebration with bonfire, folk songs, dance, and festive food',
        type: 'festival',
        image: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=800'
      }
    ];

    try {
      const { data, error } = await supabase
        .from('events')
        .insert(demoEvents)
        .select();
      
      if (error) throw error;
      
      console.log('Demo events populated successfully');
      loadEvents(); // Reload events after populating
    } catch (error) {
      console.warn('Could not populate demo events:', error);
    }
  };

  const loadEvents = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error loading events:', error);
        // If events table doesn't exist, show fallback events
        if (error.code === '42P01') {
          setEvents([
            {
              id: '1',
              name: 'Republic Day Satyanarayana Pooja',
              date: 'January 26, 2025',
              description: 'Annual Republic Day celebration with Satyanarayana Pooja, cultural programs, and community feast',
              type: 'religious',
              image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800',
              created_at: '2024-01-01T00:00:00Z'
            },
            {
              id: '2',
              name: 'TPPL Season 5 Cricket Tournament',
              date: 'October 15, 2025',
              description: 'Annual Tulip Park Premier League cricket tournament with exciting matches and prizes',
              type: 'sports',
              image: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800',
              created_at: '2024-01-01T00:00:00Z'
            },
            {
              id: '3',
              name: 'Diwali Festival Celebration',
              date: 'November 1, 2025',
              description: 'Grand Diwali celebration with lights, rangoli competition, sweets, and fireworks',
              type: 'festival',
              image: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800',
              created_at: '2024-01-01T00:00:00Z'
            }
          ]);
          return;
        }
        throw error;
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error loading events:', error);
      // Fallback events if there's any other error
      setEvents([
        {
          id: '1',
          name: 'Republic Day Satyanarayana Pooja',
          date: 'January 26, 2025',
          description: 'Annual Republic Day celebration with Satyanarayana Pooja, cultural programs',
          type: 'religious',
          image: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800',
          created_at: '2024-01-01T00:00:00Z'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setShowGallery(true);
  };

  const handleAddEvent = () => {
    setShowAddModal(true);
  };

  const handleEventAdded = (newEvent: Event) => {
    setEvents(prev => [newEvent, ...prev]);
    setShowAddModal(false);
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!isAdmin) return;
    
    if (confirm('Are you sure you want to delete this event?')) {
      try {
        const { error } = await supabase
          .from('events')
          .delete()
          .eq('id', eventId);

        if (error) {
          console.error('Error deleting event:', error);
          alert('Error deleting event');
        } else {
          setEvents(prev => prev.filter(event => event.id !== eventId));
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        // For demo, remove from local state
        setEvents(prev => prev.filter(event => event.id !== eventId));
      }
    }
  };

  if (loading) {
    return (
      <section id="events" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading events...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="events" className="py-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Community Events</h2>
          
          {/* Retro Box */}
          <div className="relative max-w-4xl mx-auto mb-8">
            {/* Main retro container */}
            <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 p-1 rounded-2xl transform rotate-1">
              <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 rounded-2xl transform -rotate-2">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-xl transform rotate-1">
                  <div className="relative">
                    {/* Decorative corners */}
                    <div className="absolute -top-2 -left-2 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
                    <div className="absolute -top-2 -right-2 w-4 h-4 bg-pink-400 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
                    <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '1.5s'}}></div>
                    
                    {/* Main text */}
                    <p className="text-xl font-bold text-gray-800 dark:text-white leading-relaxed">
                      🎉 Join us in celebrating festivals and special occasions together as a community 🎊
                    </p>
                    
                    {/* Decorative elements */}
                    <div className="flex justify-center mt-4 space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{animationDelay: '0.8s'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 left-1/4 text-2xl animate-bounce">✨</div>
            <div className="absolute -top-6 right-1/4 text-2xl animate-bounce" style={{animationDelay: '1s'}}>🎈</div>
            <div className="absolute -bottom-4 left-1/3 text-2xl animate-bounce" style={{animationDelay: '0.5s'}}>🎪</div>
            <div className="absolute -bottom-6 right-1/3 text-2xl animate-bounce" style={{animationDelay: '1.5s'}}>🎭</div>
          </div>

          {isAdmin && (
            <button
              onClick={handleAddEvent}
              className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              <Plus className="w-5 h-5" />
              Add New Event
            </button>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-3 cursor-pointer group border-2 border-gradient-to-r from-purple-200 via-pink-200 to-blue-200 hover:border-gradient-to-r hover:from-purple-400 hover:via-pink-400 hover:to-blue-400 relative"
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer group border-2 border-gradient-to-r from-purple-200 via-pink-200 to-blue-200 hover:border-gradient-to-r hover:from-purple-400 hover:via-pink-400 hover:to-blue-400 relative"
              style={{
                background: `linear-gradient(${document.documentElement.classList.contains('dark') ? '#1f2937' : 'white'}, ${document.documentElement.classList.contains('dark') ? '#1f2937' : 'white'}) padding-box, linear-gradient(45deg, #e879f9, #f472b6, #60a5fa) border-box`,
                border: '3px solid transparent'
              }}
              onClick={() => handleEventClick(event)}
            >
              {/* Decorative corner elements */}
              <div className="absolute top-2 left-2 w-3 h-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-70"></div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-70"></div>
              <div className="absolute bottom-2 left-2 w-3 h-3 bg-gradient-to-br from-pink-400 to-blue-400 rounded-full opacity-70"></div>
              <div className="absolute bottom-2 right-2 w-3 h-3 bg-gradient-to-br from-blue-400 to-pink-400 rounded-full opacity-70"></div>
              
              <div className="h-48 relative overflow-hidden">
                <img
                  src={event.image || 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800'}
                  alt={event.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/20 transition-all duration-500"></div>
                
                {/* Floating badge for event type */}
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide shadow-lg">
                  {event.type}
                </div>
                
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold mb-1 drop-shadow-lg">{event.name}</h3>
                  <div className="flex items-center gap-2 text-sm opacity-90">
                    <Calendar className="w-4 h-4" />
                    <span className="drop-shadow-md">{event.date}</span>
                  </div>
                </div>
                {isAdmin && (
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEvent(event.id);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
              
              <div className="p-6 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-700">
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 leading-relaxed">{event.description}</p>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-600">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>Tulip Park Ground</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-purple-600 font-medium">
                    <Users className="w-4 h-4" />
                    <span>View Gallery</span>
                  </div>
                </div>
                
                {/* Hover effect indicator */}
                <div className="mt-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-3 py-1 rounded-full">
                    🖱️ Click to view gallery
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No Events Yet</h3>
            <p className="text-gray-500 dark:text-gray-400">Check back soon for upcoming community events!</p>
          </div>
        )}
      </div>

      {showGallery && selectedEvent && (
        <EventGalleryModal
          event={selectedEvent}
          onClose={() => {
            setShowGallery(false);
            setSelectedEvent(null);
          }}
        />
      )}

      {showAddModal && (
        <AddEventModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleEventAdded}
        />
      )}
    </section>
  );
};

export default Events;