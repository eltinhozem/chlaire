import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp, Edit2, Gem, Check, Plus, Trash2 } from 'lucide-react';
import { PrimaryButton } from '../../buttons/PrimaryButton';
import { SecondaryButton } from '../../buttons/SecondaryButton';
import { DangerButton } from '../../buttons/DangerButton';
import type { Supplier, SupplierPriceEntry } from '../fornecedor';
import {
  SectionCard,
  ToggleButton,
  TableWrapper,
  TableHeader,
  TableRow,
  Input
} from '../styles';

interface SupplierPriceTableProps {
  supplier: Supplier;
  onUpdatePrices: (prices: SupplierPriceEntry[]) => void;
  isEditing: boolean;
  onToggleEdit: () => void;
  onSave: () => void;
}

const SupplierPriceTable = ({
  supplier,
  onUpdatePrices,
  isEditing,
  onToggleEdit,
  onSave
}: SupplierPriceTableProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editPrices, setEditPrices] = useState<SupplierPriceEntry[]>(supplier.prices);

  useEffect(() => {
    setEditPrices(supplier.prices);
  }, [supplier]);

  const handleRowChange = (index: number, field: 'mm' | 'price', value: number) => {
    const updated = editPrices.map((p, i) => (i === index ? { ...p, [field]: value } : p));
    setEditPrices(updated);
    onUpdatePrices(updated);
  };

  const handleAddRow = () => {
    const updated = [...editPrices, { mm: 0, price: 0 }];
    setEditPrices(updated);
    onUpdatePrices(updated);
  };

  const handleRemoveRow = (index: number) => {
    const updated = editPrices.filter((_, i) => i !== index);
    setEditPrices(updated);
    onUpdatePrices(updated);
  };

  return (
    <SectionCard>
      <ToggleButton type="button" onClick={() => setIsOpen((prev) => !prev)}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Gem size={18} />
          Tabela de Preços - {supplier.name}
        </span>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </ToggleButton>

      {isOpen && (
        <>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
            <SecondaryButton type="button" onClick={onToggleEdit}>
              <Edit2 size={16} style={{ marginRight: 6 }} />
              {isEditing ? 'Cancelar' : 'Alterar valores'}
            </SecondaryButton>
            {isEditing && (
              <PrimaryButton type="button" onClick={onSave}>
                <Check size={16} style={{ marginRight: 6 }} />
                Salvar
              </PrimaryButton>
            )}
            {isEditing && (
              <SecondaryButton type="button" onClick={handleAddRow}>
                <Plus size={16} style={{ marginRight: 6 }} />
                Adicionar linha
              </SecondaryButton>
            )}
          </div>
          <TableWrapper>
            <TableHeader>
              <span>Tamanho (mm)</span>
              <span>Preço (R$)</span>
              {isEditing && <span>Ações</span>}
            </TableHeader>
            {editPrices.map((entry, idx) => (
              <TableRow
                key={`${entry.mm}-${idx}`}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isEditing ? '1fr 1fr auto' : '1fr 1fr',
                  gap: '0.5rem',
                  alignItems: 'center'
                }}
              >
                {isEditing ? (
                  <Input
                    type="number"
                    min="0"
                    step="0.1"
                    value={entry.mm || 0}
                    onChange={(e) => handleRowChange(idx, 'mm', parseFloat(e.target.value) || 0)}
                    style={{ padding: '0.3rem 0.5rem', fontSize: '0.85rem' }}
                  />
                ) : (
                  <span>{entry.mm.toFixed(1)}mm</span>
                )}
                {isEditing ? (
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    value={entry.price || 0}
                    onChange={(e) => handleRowChange(idx, 'price', parseFloat(e.target.value) || 0)}
                    style={{ padding: '0.3rem 0.5rem', fontSize: '0.85rem' }}
                  />
                ) : (
                  <span>R$ {entry.price.toFixed(2)}</span>
                )}
                {isEditing && (
                  <DangerButton type="button" onClick={() => handleRemoveRow(idx)}>
                    <Trash2 size={14} style={{ marginRight: 4 }} />
                    Remover
                  </DangerButton>
                )}
              </TableRow>
            ))}
          </TableWrapper>
        </>
      )}
    </SectionCard>
  );
};

export default SupplierPriceTable;
