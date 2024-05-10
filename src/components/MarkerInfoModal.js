'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const MarkerInfoModal = ({ isOpen, marker, onClose, onRemove }) => {
  if (!marker) return null;


  const fullStatus = marker.full ? 'Sim (Lotado)' : 'Não (Disponível)';
  const volunteersStatus = marker.needsVolunteers ? 'Sim' : 'Não';


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Abrigo</DialogTitle>
          <DialogDescription>
            Informações sobre o abrigo selecionado.
          </DialogDescription>
        </DialogHeader>
        <div className="mb-4 space-y-2">
          <p><strong>Nome:</strong> {marker.name}</p>
          <p><strong>Endereço:</strong> {marker.address}</p>
          <p><strong>Descrição:</strong> {marker.description}</p>
          <p>
            <strong>Lotado?</strong> <span style={{ fontWeight: 'bold', color: marker.full ? 'red' : 'green' }}>{fullStatus}</span>
          </p>
          <p><strong>Precisa de Voluntários?</strong> {volunteersStatus}</p>
          <p><strong>Turno Preferido:</strong> {marker.shift}</p>
          <p><strong>Necessidades:</strong> {marker.needs}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MarkerInfoModal;
