// AddressInput.js
'use client'
import React, { useState } from 'react';
import axios from 'axios';

const AddressInput = ({ onAddMarker }) => {
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  const handleSearchAddress = async () => {
    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address,
          key: process.env.NEXT_PUBLIC_APP_GOOGLE_MAPS_API_KEY
        }
      });
      const results = response.data.results;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        const region = results[0].address_components.find(component => component.long_name === 'São Lourenço do Sul');
        if (region) {
          // Adicionar endereço ao objeto do marcador
          onAddMarker({ lat, lng, description, address });
        } else {
          alert('O endereço fornecido não está dentro de São Lourenço do Sul.');
        }
      } else {
        alert('Endereço não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao geocodificar o endereço', error);
      alert('Erro ao buscar as coordenadas do endereço.');
    }
  };

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-lg shadow-md">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className='text-black p-2 border rounded-lg'
        placeholder="Digite o endereço"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='text-black p-2 border rounded-lg'
        placeholder="Descreva o basico, quantidade de pessoas, animais, etc."
      />
      <button
        onClick={handleSearchAddress}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg"
      >
        Adicionar Marcador
      </button>
    </div>
  );
};

export default AddressInput;
