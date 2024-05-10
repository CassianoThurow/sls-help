// RegisterShelterModal.js
'use client'
import { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const RegisterShelterModal = ({ isOpen, onClose, onRegister }) => {
  const [shelterName, setShelterName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [isFull, setIsFull] = useState('no');
  const [needsVolunteers, setNeedsVolunteers] = useState('no');
  const [shift, setShift] = useState('');
  const [needs, setNeeds] = useState('');

  const handleRegister = async () => {
    const fullAddress = `${address}, São Lourenço do Sul`;

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
        onRegister({
          type: "shelter",
          name: shelterName,
          description,
          address: fullAddress,
          lat,
          lng,
          isFull: isFull === 'yes',
          needsVolunteers: needsVolunteers === 'yes',
          shift,
          needs
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
          <DialogTitle>Registrar Novo Abrigo</DialogTitle>
          <DialogDescription>
            Insira as informações do abrigo e especifique a localização no mapa.
          </DialogDescription>
        </DialogHeader>
        <Input
          id="shelterName"
          placeholder="Nome do abrigo"
          value={shelterName}
          onChange={(e) => setShelterName(e.target.value)}
        />
        <Input
          id="address"
          placeholder="Endereço"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="isFull">Lotado?</label>
        <Select value={isFull} onValueChange={setIsFull}>
          <SelectTrigger id="isFull" className="w-full">
            <SelectValue placeholder="Está Lotado?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Sim</SelectItem>
            <SelectItem value="no">Não</SelectItem>
          </SelectContent>
        </Select>
        <label htmlFor="needsVolunteers">Precisa de Voluntários?</label>
        <Select value={needsVolunteers} onValueChange={setNeedsVolunteers}>
          <SelectTrigger id="needsVolunteers" className="w-full">
            <SelectValue placeholder="Precisa de Voluntários?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="yes">Sim</SelectItem>
            <SelectItem value="no">Não</SelectItem>
          </SelectContent>
        </Select>
        <label htmlFor="shift">Turno:</label>
        <Select value={shift} onValueChange={setShift}>
          <SelectTrigger id="shift" className="w-full">
            <SelectValue placeholder="Turno Preferido" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Manhã">Manhã</SelectItem>
            <SelectItem value="Tarde">Tarde</SelectItem>
            <SelectItem value="Noite">Noite</SelectItem>
          </SelectContent>
        </Select>
        <label htmlFor="needs">Precisamos de:</label>
        <Textarea
          id="needs"
          placeholder="Descreva as necessidades do abrigo..."
          value={needs}
          onChange={(e) => setNeeds(e.target.value)}
        />
        <Button onClick={handleRegister}>Registrar Abrigo</Button>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterShelterModal;
