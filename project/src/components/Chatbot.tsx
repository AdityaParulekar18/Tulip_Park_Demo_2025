import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, MapPin, Building, Phone, Mail } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FlatData {
  flat_number: string;
  wing: string;
  floor: number;
  type: string;
  area: string;
  status: string;
  owner_name: string;
  owner_phone: string;
  owner_email: string;
  rent_price?: number;
  sale_price?: number;
  tenant_name?: string;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [flatsData, setFlatsData] = useState<FlatData[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadFlatsData();
    if (isOpen && messages.length === 0) {
      addBotMessage("Hello! 👋 I'm your Tulip Park assistant. I can help you with:\n\n🏢 Building information\n📍 Location & directions\n🏠 Available flats for rent/sale\n📞 Contact details\n🎉 Events & community info\n\nWhat would you like to know?");
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadFlatsData = async () => {
    try {
      const { data, error } = await supabase
        .from('flats')
        .select('*');
      
      if (data) {
        setFlatsData(data);
      }
    } catch (error) {
      console.warn('Could not load flats data for chatbot');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addMessage = (text: string, isBot: boolean = false) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const addBotMessage = (text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      addMessage(text, true);
      setIsTyping(false);
    }, 1000);
  };

  const getAvailableFlats = (status: string) => {
    return flatsData.filter(flat => flat.status === status);
  };

  const getFlatByNumber = (flatNumber: string) => {
    return flatsData.find(flat => 
      flat.flat_number.toLowerCase() === flatNumber.toLowerCase() ||
      flat.flat_number.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === flatNumber.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    );
  };

  const formatFlatInfo = (flat: FlatData) => {
    let info = `🏠 **Flat ${flat.flat_number}**\n`;
    info += `📍 Wing: ${flat.wing}, Floor: ${flat.floor}\n`;
    info += `🏡 Type: ${flat.type} (${flat.area})\n`;
    info += `📊 Status: ${flat.status.replace('-', ' ').toUpperCase()}\n`;
    info += `👤 Owner: ${flat.owner_name}\n`;
    info += `📞 Contact: ${flat.owner_phone}\n`;
    
    if (flat.status === 'rented' && flat.rent_price) {
      info += `💰 Rent: ₹${flat.rent_price.toLocaleString()}/month\n`;
      if (flat.tenant_name) {
        info += `🏠 Tenant: ${flat.tenant_name}\n`;
      }
    }
    
    if (flat.status === 'for-rent' && flat.rent_price) {
      info += `💰 Expected Rent: ₹${flat.rent_price.toLocaleString()}/month\n`;
    }
    
    if (flat.status === 'for-sale' && flat.sale_price) {
      info += `💰 Sale Price: ₹${(flat.sale_price / 100000).toFixed(1)} Lakhs\n`;
    }
    
    return info;
  };

  const processUserMessage = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    // Location and directions
    if (lowerMessage.includes('location') || lowerMessage.includes('address') || lowerMessage.includes('where') || lowerMessage.includes('reach') || lowerMessage.includes('direction')) {
      return `📍 **Tulip Park CHSL Location:**\n\n🏢 Address: Military Road, Opposite Prime Academy School, Marol, Andheri East, Mumbai - 400059\n\n🚗 **How to Reach:**\n• By Train: Marol Metro Station (5 mins)\n• By Bus: Multiple BEST buses to Andheri East\n• By Car: Easy access from Western Express Highway\n• Landmarks: Opposite Prime Academy School\n\n📱 Click here to view on Google Maps: https://maps.google.com/?q=Tulip+Park+CHSL+Military+Road+Andheri+East`;
    }
    
    // Building information
    if (lowerMessage.includes('building') || lowerMessage.includes('wing') || lowerMessage.includes('floor') || lowerMessage.includes('total flat')) {
      const totalFlats = flatsData.length || 64;
      const aWingFlats = flatsData.filter(f => f.wing === 'A').length || 28;
      const bWingFlats = flatsData.filter(f => f.wing === 'B').length || 36;
      
      return `🏢 **Tulip Park Building Information:**\n\n🏗️ **A Wing:**\n• 7 Floors\n• 4 Flats per floor\n• Total: ${aWingFlats} flats\n• Flat types: 2BHK & 3BHK\n\n🏗️ **B Wing:**\n• 6 Floors\n• 6 Flats per floor\n• Total: ${bWingFlats} flats\n• Flat types: 2BHK\n\n📊 **Total Flats:** ${totalFlats}\n📐 **Flat Sizes:** 850-1200 sq ft`;
    }
    
    // Available flats for rent
    if (lowerMessage.includes('rent') && (lowerMessage.includes('available') || lowerMessage.includes('for rent'))) {
      const rentFlats = getAvailableFlats('for-rent');
      if (rentFlats.length === 0) {
        return `🏠 **Flats Available for Rent:**\n\nCurrently no flats are available for rent. Please check back later or contact the society office for updates.\n\n📞 Contact: +91 98765 43210`;
      }
      
      let response = `🏠 **Flats Available for Rent (${rentFlats.length}):**\n\n`;
      rentFlats.forEach(flat => {
        response += `• ${flat.flat_number} (${flat.type}) - ₹${flat.rent_price?.toLocaleString() || 'Price on request'}/month\n`;
      });
      response += `\n💡 For detailed information about any flat, just ask "Tell me about flat [number]"`;
      
      return response;
    }
    
    // Available flats for sale
    if (lowerMessage.includes('sale') && (lowerMessage.includes('available') || lowerMessage.includes('for sale'))) {
      const saleFlats = getAvailableFlats('for-sale');
      if (saleFlats.length === 0) {
        return `🏠 **Flats Available for Sale:**\n\nCurrently no flats are available for sale. Please check back later or contact the society office for updates.\n\n📞 Contact: +91 98765 43210`;
      }
      
      let response = `🏠 **Flats Available for Sale (${saleFlats.length}):**\n\n`;
      saleFlats.forEach(flat => {
        response += `• ${flat.flat_number} (${flat.type}) - ₹${flat.sale_price ? (flat.sale_price / 100000).toFixed(1) + ' Lakhs' : 'Price on request'}\n`;
      });
      response += `\n💡 For detailed information about any flat, just ask "Tell me about flat [number]"`;
      
      return response;
    }
    
    // Specific flat information
    if (lowerMessage.includes('flat') && (lowerMessage.includes('tell me about') || lowerMessage.includes('details') || lowerMessage.includes('info'))) {
      const flatMatch = message.match(/[a-zA-Z]?\d{3,4}/);
      if (flatMatch) {
        const flatNumber = flatMatch[0];
        const flat = getFlatByNumber(flatNumber);
        if (flat) {
          return formatFlatInfo(flat);
        } else {
          return `❌ Sorry, I couldn't find flat ${flatNumber}. Please check the flat number and try again.\n\n💡 Flat numbers are like A101, A202, B305, etc.`;
        }
      }
      return `❓ Please specify the flat number (e.g., "Tell me about flat A101" or "Details of B205")`;
    }
    
    // Contact information
    if (lowerMessage.includes('contact') || lowerMessage.includes('phone') || lowerMessage.includes('email') || lowerMessage.includes('office')) {
      return `📞 **Contact Information:**\n\n🏢 **Society Office:**\n📞 Phone: +91 98765 43210\n📧 Email: info@tulippark.com\n\n👥 **Society Officials:**\n\n🔹 **Secretary - Mr. Shetty**\n📞 +91 9833645789\n📧 secretary@tulippark.com\n\n🔹 **Chairman - Mr. Waghela**\n📞 +91 9867324560\n📧 chairman@tulippark.com\n\n🔹 **Treasurer - Mr. Parulekar**\n📞 +91 9967346780\n📧 treasurer@tulippark.com`;
    }
    
    // Events information
    if (lowerMessage.includes('event') || lowerMessage.includes('celebration') || lowerMessage.includes('festival') || lowerMessage.includes('activity')) {
      return `🎉 **Community Events & Celebrations:**\n\n🎊 **Upcoming Events:**\n• Republic Day Satyanarayana Pooja\n• Holi Festival Celebration\n• Independence Day Celebration\n• TPPL Cricket Tournament\n• Diwali Festival Celebration\n• Lohri Celebration\n\n📸 **Event Gallery:**\nCheck our website's Events section for photos and details of past celebrations!\n\n📱 **Follow Us:**\nInstagram: @tulip_park_tales`;
    }
    
    // Amenities
    if (lowerMessage.includes('amenities') || lowerMessage.includes('facilities') || lowerMessage.includes('features')) {
      return `🏢 **Tulip Park Amenities:**\n\n✅ **Building Features:**\n• Modern elevator systems\n• 24/7 security\n• Power backup\n• Water storage tanks\n• Covered parking\n\n🎯 **Community Features:**\n• Society office\n• Common meeting area\n• Festival celebration space\n• Cricket ground for TPPL\n\n🌟 **Location Benefits:**\n• Prime Andheri East location\n• Near Metro station\n• Shopping centers nearby\n• Schools and hospitals in vicinity`;
    }
    
    // Maintenance
    if (lowerMessage.includes('maintenance') || lowerMessage.includes('charges') || lowerMessage.includes('fee')) {
      return `💰 **Maintenance Information:**\n\n📅 **Payment Schedule:**\nMaintenance is due by the 10th of every month\n\n💳 **Payment Methods:**\nContact the society office for payment details\n\n📞 **For Queries:**\nTreasurer - Mr. Parulekar\n📞 +91 9967346780\n📧 treasurer@tulippark.com\n\n⚠️ **Important:**\nPlease ensure timely payment to avoid any inconvenience`;
    }
    
    // Default response for unrecognized queries
    return `🤔 I'm not sure about that specific information. Here's what I can help you with:\n\n🏢 Building & flat information\n📍 Location & directions\n🏠 Available flats for rent/sale\n📞 Contact details\n🎉 Events & community info\n💰 Maintenance information\n🏗️ Amenities & facilities\n\n💡 **Try asking:**\n• "Where is Tulip Park located?"\n• "Show me flats available for rent"\n• "Tell me about flat A101"\n• "What are the contact details?"\n• "What events do you organize?"`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    
    addMessage(inputText);
    const response = processUserMessage(inputText);
    addBotMessage(response);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen 
            ? 'bg-red-600 hover:bg-red-700' 
            : 'bg-blue-600 hover:bg-blue-700 animate-pulse'
        } text-white`}
        title={isOpen ? 'Close Chat' : 'Chat with Tulip Park Assistant'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Tulip Park Assistant</h3>
                  <p className="text-xs text-blue-100">Always here to help!</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-blue-600 text-white'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.isBot && (
                      <Bot className="h-4 w-4 mt-1 text-blue-600 flex-shrink-0" />
                    )}
                    {!message.isBot && (
                      <User className="h-4 w-4 mt-1 text-blue-100 flex-shrink-0" />
                    )}
                    <div className="whitespace-pre-line text-sm leading-relaxed">
                      {message.text}
                    </div>
                  </div>
                  <div className={`text-xs mt-2 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 p-3 rounded-2xl">
                  <div className="flex items-center gap-2">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about Tulip Park..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Ask about flats, location, events, or contact info
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;