import React, { useState, useEffect } from 'react';
import { Bell, Calendar } from 'lucide-react';

const Marquee = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60); // Update every hour

    return () => clearInterval(timer);
  }, []);

  // Upcoming events - automatically show 15 days before event
  const upcomingEvents = [
    {
      name: "Republic Day Satyanarayana Pooja",
      date: new Date(currentDate.getFullYear(), 0, 26), // January 26
      type: "religious"
    },
    {
      name: "Holi Festival Celebration",
      date: new Date(currentDate.getFullYear(), 2, 25), // March 25 (approximate)
      type: "festival"
    },
    {
      name: "Independence Day Celebration",
      date: new Date(currentDate.getFullYear(), 7, 15), // August 15
      type: "national"
    },
    {
      name: "TPPL Season 4 Cricket Tournament",
      date: new Date(currentDate.getFullYear(), 2, 15), // March 15
      type: "sports"
    },
    {
      name: "Diwali Festival Celebration",
      date: new Date(currentDate.getFullYear(), 10, 12), // November 12 (approximate)
      type: "festival"
    },
    {
      name: "Christmas Celebration",
      date: new Date(currentDate.getFullYear(), 11, 25), // December 25
      type: "festival"
    }
  ];

  // Manual notices - ADD YOUR NOTICES HERE
  const notices = [
    "Note: This is a personal project demo. Data shown is for testing purposes         only."
    //"Society maintenance payment due by 10th of every month"
    // "Water tank cleaning scheduled for next Sunday",
    // "Parking rules to be strictly followed - No parking in fire lane",
    //"Society AGM meeting on 15th November at 7 PM in Society Office"
  ];

  // Filter events that are within 15 days
  const getUpcomingEvents = () => {
    const fifteenDaysFromNow = new Date();
    fifteenDaysFromNow.setDate(currentDate.getDate() + 15);

    return upcomingEvents.filter(event => {
      // Adjust year if event has passed this year
      if (event.date < currentDate) {
        event.date.setFullYear(currentDate.getFullYear() + 1);
      }
      
      const daysDifference = Math.ceil((event.date.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
      return daysDifference >= 0 && daysDifference <= 15;
    });
  };

  const upcomingEventsToShow = getUpcomingEvents();
  const allItems = [...notices, ...upcomingEventsToShow.map(event => `🎉 ${event.name} - ${event.date.toLocaleDateString('en-IN', { month: 'long', day: 'numeric' })}`)];

  if (allItems.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 text-white py-3 overflow-hidden">
      <div className="flex items-center">
        <div className="flex items-center px-4 bg-white/20 rounded-r-full mr-4">
          <Bell className="h-5 w-5 mr-2 animate-pulse" />
          <span className="font-semibold text-sm whitespace-nowrap">NOTICES & UPCOMING EVENTS</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <div 
            className={`whitespace-nowrap ${isPaused ? '' : 'animate-marquee'}`}
            onClick={() => setIsPaused(!isPaused)}
            style={{ cursor: 'pointer' }}
          >
            {allItems.map((item, index) => (
              <span key={index} className="inline-block mx-8 text-sm font-medium">
                📢 {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;