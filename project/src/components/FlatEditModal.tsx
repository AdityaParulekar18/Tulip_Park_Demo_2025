import React, { useState, useEffect } from 'react';
import { X, Save, Phone, Mail, User, Home } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface FlatEditModalProps {
  flat: any;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedFlat: any) => void;
}

const FlatEditModal: React.FC<FlatEditModalProps> = ({ flat, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    status: '',
    owner_name: '',
    owner_phone: '',
    owner_email: '',
    rent_price: '',
    sale_price: '',
    tenant_name: '',
    tenant_phone: '',
    tenant_email: '',
    contract_end: ''
  });

  useEffect(() => {
    if (flat) {
      setFormData({
        status: flat.status || 'owner-occupied',
        owner_name: flat.owner_name || '',
        owner_phone: flat.owner_phone || '',
        owner_email: flat.owner_email || '',
        rent_price: flat.rent_price || '',
        sale_price: flat.sale_price || '',
        tenant_name: flat.tenant_name || '',
        tenant_phone: flat.tenant_phone || '',
        tenant_email: flat.tenant_email || '',
        contract_end: flat.contract_end || ''
      });
    }
  }, [flat]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { data, error } = await supabase
        .from('flats')
        .update({
          status: formData.status,
          owner_name: formData.owner_name,
          owner_phone: formData.owner_phone,
          owner_email: formData.owner_email,
          rent_price: formData.rent_price ? Number(formData.rent_price) : null,
          sale_price: formData.sale_price ? Number(formData.sale_price) : null,
          tenant_name: formData.tenant_name || null,
          tenant_phone: formData.tenant_phone || null,
          tenant_email: formData.tenant_email || null,
          contract_end: formData.contract_end || null,
          updated_at: new Date().toISOString()
        })
        .eq('flat_number', flat.flat_number)
        .select()
        .single();

      if (error) throw error;

      onSave(data);
      onClose();
      alert('Flat details updated successfully!');
    } catch (error) {
      console.error('Error updating flat:', error);
      alert('Error updating flat details. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen || !flat) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">Edit Flat {flat.flat_number}</h3>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="owner-occupied">Owner Occupied</option>
              <option value="rented">Currently Rented</option>
              <option value="for-rent">Available for Rent</option>
              <option value="for-sale">For Sale</option>
            </select>
          </div>

          {/* Owner Information */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <User className="h-5 w-5 mr-2 text-blue-600" />
              Owner Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Name *
                </label>
                <input
                  type="text"
                  name="owner_name"
                  value={formData.owner_name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Phone *
                </label>
                <input
                  type="tel"
                  name="owner_phone"
                  value={formData.owner_phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Owner Email *
                </label>
                <input
                  type="email"
                  name="owner_email"
                  value={formData.owner_email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Rental Information */}
          {(formData.status === 'rented' || formData.status === 'for-rent') && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <Home className="h-5 w-5 mr-2 text-green-600" />
                Rental Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Monthly Rent (₹)
                  </label>
                  <input
                    type="number"
                    name="rent_price"
                    value={formData.rent_price}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contract End Date
                  </label>
                  <input
                    type="date"
                    name="contract_end"
                    value={formData.contract_end}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                {formData.status === 'rented' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tenant Name
                      </label>
                      <input
                        type="text"
                        name="tenant_name"
                        value={formData.tenant_name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tenant Phone
                      </label>
                      <input
                        type="tel"
                        name="tenant_phone"
                        value={formData.tenant_phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tenant Email
                      </label>
                      <input
                        type="email"
                        name="tenant_email"
                        value={formData.tenant_email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Sale Information */}
          {formData.status === 'for-sale' && (
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">
                Sale Information
              </h4>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sale Price (₹)
                </label>
                <input
                  type="number"
                  name="sale_price"
                  value={formData.sale_price}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FlatEditModal;