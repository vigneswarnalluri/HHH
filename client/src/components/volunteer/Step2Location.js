import React, { useState, useEffect } from 'react';
import { FiMapPin, FiNavigation, FiGlobe } from 'react-icons/fi';

const Step2Location = ({ data, onNext, onPrev, onUpdate }) => {
  const [location, setLocation] = useState(data || {});
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [address, setAddress] = useState(data?.address || '');
  const [coordinates, setCoordinates] = useState(data?.coordinates || null);

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = [position.coords.longitude, position.coords.latitude];
        setCoordinates(coords);
        setIsGettingLocation(false);
        
        // Reverse geocode to get address
        reverseGeocode(coords);
      },
      (error) => {
        console.error('Error getting location:', error);
        setIsGettingLocation(false);
        alert('Unable to get your location. Please enter manually.');
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  };

  const reverseGeocode = async (coords) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords[1]}&lon=${coords[0]}&zoom=18&addressdetails=1`
      );
      const data = await response.json();
      
      if (data.display_name) {
        setAddress(data.display_name);
      }
    } catch (error) {
      console.error('Error reverse geocoding:', error);
    }
  };

  const handleManualCoordinates = (type, value) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return;

    setCoordinates(prev => {
      const newCoords = prev ? [...prev] : [0, 0];
      if (type === 'longitude') {
        newCoords[0] = numValue;
      } else {
        newCoords[1] = numValue;
      }
      return newCoords;
    });
  };

  const handleSubmit = () => {
    if (!coordinates || coordinates.length !== 2) {
      alert('Please provide valid coordinates');
      return;
    }

    const locationData = {
      type: 'Point',
      coordinates: coordinates,
      address: address
    };

    onUpdate(locationData);
    onNext();
  };

  const canProceed = coordinates && coordinates.length === 2;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Location Information
        </h2>
        <p className="text-gray-600">
          Please provide your location details. You can use your current location or enter coordinates manually.
        </p>
      </div>

      <div className="space-y-6">
        {/* Current Location Button */}
        <div>
          <button
            type="button"
            onClick={getCurrentLocation}
            disabled={isGettingLocation}
            className="btn btn-secondary w-full flex items-center justify-center space-x-2"
          >
            {isGettingLocation ? (
              <div className="w-5 h-5 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            ) : (
              <FiNavigation className="w-5 h-5" />
            )}
            <span>
              {isGettingLocation ? 'Getting your location...' : 'Use Current Location'}
            </span>
          </button>
        </div>

        {/* Manual Coordinates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Longitude
            </label>
            <input
              type="number"
              step="any"
              placeholder="e.g., 78.500000"
              value={coordinates?.[0] || ''}
              onChange={(e) => handleManualCoordinates('longitude', e.target.value)}
              className="input"
              min="-180"
              max="180"
            />
            <p className="text-xs text-gray-500 mt-1">
              Range: -180 to 180
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Latitude
            </label>
            <input
              type="number"
              step="any"
              placeholder="e.g., 16.300000"
              value={coordinates?.[1] || ''}
              onChange={(e) => handleManualCoordinates('latitude', e.target.value)}
              className="input"
              min="-90"
              max="90"
            />
            <p className="text-xs text-gray-500 mt-1">
              Range: -90 to 90
            </p>
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address (optional)
          </label>
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address or location description"
            className="input resize-none"
            rows="3"
          />
        </div>

        {/* Location Preview */}
        {coordinates && coordinates.length === 2 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Location Preview</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <FiGlobe className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  Longitude: {coordinates[0].toFixed(6)}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FiMapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  Latitude: {coordinates[1].toFixed(6)}
                </span>
              </div>
              {address && (
                <div className="flex items-start space-x-2">
                  <FiMapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                  <span className="text-gray-600">{address}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onPrev}
            className="btn btn-secondary"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue to Description
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step2Location; 