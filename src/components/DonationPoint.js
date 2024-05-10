'use client'
import React, { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const DonationPointModal = ({ isOpen, onClose, onRegister }) => {
  const [address, setAddress] = useState('');
  const [acceptedDonations, setAcceptedDonations] = useState('');

  const handleRegister = async () => {
    const fullAddress = `${address}, São Lourenço do Sul`;

    try {
      const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
        params: {
          address: fullAddress,
          key: process.env.APP_GOOGLE_MAPS_API_KEY
        }
      });

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        onRegister({
          type: "donation",
          address: fullAddress,
          lat,
          lng,
          acceptedDonations
        });
        onClose();
      } else {
        alert('Endereço não encontrado.');
      }
    } catch (error) {
      console.error('Erro ao geocodificar o endereço', error);
      alert('Erro ao buscar as coordenadas do endereço.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cadastrar Novo Ponto de Doação</DialogTitle>
          <DialogDescription>Digite o endereço e as doações aceitas para o novo ponto.</DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Endereço"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <Textarea
          placeholder="Doações aceitas (separadas por vírgula)"
          value={acceptedDonations}
          onChange={e => setAcceptedDonations(e.target.value)}
        />
        <Button onClick={handleRegister}>Cadastrar Ponto de Doação</Button>
      </DialogContent>
    </Dialog>
  );
};

export default DonationPointModal;
