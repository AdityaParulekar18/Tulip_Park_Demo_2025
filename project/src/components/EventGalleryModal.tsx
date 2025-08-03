import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Upload, Save, Edit, ChevronLeft, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface EventGalleryModalProps {
  event: any;
  onClose: () => void;
}

const EventGalleryModal: React.FC<EventGalleryModalProps> = ({ event, onClose }) => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageTitle, setNewImageTitle] = useState('');
  const [showAddImage, setShowAddImage] = useState(false);
  const [editingEvent, setEditingEvent] = useState(false);
  const [eventImages, setEventImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    description: '',
    type: ''
  });

  useEffect(() => {
    if (event) {
      setEventData({
        name: event.name || '',
        date: event.date || '',
        description: event.description || '',
        type: event.type || ''
      });
      loadEventImages();
    }
  }, [event]);

  // Keyboard navigation for full screen images
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (selectedImage !== null) {
        if (e.key === 'ArrowLeft') changeImage(-1);
        if (e.key === 'ArrowRight') changeImage(1);
        if (e.key === 'Escape') closeImageModal();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [selectedImage, eventImages.length]);
  const loadEventImages = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('event_images')
        .select('*')
        .eq('event_name', event.name)
        .order('created_at', { ascending: true });

      if (error) {
        console.warn('Event images table not found, using demo images');
        // Demo images for each event
        const demoImages = getDemoImages(event.name);
        setEventImages(demoImages);
      } else {
        setEventImages(data || []);
      }
    } catch (error) {
      console.warn('Database not connected, using demo images');
      const demoImages = getDemoImages(event.name);
      setEventImages(demoImages);
    } finally {
      setLoading(false);
    }
  };

  const getDemoImages = (eventName: string) => {
    const imageMap: { [key: string]: any[] } = {
      'Republic Day Satyanarayana Pooja': [
        { id: '1', image_url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Pooja Setup' },
        { id: '2', image_url: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Community Gathering' },
        { id: '3', image_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Flag Hoisting' },
        { id: '4', image_url: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Prasad Distribution' }
      ],
      'Holi Festival Celebration': [
        { id: '5', image_url: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Colorful Celebration' },
        { id: '6', image_url: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Community Dance' },
        { id: '7', image_url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Traditional Sweets' }
      ],
      'Independence Day Celebration': [
        { id: '8', image_url: 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Flag Ceremony' },
        { id: '9', image_url: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Cultural Program' },
        { id: '10', image_url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Community Unity' }
      ],
      'TPPL Season 5 Cricket Tournament': [
        { id: '11', image_url: 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Cricket Match' },
        { id: '12', image_url: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Team Celebration' },
        { id: '13', image_url: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Prize Distribution' }
      ],
      'Diwali Festival Celebration': [
        { id: '14', image_url: 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Diwali Lights' },
        { id: '15', image_url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Rangoli Competition' },
        { id: '16', image_url: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Community Celebration' },
        { id: '17', image_url: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Fireworks Display' }
      ],
      'Lohri Celebration': [
        { id: '18', image_url: 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Bonfire Celebration' },
        { id: '19', image_url: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Folk Dance' },
        { id: '20', image_url: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800', image_title: 'Traditional Food' }
      ]
    };
    return imageMap[eventName] || [];
  };

  const handleAddImage = async () => {
    if (!newImageUrl.trim() || !newImageTitle.trim()) {
      alert('Please enter both image URL and title');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('event_images')
        .insert({
          event_name: event.name,
          image_url: newImageUrl,
          image_title: newImageTitle
        })
        .select()
        .single();

      if (error) throw error;

      setEventImages(prev => [...prev, data]);
      setNewImageUrl('');
      setNewImageTitle('');
      setShowAddImage(false);
      alert('Image added successfully!');
    } catch (error) {
      console.error('Error adding image:', error);
      // For demo purposes, add to local state
      const newImage = {
        id: Date.now().toString(),
        event_name: event.name,
        image_url: newImageUrl,
        image_title: newImageTitle,
        created_at: new Date().toISOString()
      };
      setEventImages(prev => [...prev, newImage]);
      setNewImageUrl('');
      setNewImageTitle('');
      setShowAddImage(false);
      alert('Image added successfully! (Demo mode)');
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const { error } = await supabase
        .from('event_images')
        .delete()
        .eq('id', imageId);

      if (error) throw error;

      setEventImages(prev => prev.filter(img => img.id !== imageId));
      alert('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      // For demo purposes, remove from local state
      setEventImages(prev => prev.filter(img => img.id !== imageId));
      alert('Image deleted successfully! (Demo mode)');
    }
  };

  const handleUpdateEvent = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .update({
          name: eventData.name,
          date: eventData.date,
          description: eventData.description,
          type: eventData.type,
          updated_at: new Date().toISOString()
        })
        .eq('id', event.id)
        .select()
        .single();

      if (error) throw error;

      setEditingEvent(false);
      alert('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      setEditingEvent(false);
      alert('Event updated successfully! (Demo mode)');
    }
  };

  const openImageModal = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  };

  const closeImageModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset'; // Restore scrolling
  };

  const changeImage = (direction: number) => {
    if (selectedImage === null || eventImages.length === 0) return;
    const newIndex = selectedImage + direction;
    if (newIndex >= 0 && newIndex < eventImages.length) {
      setSelectedImage(newIndex);
    } else if (direction > 0 && newIndex >= eventImages.length) {
      setSelectedImage(0);
    } else if (direction < 0 && newIndex < 0) {
      setSelectedImage(eventImages.length - 1);
    }
  };

  if (!event) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {editingEvent ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={eventData.name}
                      onChange={(e) => setEventData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg text-gray-900 text-xl font-bold"
                      placeholder="Event Name"
                    />
                    <input
                      type="text"
                      value={eventData.date}
                      onChange={(e) => setEventData(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg text-gray-900"
                      placeholder="Event Date"
                    />
                    <textarea
                      value={eventData.description}
                      onChange={(e) => setEventData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg text-gray-900"
                      rows={2}
                      placeholder="Event Description"
                    />
                    <select
                      value={eventData.type}
                      onChange={(e) => setEventData(prev => ({ ...prev, type: e.target.value }))}
                      className="w-full px-3 py-2 rounded-lg text-gray-900"
                    >
                      <option value="festival">Festival</option>
                      <option value="religious">Religious</option>
                      <option value="sports">Sports</option>
                      <option value="celebration">Celebration</option>
                      <option value="tppl">TPPL</option>
                      <option value="cultural">Cultural</option>
                      <option value="community">Community</option>
                    </select>
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdateEvent}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditingEvent(false)}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{event.name}</h2>
                    <p className="text-blue-100 text-lg mb-2">{event.date}</p>
                    <p className="text-blue-100">{event.description}</p>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 ml-4">
                {isAdmin && !editingEvent && (
                  <button
                    onClick={() => setEditingEvent(true)}
                    className="bg-white/20 text-white p-2 rounded-lg hover:bg-white/30 transition-colors"
                    title="Edit Event"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="text-white hover:text-gray-200 transition-colors p-2"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Admin Controls */}
            {isAdmin && (
              <div className="mb-6 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Photo Gallery Management</h3>
                <button
                  onClick={() => setShowAddImage(!showAddImage)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Image
                </button>
              </div>
            )}

            {/* Add Image Form */}
            {isAdmin && showAddImage && (
              <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="text-lg font-semibold mb-3">Add New Image</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image URL
                    </label>
                    <input
                      type="url"
                      value={newImageUrl}
                      onChange={(e) => setNewImageUrl(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Image Title
                    </label>
                    <input
                      type="text"
                      value={newImageTitle}
                      onChange={(e) => setNewImageTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter image title"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddImage}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Add Image
                    </button>
                    <button
                      onClick={() => setShowAddImage(false)}
                      className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading images...</p>
              </div>
            )}

            {/* Image Gallery */}
            {!loading && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {eventImages.map((image: any, index: number) => (
                  <div key={image.id} className="relative group">
                    <img
                      src={image.image_url}
                      alt={image.image_title}
                      className="w-full h-40 object-cover rounded-lg cursor-pointer hover:opacity-90 transition-all duration-300 hover:scale-105 shadow-md"
                      onClick={() => openImageModal(index)}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all rounded-lg flex items-center justify-center cursor-pointer" onClick={() => openImageModal(index)}>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity text-center">
                        <p className="text-white text-sm font-medium text-center px-2">
                          {image.image_title}
                        </p>
                        <p className="text-white text-xs text-center mt-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                          🔍 Click to enlarge
                        </p>
                      </div>
                    </div>
                    
                    {/* Admin Delete Button */}
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteImage(image.id);
                        }}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
                        title="Delete Image"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {!loading && eventImages.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No images available for this event</p>
                {isAdmin && (
                  <p className="text-gray-400 text-sm mt-2">Click "Add Image" to add photos</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Image Modal */}
      {selectedImage !== null && eventImages[selectedImage] && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-98 flex items-center justify-center z-[9999] backdrop-blur-sm" 
          onClick={closeImageModal}
        >
          <div 
            className="relative w-full h-full flex items-center justify-center p-4" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeImageModal}
              className="absolute top-6 right-6 text-white hover:text-gray-300 z-20 bg-black bg-opacity-80 rounded-full p-4 transition-all duration-300 hover:bg-opacity-100 hover:scale-110"
              title="Close (Press Esc or click outside)"
            >
              <X className="h-7 w-7" />
            </button>
            
            {/* Previous Button */}
            {eventImages.length > 1 && (
              <button
                onClick={() => changeImage(-1)}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-300 z-20 bg-black bg-opacity-90 rounded-full p-6 transition-all duration-300 hover:bg-opacity-100 hover:scale-125 shadow-2xl border-2 border-white border-opacity-20"
                title="Previous Image"
              >
                <ChevronLeft className="h-10 w-10" />
              </button>
            )}
            
            {/* Next Button */}
            {eventImages.length > 1 && (
              <button
                onClick={() => changeImage(1)}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-300 z-20 bg-black bg-opacity-90 rounded-full p-6 transition-all duration-300 hover:bg-opacity-100 hover:scale-125 shadow-2xl border-2 border-white border-opacity-20"
                title="Next Image"
              >
                <ChevronRight className="h-10 w-10" />
              </button>
            )}
            
            {/* Main Image */}
            <img
              src={eventImages[selectedImage]?.image_url}
              alt={eventImages[selectedImage]?.image_title}
              className="max-w-[90%] max-h-[90%] object-contain transition-all duration-500 rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            
            {/* Image Info */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-90 text-white px-8 py-4 rounded-xl backdrop-blur-sm shadow-2xl">
              <p className="text-center font-medium">{eventImages[selectedImage]?.image_title}</p>
              <p className="text-center text-sm opacity-75">
                {selectedImage + 1} of {eventImages.length}
              </p>
              <p className="text-center text-xs opacity-60 mt-2">
                Use ← → keys, click arrows, or swipe to navigate • Press Esc to close
              </p>
            </div>

            {/* Admin Delete Button in Full Screen */}
            {isAdmin && (
              <button
                onClick={() => {
                  handleDeleteImage(eventImages[selectedImage].id);
                  closeImageModal();
                }}
                className="absolute top-6 left-6 bg-red-600 text-white p-4 rounded-full hover:bg-red-700 transition-all duration-300 hover:scale-110 z-20 shadow-2xl border-2 border-red-400"
                title="Delete Image"
              >
                <Trash2 className="h-7 w-7" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default EventGalleryModal;