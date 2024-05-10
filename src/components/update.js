// UpdateShelterModal.js
'use client'
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const UpdateShelterModal = ({ isOpen, onClose, shelters, onUpdate }) => {
  const [selectedShelterId, setSelectedShelterId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [fullStatus, setFullStatus] = useState('nao');
  const [needsVolunteers, setNeedsVolunteers] = useState('nao');
  const [shift, setShift] = useState('');
  const [needs, setNeeds] = useState('');
  const [selectedShelter, setSelectedShelter] = useState(null);

  useEffect(() => {
    const shelter = shelters.find(s => s.id === selectedShelterId);
    setSelectedShelter(shelter);

    if (shelter) {
      setName(shelter.name || '');
      setDescription(shelter.description || '');
      setAddress(shelter.address || '');
      setFullStatus(shelter.full ? 'sim' : 'nao');
      setNeedsVolunteers(shelter.needsVolunteers ? 'sim' : 'nao');
      setShift(shelter.shift || '');
      setNeeds(shelter.needs || '');
    } else {
      setName('');
      setDescription('');
      setAddress('');
      setFullStatus('nao');
      setNeedsVolunteers('nao');
      setShift('');
      setNeeds('');
    }
  }, [selectedShelterId]);

  const handleUpdate = () => {
    if (selectedShelter) {
      const updatedShelter = {
        ...selectedShelter,
        name,
        description,
        address,
        full: fullStatus === 'sim',
        needsVolunteers: needsVolunteers === 'sim',
        shift,
        needs
      };
      onUpdate(updatedShelter);
      onClose();
    } else {
      alert('Por favor, selecione um abrigo para atualizar.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full p-4 md:max-w-2xl md:p-6 lg:max-w-3xl lg:p-8 h-screen overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">Atualizar Informações do Abrigo</DialogTitle>
          <DialogDescription className="text-sm">Selecione um abrigo para atualizar o status e as necessidades.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Select value={selectedShelterId} onValueChange={(value) => setSelectedShelterId(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um abrigo" />
            </SelectTrigger>
            <SelectContent>
              {shelters.map((shelter) => (
                <SelectItem key={shelter.id} value={shelter.id}>
                  {shelter.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Nome do abrigo"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Textarea
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className="space-y-1">
            <label className="block text-sm font-medium">Está lotado?</label>
            <Select value={fullStatus} onValueChange={(value) => setFullStatus(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Lotado?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="nao">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Precisa de voluntários?</label>
            <Select value={needsVolunteers} onValueChange={(value) => setNeedsVolunteers(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Precisa de voluntários?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sim">Sim</SelectItem>
                <SelectItem value="nao">Não</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Turno:</label>
            <Select value={shift} onValueChange={(value) => setShift(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Turno preferido" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="manha">Manhã</SelectItem>
                <SelectItem value="tarde">Tarde</SelectItem>
                <SelectItem value="noite">Noite</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium">Necessidades (separadas por vírgulas):</label>
            <Textarea
              placeholder="Necessidades"
              value={needs}
              onChange={(e) => setNeeds(e.target.value)}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="secondary" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleUpdate}>Atualizar Abrigo</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateShelterModal;
