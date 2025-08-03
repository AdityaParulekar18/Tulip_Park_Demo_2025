import React, { useState } from 'react';
import { useEffect } from 'react';
import { Building, Users, X, Phone, Mail, Home, MapPin, Edit } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import FlatEditModal from './FlatEditModal';
import { supabase } from '../lib/supabase';

const BuildingLayout = () => {
  const [selectedWing, setSelectedWing] = useState('A');
  const [selectedFlat, setSelectedFlat] = useState(null);
  const [editingFlat, setEditingFlat] = useState(null);
  const [flatsData, setFlatsData] = useState({});
  const [loading, setLoading] = useState(true);
  const { isAdmin } = useAuth();

  useEffect(() => {
    loadFlatsData();
  }, []);

  const loadFlatsData = async () => {
    try {
      const { data, error } = await supabase
        .from('flats')
        .select('*');
      
      if (error) {
        console.warn('Flats table not found, using demo data');
        setLoading(false);
        return;
      }
      
      if (data && data.length > 0) {
        // Convert database data to the format expected by the component
        const flatsMap = {};
        data.forEach(flat => {
          flatsMap[flat.flat_number] = {
            owner: flat.owner_name,
            phone: flat.owner_phone,
            email: flat.owner_email,
            type: flat.type,
            area: flat.area,
            status: flat.status,
            rent: flat.rent_price,
            contractEnd: flat.contract_end,
            tenantName: flat.tenant_name,
            tenantPhone: flat.tenant_phone,
            tenantEmail: flat.tenant_email,
            salePrice: flat.sale_price
          };
        });
        setFlatsData(flatsMap);
      }
    } catch (error) {
      console.warn('Database not connected, using demo data');
    } finally {
      setLoading(false);
    }
  };

  // Sample flat data with detailed information
  const flatDetails = {
    'A101': { owner: 'Rajesh Sharma', phone: '+91 98765 43210', email: 'rajesh.sharma@email.com', type: '2BHK', area: '850 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'A102': { owner: 'Priya Patel', phone: '+91 98765 43211', email: 'priya.patel@email.com', type: '2BHK', area: '850 sq ft', status: 'rented', rent: 35000, contractEnd: '2024-12-31' },
    'A103': { owner: 'Mumbai Properties Ltd', phone: '+91 98765 43212', email: 'info@mumbaiproperties.com', type: '2BHK', area: '850 sq ft', status: 'available', rent: null, contractEnd: null },
    'A104': { owner: 'Amit Kumar', phone: '+91 98765 43213', email: 'amit.kumar@email.com', type: '2BHK', area: '850 sq ft', status: 'available', rent: 32000, contractEnd: null },
    'A201': { owner: 'Sneha Gupta', phone: '+91 98765 43214', email: 'sneha.gupta@email.com', type: '2BHK', area: '850 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'A202': { owner: 'Vikram Singh', phone: '+91 98765 43215', email: 'vikram.singh@email.com', type: '2BHK', area: '850 sq ft', status: 'rented', rent: 38000, contractEnd: '2024-08-15' },
    'A203': { owner: 'Meera Joshi', phone: '+91 98765 43216', email: 'meera.joshi@email.com', type: '2BHK', area: '850 sq ft', status: 'rented', rent: 36000, contractEnd: '2025-03-20' },
    'A204': { owner: 'Ravi Agarwal', phone: '+91 98765 43217', email: 'ravi.agarwal@email.com', type: '2BHK', area: '850 sq ft', status: 'available', rent: 34000, contractEnd: null },
    'A301': { owner: 'Sunita Shah', phone: '+91 98765 43218', email: 'sunita.shah@email.com', type: '3BHK', area: '1200 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'A302': { owner: 'Deepak Mehta', phone: '+91 98765 43219', email: 'deepak.mehta@email.com', type: '3BHK', area: '1200 sq ft', status: 'rented', rent: 45000, contractEnd: '2024-11-30' },
    'A303': { owner: 'Kavita Reddy', phone: '+91 98765 43220', email: 'kavita.reddy@email.com', type: '3BHK', area: '1200 sq ft', status: 'available', rent: 42000, contractEnd: null },
    'A304': { owner: 'Rohit Malhotra', phone: '+91 98765 43221', email: 'rohit.malhotra@email.com', type: '3BHK', area: '1200 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'A401': { owner: 'Anita Verma', phone: '+91 98765 43222', email: 'anita.verma@email.com', type: '3BHK', area: '1200 sq ft', status: 'rented', rent: 47000, contractEnd: '2025-01-15' },
    'A402': { owner: 'Suresh Gupta', phone: '+91 98765 43223', email: 'suresh.gupta@email.com', type: '3BHK', area: '1200 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'A403': { owner: 'Pooja Sharma', phone: '+91 98765 43224', email: 'pooja.sharma@email.com', type: '3BHK', area: '1200 sq ft', status: 'available', rent: 44000, contractEnd: null },
    'A404': { owner: 'Manish Agarwal', phone: '+91 98765 43225', email: 'manish.agarwal@email.com', type: '3BHK', area: '1200 sq ft', status: 'rented', rent: 46000, contractEnd: '2024-09-30' },
    'A501': { owner: 'Rekha Patel', phone: '+91 98765 43226', email: 'rekha.patel@email.com', type: '3BHK', area: '1200 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'A502': { owner: 'Ashok Kumar', phone: '+91 98765 43227', email: 'ashok.kumar@email.com', type: '3BHK', area: '1200 sq ft', status: 'rented', rent: 48000, contractEnd: '2024-12-15' },
    'A503': { owner: 'Nisha Singh', phone: '+91 98765 43228', email: 'nisha.singh@email.com', type: '3BHK', area: '1200 sq ft', status: 'available', rent: 45000, contractEnd: null },
    'A504': { owner: 'Ramesh Joshi', phone: '+91 98765 43229', email: 'ramesh.joshi@email.com', type: '3BHK', area: '1200 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'A601': { owner: 'Sanjay Mehta', phone: '+91 98765 43230', email: 'sanjay.mehta@email.com', type: '3BHK', area: '1200 sq ft', status: 'rented', rent: 50000, contractEnd: '2025-02-28' },
    'A602': { owner: 'Geeta Sharma', phone: '+91 98765 43231', email: 'geeta.sharma@email.com', type: '3BHK', area: '1200 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'A603': { owner: 'Vinod Gupta', phone: '+91 98765 43232', email: 'vinod.gupta@email.com', type: '3BHK', area: '1200 sq ft', status: 'available', rent: 47000, contractEnd: null },
    'A604': { owner: 'Lakshmi Reddy', phone: '+91 98765 43233', email: 'lakshmi.reddy@email.com', type: '3BHK', area: '1200 sq ft', status: 'rented', rent: 49000, contractEnd: '2024-10-31' },
    'A701': { owner: 'Kiran Patel', phone: '+91 98765 43234', email: 'kiran.patel@email.com', type: '3BHK', area: '1200 sq ft', status: 'for-sale', rent: null, contractEnd: null, salePrice: 12500000 },
    'A702': { owner: 'Sunil Kumar', phone: '+91 98765 43235', email: 'sunil.kumar@email.com', type: '3BHK', area: '1200 sq ft', status: 'rented', rent: 52000, contractEnd: '2025-04-30' },
    'A703': { owner: 'Madhuri Singh', phone: '+91 98765 43236', email: 'madhuri.singh@email.com', type: '3BHK', area: '1200 sq ft', status: 'for-rent', rent: 48000, contractEnd: null },
    'A704': { owner: 'Arun Joshi', phone: '+91 98765 43237', email: 'arun.joshi@email.com', type: '3BHK', area: '1200 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    // B Wing flats
    'B101': { owner: 'Ritu Sharma', phone: '+91 98765 43238', email: 'ritu.sharma@email.com', type: '2BHK', area: '900 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'B102': { owner: 'Ajay Patel', phone: '+91 98765 43239', email: 'ajay.patel@email.com', type: '2BHK', area: '900 sq ft', status: 'rented', rent: 40000, contractEnd: '2024-11-30', tenantName: 'Priya Sharma', tenantPhone: '+91 98765 43298', tenantEmail: 'priya.sharma@email.com' },
    'B103': { owner: 'Seema Gupta', phone: '+91 98765 43240', email: 'seema.gupta@email.com', type: '2BHK', area: '900 sq ft', status: 'for-sale', rent: null, contractEnd: null, salePrice: 8500000 },
    'B104': { owner: 'Rahul Singh', phone: '+91 98765 43241', email: 'rahul.singh@email.com', type: '2BHK', area: '900 sq ft', status: 'rented', rent: 39000, contractEnd: '2025-01-15', tenantName: 'Amit Sharma', tenantPhone: '+91 98765 43299', tenantEmail: 'amit.sharma@email.com' },
    'B105': { owner: 'Priyanka Mehta', phone: '+91 98765 43242', email: 'priyanka.mehta@email.com', type: '2BHK', area: '900 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'B106': { owner: 'Vishal Kumar', phone: '+91 98765 43243', email: 'vishal.kumar@email.com', type: '2BHK', area: '900 sq ft', status: 'for-rent', rent: 37000, contractEnd: null },
    'B201': { owner: 'Neha Agarwal', phone: '+91 98765 43244', email: 'neha.agarwal@email.com', type: '2BHK', area: '900 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'B202': { owner: 'Karan Malhotra', phone: '+91 98765 43245', email: 'karan.malhotra@email.com', type: '2BHK', area: '900 sq ft', status: 'rented', rent: 41000, contractEnd: '2024-12-31', tenantName: 'Sonia Verma', tenantPhone: '+91 98765 43297', tenantEmail: 'sonia.verma@email.com' },
    'B203': { owner: 'Deepika Shah', phone: '+91 98765 43246', email: 'deepika.shah@email.com', type: '2BHK', area: '900 sq ft', status: 'for-rent', rent: 38000, contractEnd: null },
    'B204': { owner: 'Arjun Reddy', phone: '+91 98765 43247', email: 'arjun.reddy@email.com', type: '2BHK', area: '900 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'B205': { owner: 'Kavya Joshi', phone: '+91 98765 43248', email: 'kavya.joshi@email.com', type: '2BHK', area: '900 sq ft', status: 'rented', rent: 40500, contractEnd: '2025-03-15', tenantName: 'Rohit Kumar', tenantPhone: '+91 98765 43296', tenantEmail: 'rohit.kumar@email.com' },
    'B206': { owner: 'Manoj Singh', phone: '+91 98765 43249', email: 'manoj.singh@email.com', type: '2BHK', area: '900 sq ft', status: 'for-sale', rent: null, contractEnd: null, salePrice: 8800000 },
    'B301': { owner: 'Anita Gupta', phone: '+91 98765 43250', email: 'anita.gupta@email.com', type: '2BHK', area: '900 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'B302': { owner: 'Vikash Sharma', phone: '+91 98765 43251', email: 'vikash.sharma@email.com', type: '2BHK', area: '900 sq ft', status: 'rented', rent: 42000, contractEnd: '2024-10-30', tenantName: 'Meera Patel', tenantPhone: '+91 98765 43295', tenantEmail: 'meera.patel@email.com' },
    'B303': { owner: 'Sunita Mehta', phone: '+91 98765 43252', email: 'sunita.mehta@email.com', type: '2BHK', area: '900 sq ft', status: 'for-rent', rent: 39000, contractEnd: null },
    'B304': { owner: 'Rajesh Kumar', phone: '+91 98765 43253', email: 'rajesh.kumar@email.com', type: '2BHK', area: '900 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'B305': { owner: 'Pooja Agarwal', phone: '+91 98765 43254', email: 'pooja.agarwal@email.com', type: '2BHK', area: '900 sq ft', status: 'rented', rent: 41500, contractEnd: '2025-02-28', tenantName: 'Suresh Reddy', tenantPhone: '+91 98765 43294', tenantEmail: 'suresh.reddy@email.com' },
    'B306': { owner: 'Amit Joshi', phone: '+91 98765 43255', email: 'amit.joshi@email.com', type: '2BHK', area: '900 sq ft', status: 'for-sale', rent: null, contractEnd: null, salePrice: 9000000 },
    'B401': { owner: 'Rekha Singh', phone: '+91 98765 43256', email: 'rekha.singh@email.com', type: '2BHK', area: '900 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'B402': { owner: 'Sanjay Patel', phone: '+91 98765 43257', email: 'sanjay.patel@email.com', type: '2BHK', area: '900 sq ft', status: 'rented', rent: 43000, contractEnd: '2024-11-15', tenantName: 'Nisha Sharma', tenantPhone: '+91 98765 43293', tenantEmail: 'nisha.sharma@email.com' },
    'B403': { owner: 'Geeta Malhotra', phone: '+91 98765 43258', email: 'geeta.malhotra@email.com', type: '2BHK', area: '900 sq ft', status: 'for-rent', rent: 40000, contractEnd: null },
    'B404': { owner: 'Ramesh Gupta', phone: '+91 98765 43259', email: 'ramesh.gupta@email.com', type: '2BHK', area: '900 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'B405': { owner: 'Lakshmi Reddy', phone: '+91 98765 43260', email: 'lakshmi.reddy@email.com', type: '2BHK', area: '900 sq ft', status: 'rented', rent: 42500, contractEnd: '2025-01-31', tenantName: 'Vinod Kumar', tenantPhone: '+91 98765 43292', tenantEmail: 'vinod.kumar@email.com' },
    'B406': { owner: 'Ashok Sharma', phone: '+91 98765 43261', email: 'ashok.sharma@email.com', type: '2BHK', area: '900 sq ft', status: 'for-sale', rent: null, contractEnd: null, salePrice: 9200000 },
    'B501': { owner: 'Kiran Joshi', phone: '+91 98765 43262', email: 'kiran.joshi@email.com', type: '2BHK', area: '900 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'B502': { owner: 'Sunil Agarwal', phone: '+91 98765 43263', email: 'sunil.agarwal@email.com', type: '2BHK', area: '900 sq ft', status: 'rented', rent: 44000, contractEnd: '2024-12-15', tenantName: 'Priya Singh', tenantPhone: '+91 98765 43291', tenantEmail: 'priya.singh@email.com' },
    'B503': { owner: 'Madhuri Patel', phone: '+91 98765 43264', email: 'madhuri.patel@email.com', type: '2BHK', area: '900 sq ft', status: 'for-rent', rent: 41000, contractEnd: null },
    'B504': { owner: 'Arun Mehta', phone: '+91 98765 43265', email: 'arun.mehta@email.com', type: '2BHK', area: '900 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'B505': { owner: 'Seema Reddy', phone: '+91 98765 43266', email: 'seema.reddy@email.com', type: '2BHK', area: '900 sq ft', status: 'rented', rent: 43500, contractEnd: '2025-04-30', tenantName: 'Rajesh Gupta', tenantPhone: '+91 98765 43290', tenantEmail: 'rajesh.gupta@email.com' },
    'B506': { owner: 'Manish Kumar', phone: '+91 98765 43267', email: 'manish.kumar@email.com', type: '2BHK', area: '900 sq ft', status: 'for-sale', rent: null, contractEnd: null, salePrice: 9500000 },
    'B601': { owner: 'Nisha Agarwal', phone: '+91 98765 43268', email: 'nisha.agarwal@email.com', type: '2BHK', area: '900 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'B602': { owner: 'Rohit Sharma', phone: '+91 98765 43269', email: 'rohit.sharma@email.com', type: '2BHK', area: '900 sq ft', status: 'rented', rent: 45000, contractEnd: '2024-09-30', tenantName: 'Kavita Joshi', tenantPhone: '+91 98765 43289', tenantEmail: 'kavita.joshi@email.com' },
    'B603': { owner: 'Deepak Singh', phone: '+91 98765 43270', email: 'deepak.singh@email.com', type: '2BHK', area: '900 sq ft', status: 'for-rent', rent: 42000, contractEnd: null },
    'B604': { owner: 'Sunita Patel', phone: '+91 98765 43271', email: 'sunita.patel@email.com', type: '2BHK', area: '900 sq ft', status: 'owner-occupied', rent: null, contractEnd: null },
    'B605': { owner: 'Vikram Reddy', phone: '+91 98765 43272', email: 'vikram.reddy@email.com', type: '2BHK', area: '900 sq ft', status: 'rented', rent: 44500, contractEnd: '2025-05-31', tenantName: 'Anita Kumar', tenantPhone: '+91 98765 43288', tenantEmail: 'anita.kumar@email.com' },
    'B606': { owner: 'Ravi Malhotra', phone: '+91 98765 43273', email: 'ravi.malhotra@email.com', type: '2BHK', area: '900 sq ft', status: 'for-sale', rent: null, contractEnd: null, salePrice: 9800000 }
  };

  const generateFlats = (wing: string, floors: number, flatsPerFloor: number) => {
    const flats = [];
    for (let floor = 1; floor <= floors; floor++) {
      for (let flat = 1; flat <= flatsPerFloor; flat++) {
        const flatNumber = `${floor}0${flat}`;
        const flatKey = `${wing}${flatNumber}`;
        const details = flatDetails[flatKey];
        flats.push({
          wing,
          floor,
          number: flatNumber,
          key: flatKey,
          status: details?.status || 'occupied'
        });
      }
    }
    return flats;
  };

  const wingAFlats = generateFlats('A', 7, 4);
  const wingBFlats = generateFlats('B', 6, 6);

  const currentFlats = selectedWing === 'A' ? wingAFlats : wingBFlats;

  // Get the current status for a flat (either from database or fallback data)
  const getFlatStatus = (flatKey: string) => {
    const dbData = Object.keys(flatsData).length > 0 ? flatsData[flatKey] : null;
    const fallbackData = flatDetails[flatKey];
    return dbData?.status || fallbackData?.status || 'owner-occupied';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'owner-occupied': return 'bg-green-500 hover:bg-green-600';
      case 'rented': return 'bg-blue-500 hover:bg-blue-600';
      case 'for-rent': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'for-sale': return 'bg-red-500 hover:bg-red-600';
      default: return 'bg-green-500 hover:bg-green-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'owner-occupied': return 'Owner Occupied';
      case 'rented': return 'Currently Rented';
      case 'for-rent': return 'Available for Rent';
      case 'for-sale': return 'For Sale';
      default: return 'Owner Occupied';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'owner-occupied': return 'bg-green-100 text-green-800';
      case 'rented': return 'bg-blue-100 text-blue-800';
      case 'for-rent': return 'bg-yellow-100 text-yellow-800';
      case 'for-sale': return 'bg-red-100 text-red-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const groupedFlats = currentFlats.reduce((acc, flat) => {
    if (!acc[flat.floor]) acc[flat.floor] = [];
    // Update flat status from current data
    const currentStatus = getFlatStatus(flat.key);
    acc[flat.floor].push({
      ...flat,
      status: currentStatus
    });
    return acc;
  }, {} as Record<number, typeof currentFlats>);

  const handleFlatClick = (flat: any) => {
    // Always get the most current data
    const dbData = Object.keys(flatsData).length > 0 ? flatsData[flat.key] : null;
    const fallbackData = flatDetails[flat.key];
    const details = dbData || fallbackData;
    
    if (details) {
      setSelectedFlat({ 
        ...flat, 
        ...details,
        status: details.status // Ensure we use the current status
      });
    }
  };

  const closeModal = () => {
    setSelectedFlat(null);
  };

  const handleEditFlat = (flat: any) => {
    setEditingFlat({ ...flat, flat_number: flat.key });
  };

  const handleFlatUpdate = (updatedFlat: any) => {
    // Update local state
    setFlatsData(prev => ({
      ...prev,
      [updatedFlat.flat_number]: {
        owner: updatedFlat.owner_name,
        phone: updatedFlat.owner_phone,
        email: updatedFlat.owner_email,
        type: updatedFlat.type,
        area: updatedFlat.area,
        status: updatedFlat.status,
        rent: updatedFlat.rent_price,
        contractEnd: updatedFlat.contract_end,
        tenantName: updatedFlat.tenant_name,
        tenantPhone: updatedFlat.tenant_phone,
        tenantEmail: updatedFlat.tenant_email,
        salePrice: updatedFlat.sale_price
      }
    }));
    
    // Force re-render by reloading flats data
    loadFlatsData();
    
    setEditingFlat(null);
    setSelectedFlat(null);
  };

  if (loading) {
    return (
      <section id="layout" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading building layout...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="layout" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Building className="h-12 w-12 mx-auto mb-4 text-blue-700" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Building Layout
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Interactive building layout showing all flats and their current status
          </p>
        </div>

        {/* Wing Selector */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-1 flex">
            <button
              onClick={() => setSelectedWing('A')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                selectedWing === 'A' 
                  ? 'bg-blue-700 text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-700'
              }`}
            >
              A Wing (7 Floors)
            </button>
            <button
              onClick={() => setSelectedWing('B')}
              className={`px-6 py-2 rounded-md font-medium transition-colors ${
                selectedWing === 'B' 
                  ? 'bg-blue-700 text-white' 
                  : 'text-gray-700 dark:text-gray-300 hover:text-blue-700'
              }`}
            >
              B Wing (6 Floors)
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Owner Occupied</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">Rented</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">For Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">For Sale</span>
            </div>
          </div>
        </div>

        {/* Building Layout */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {Object.keys(groupedFlats)
              .sort((a, b) => parseInt(b) - parseInt(a))
              .map((floor) => (
                <div key={floor} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Floor {floor}
                    </h3>
                    <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                    {groupedFlats[parseInt(floor)].map((flat, index) => (
                      <button
                        key={index}
                        onClick={() => handleFlatClick(flat)}
                        className={`${getStatusColor(flat.status)} text-white text-center py-3 px-2 rounded-lg transition-colors cursor-pointer transform hover:scale-105`}
                        title={`${flat.wing}-${flat.number} - Click for details`}
                      >
                        <div className="font-semibold text-sm">{flat.wing}{flat.number}</div>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Building Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-900 dark:text-blue-300 mb-4">A Wing Details</h3>
            <ul className="space-y-2 text-blue-800 dark:text-blue-200">
              <li>• 7 Floors</li>
              <li>• 4 Flats per floor</li>
              <li>• Total: 28 Flats</li>
              <li>• Flat numbers: 101-104, 201-204, etc.</li>
            </ul>
          </div>
          
          <div className="bg-green-50 dark:bg-green-900/30 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-green-900 dark:text-green-300 mb-4">B Wing Details</h3>
            <ul className="space-y-2 text-green-800 dark:text-green-200">
              <li>• 6 Floors</li>
              <li>• 6 Flats per floor</li>
              <li>• Total: 36 Flats</li>
              <li>• Flat numbers: 101-106, 201-206, etc.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Flat Details Modal */}
      {selectedFlat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">{selectedFlat.wing}-{selectedFlat.number}</h3>
                  <p className="text-blue-100">{selectedFlat.type} • {selectedFlat.area}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="text-white hover:text-gray-200 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(selectedFlat.status)} bg-white/20 text-white`}>
                  {getStatusText(selectedFlat.status)}
                </span>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Owner Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Owner Information
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Owner Name</p>
                    <p className="font-semibold text-gray-900">{selectedFlat.owner}</p>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    <button
                      onClick={() => window.open(`tel:${selectedFlat.phone}`)}
                      className="flex items-center justify-center bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedFlat.phone}
                    </button>
                    <button
                      onClick={() => window.open(`mailto:${selectedFlat.email}`)}
                      className="flex items-center justify-center bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </button>
                  </div>
                </div>
              </div>

              {/* Rental Information */}
              {(selectedFlat.rent || selectedFlat.status === 'rented' || selectedFlat.status === 'for-rent') && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                    <Home className="h-5 w-5 mr-2 text-blue-600" />
                    Rental Information
                  </h4>
                  <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                    {selectedFlat.rent && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monthly Rent:</span>
                        <span className="font-semibold text-gray-900">₹{selectedFlat.rent.toLocaleString()}</span>
                      </div>
                    )}
                    {selectedFlat.contractEnd && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Contract Ends:</span>
                        <span className="font-semibold text-gray-900">{selectedFlat.contractEnd}</span>
                      </div>
                    )}
                    
                    {/* Tenant Information for Rented Flats */}
                    {(selectedFlat.status === 'rented' && selectedFlat.tenantName) && (
                      <div className="border-t border-blue-200 pt-3 mt-3">
                        <h5 className="font-semibold text-blue-800 mb-2">Tenant Contact</h5>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Tenant Name:</span>
                            <span className="font-semibold text-gray-900">{selectedFlat.tenantName}</span>
                          </div>
                          <div className="grid grid-cols-1 gap-2">
                            <button
                              onClick={() => window.open(`tel:${selectedFlat.tenantPhone}`)}
                              className="flex items-center justify-center bg-green-500 text-white py-2 px-3 rounded-lg hover:bg-green-600 transition-colors text-sm"
                            >
                              <Phone className="h-3 w-3 mr-1" />
                              {selectedFlat.tenantPhone}
                            </button>
                            <button
                              onClick={() => window.open(`mailto:${selectedFlat.tenantEmail}`)}
                              className="flex items-center justify-center bg-blue-500 text-white py-2 px-3 rounded-lg hover:bg-blue-600 transition-colors text-sm"
                            >
                              <Mail className="h-3 w-3 mr-1" />
                              Email Tenant
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Flat Specifications */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                  Flat Specifications
                </h4>
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-semibold text-gray-900">{selectedFlat.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Area:</span>
                    <span className="font-semibold text-gray-900">{selectedFlat.area}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Floor:</span>
                    <span className="font-semibold text-gray-900">{selectedFlat.floor}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wing:</span>
                    <span className="font-semibold text-gray-900">{selectedFlat.wing}</span>
                  </div>
                </div>
              </div>

              {/* Availability Notice */}
              {selectedFlat.status === 'for-rent' && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h5 className="font-semibold text-yellow-800 mb-2">Available for Rent</h5>
                  <p className="text-sm text-yellow-700">
                    This flat is currently available for rent. Contact the owner for viewing and rental terms.
                  </p>
                  {selectedFlat.rent && (
                    <p className="text-sm text-yellow-700 mt-1">
                      Expected rent: ₹{selectedFlat.rent.toLocaleString()}/month
                    </p>
                  )}
                </div>
              )}
              
              {selectedFlat.status === 'for-sale' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="font-semibold text-red-800 mb-2">For Sale</h5>
                  <p className="text-sm text-red-700">
                    This flat is currently for sale. Contact the owner for viewing and price negotiation.
                  </p>
                  {selectedFlat.salePrice && (
                    <p className="text-sm text-red-700 mt-1 font-medium">
                      Asking Price: ₹{(selectedFlat.salePrice / 100000).toFixed(1)} Lakhs
                    </p>
                  )}
                </div>
              )}
              
              {/* Admin Edit Button */}
              {isAdmin && (
                <div className="border-t border-gray-200 pt-4">
                  <button
                    onClick={() => handleEditFlat(selectedFlat)}
                    className="w-full bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center font-semibold"
                  >
                    <Edit className="h-5 w-5 mr-2" />
                    Edit Flat Details
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Flat Edit Modal */}
      <FlatEditModal
        flat={editingFlat}
        isOpen={!!editingFlat}
        onClose={() => setEditingFlat(null)}
        onSave={handleFlatUpdate}
      />
    </section>
  );
};

export default BuildingLayout;