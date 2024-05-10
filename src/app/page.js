// HomePage.js
'use client'
import React, { useEffect, useState } from 'react';
import { database } from '@/app/firebase';
import { ref, onValue, push, set, remove, off } from 'firebase/database';
import { Button } from '@/components/ui/button';
import Map from '@/components/map';
import RegisterShelterModal from '@/components/register';
import UpdateShelterModal from '@/components/update';
import DonationPointModal from '@/components/DonationPoint';

const HomePage = () => {
  const [markers, setMarkers] = useState([]);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDonationOpen, setIsDonationOpen] = useState(false);

  // Retrieve all markers from the Firebase database
  useEffect(() => {
    const markersRef = ref(database, 'markers');
    const listener = onValue(markersRef, (snapshot) => {
      const markersData = snapshot.val();
      if (markersData) {
        const loadedMarkers = Object.entries(markersData).map(([key, value]) => ({ ...value, id: key }));
        setMarkers(loadedMarkers);
      } else {
        setMarkers([]);
      }
    });

    return () => off(markersRef, 'value', listener);
  }, []);

  const handleAddMarker = (marker) => {
    const newMarkerRef = push(ref(database, 'markers'));
    set(newMarkerRef, marker).catch((error) => console.error("Erro ao adicionar marcador:", error));
  };

  const handleUpdateShelter = (updatedShelter) => {
    const updatedMarkers = markers.map((marker) =>
      marker.id === updatedShelter.id ? { ...marker, ...updatedShelter } : marker
    );
    setMarkers(updatedMarkers);

    set(ref(database, `markers/${updatedShelter.id}`), updatedShelter).catch((error) =>
      console.error("Erro ao atualizar marcador:", error)
    );
  };

  const handleAddDonationPoint = (donationPoint) => {
    const newDonationRef = push(ref(database, 'markers'));
    set(newDonationRef, donationPoint).catch((error) => console.error("Erro ao adicionar ponto de doação:", error));
  };

  const handleDeleteMarker = (id) => {
    remove(ref(database, `markers/${id}`)).catch((error) => console.error("Erro ao excluir marcador:", error));
    setMarkers(markers.filter(marker => marker.id !== id));
  };

  return (
    <>
      <div className="flex justify-center gap-4 my-4 flex-wrap">
        <Button onClick={() => setIsRegisterOpen(true)}>Cadastrar Abrigo</Button>
        <Button onClick={() => setIsUpdateOpen(true)}>Editar Abrigo</Button>
        <Button onClick={() => setIsDonationOpen(true)}>Cadastrar Ponto de Doação</Button>
      </div>
      <Map markers={markers} onDeleteMarker={handleDeleteMarker} />
      <RegisterShelterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onRegister={handleAddMarker} />
      <UpdateShelterModal isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} shelters={markers} onUpdate={handleUpdateShelter} />
      <DonationPointModal isOpen={isDonationOpen} onClose={() => setIsDonationOpen(false)} onRegister={handleAddDonationPoint} />
    </>
  );
};

export default HomePage;
