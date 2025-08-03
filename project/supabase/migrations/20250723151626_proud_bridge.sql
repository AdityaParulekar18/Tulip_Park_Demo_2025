/*
  # Update Events with Display Images

  1. Updates
    - Update existing events with proper display images
    - Each event gets a relevant image based on its type

  2. Changes
    - Republic Day: Flag hoisting image
    - Holi: Colorful celebration image  
    - Independence Day: Flag ceremony image
    - TPPL: Cricket match image
    - Diwali: Diwali lights image
    - Lohri: Bonfire celebration image
*/

-- Update events with relevant display images
UPDATE events SET image = 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800' 
WHERE name = 'Republic Day Satyanarayana Pooja';

UPDATE events SET image = 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=800' 
WHERE name = 'Holi Festival Celebration';

UPDATE events SET image = 'https://images.pexels.com/photos/1587927/pexels-photo-1587927.jpeg?auto=compress&cs=tinysrgb&w=800' 
WHERE name = 'Independence Day Celebration';

UPDATE events SET image = 'https://images.pexels.com/photos/1661950/pexels-photo-1661950.jpeg?auto=compress&cs=tinysrgb&w=800' 
WHERE name = 'TPPL Season 5 Cricket Tournament';

UPDATE events SET image = 'https://images.pexels.com/photos/1729931/pexels-photo-1729931.jpeg?auto=compress&cs=tinysrgb&w=800' 
WHERE name = 'Diwali Festival Celebration';

UPDATE events SET image = 'https://images.pexels.com/photos/1387174/pexels-photo-1387174.jpeg?auto=compress&cs=tinysrgb&w=800' 
WHERE name = 'Lohri Celebration';