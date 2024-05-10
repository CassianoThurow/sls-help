'use client'
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const DonationInfoModal = ({ isOpen, onClose, donationPoint, onDelete }) => {
  if (!donationPoint) return null;

  const handleDelete = () => {
    if (confirm(`Deseja excluir o ponto de doação em ${donationPoint.address}?`)) {
      onDelete(donationPoint.id);
      onClose();
    }

  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Informações do Ponto de Doação</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <p><strong>Endereço:</strong> {donationPoint.address}</p>
          <p><strong>Aceita doações de:</strong> {donationPoint.acceptedDonations}</p>
        </DialogDescription>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="destructive" onClick={handleDelete}>Nāo é mais um ponto de doaçāo</Button>
          <Button variant="secondary" onClick={onClose}>Fechar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonationInfoModal;
