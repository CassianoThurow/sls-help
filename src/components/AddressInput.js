// AddressInput.js
'use client'
import React, { useState } from 'react';
import axios from 'axios';

const AddressInput = ({ onAddMarker }) => {
  const [streetAddress, setStreetAddress] = useState('');
  const [description, setDescription] = useState('');

  const handleSearchAddress = async () => {
    const fullAddress = `${streetAddress}, São Lourenço do Sul`;

    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: fullAddress,
          key: process.env.APP_GOOGLE_MAPS_API_KEY
        }
      });

      const results = response.data.results;
      if (results.length > 0) {
        const { lat, lng } = results[0].geometry.location;
        const region = results[0].address_components.find(component => component.long_name === 'São Lourenço do Sul');
        if (region) {
          onAddMarker({ lat, lng, description, address: fullAddress });
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
        value={streetAddress}
        onChange={(e) => setStreetAddress(e.target.value)}
        className='text-black p-2 border rounded-lg'
        placeholder="Digite a rua e o número"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className='text-black p-2 border rounded-lg'
        placeholder="Descreva o básico, quantidade de pessoas, animais, etc."
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
