'use client'
import React, { useEffect, useState } from 'react';
import { database } from '@/app/firebase';
import { ref, onValue, push, remove, off, set } from 'firebase/database';
import Map from '@/components/map';
import AddressInput from '@/components/AddressInput';

const HomePage = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const markersRef = ref(database, 'markers');
    const listener = onValue(markersRef, (snapshot) => {
      const markersData = snapshot.val();
      if (markersData) {
        setMarkers(Object.entries(markersData).map(([key, value]) => ({ ...value, id: key })));
      } else {
        setMarkers([]);
      }
    });

    return () => off(markersRef, 'value', listener);
  }, []);

  const handleAddMarker = (marker) => {
    const newMarkerRef = push(ref(database, 'markers'));
    set(newMarkerRef, marker).catch(error => console.error("Erro ao adicionar marcador:", error));
  };

  const handleMarkerRemoved = (id) => {
    remove(ref(database, `markers/${id}`));
  };

  return (
    <>
      <AddressInput onAddMarker={handleAddMarker} />
      <Map markers={markers} onMarkerRemoved={handleMarkerRemoved} />
    </>
  );
};

export default HomePage;
