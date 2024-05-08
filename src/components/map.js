// Map.js
'use client'
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: -31.3678,
  lng: -51.9793
};

const Map = ({ markers, onMarkerRemoved }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleCheckboxChange = () => setIsConfirmed(!isConfirmed);

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        {markers.map(marker => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            onClick={() => {
              setSelectedMarker(marker);
              setIsConfirmed(false); // Reinicializar confirmação
            }}
          />
        ))}

        {selectedMarker && (
          <InfoWindow position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }} onCloseClick={() => setSelectedMarker(null)}>
            <div className="bg-white rounded-lg shadow-lg p-4 w-48">
              <p className="text-red-600 font-bold mb-2">Descrição: {selectedMarker.description}</p>
              <p className="text-gray-800 font-medium mb-2">Endereço: {selectedMarker.address}</p>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  checked={isConfirmed}
                  onChange={handleCheckboxChange}
                />
                <label className="ml-2 text-sm text-gray-700">Confirmar</label>
              </div>
              <button
                onClick={() => {
                  if (isConfirmed) onMarkerRemoved(selectedMarker.id);
                }}
                className={`w-full py-1 px-2 text-white rounded-md ${
                  isConfirmed ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-300 cursor-not-allowed'
                }`}
                disabled={!isConfirmed}
              >
                OK
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(Map);
