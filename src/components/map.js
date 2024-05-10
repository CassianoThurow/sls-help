// Map.js
'use client'
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import MarkerInfoModal from '@/components/MarkerInfoModal';
import DonationInfoModal from '@/components/DonationInfoModal'; // Import the donation modal

const containerStyle = {
  width: '100vw',
  height: '100vh'
};

const center = {
  lat: -31.3678,
  lng: -51.9793
};

const Map = ({ markers, onDeleteMarker }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [isInfoModalOpen, setInfoModalOpen] = useState(false);
  const [isDonationModalOpen, setDonationModalOpen] = useState(false);

  const openModal = (marker) => {
    setSelectedMarker(marker);
    if (marker.type === 'donation') {
      setDonationModalOpen(true);
    } else {
      setInfoModalOpen(true);
    }
  };

  const getMarkerIcon = (marker) => {
    let iconUrl;
    if (marker.type === 'shelter') {
      iconUrl = marker.full ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/green-dot.png';
    } else if (marker.type === 'donation') {
      iconUrl = 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
    }
    return { url: iconUrl };
  };

  return (
    <LoadScript googleMapsApiKey={process.env.APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={getMarkerIcon(marker)}
            onClick={() => openModal(marker)}
          />
        ))}
        <MarkerInfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setInfoModalOpen(false)}
          marker={selectedMarker}
        />
        <DonationInfoModal
          isOpen={isDonationModalOpen}
          onClose={() => setDonationModalOpen(false)}
          donationPoint={selectedMarker}
          onDelete={onDeleteMarker}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default React.memo(Map);
