
import React from 'react';
import { MinusCircle } from 'lucide-react';
import { Stone, PedraProps } from './types';
import { usePedraLogic } from './usePedraLogic';
import {
  StoneContainer,
  StoneHeader,
  StoneTitle,
  RemoveButton,
  GridMain,
  Label,
  Input,
  Select,
  ViewMode,
  ViewText,
  EditButton,
  SaveButton,
} from './styles';

const Pedra: React.FC<PedraProps> = ({ index, stone, onRemove, onChange, onSave }) => {
  const {
    tipo,
    lapidacao,
    quantidade,
    quilates,
    largura,
    altura,
    comprimento,
    pts,
    isViewMode,
    handleTipoChange,
    handleLapidacaoChange,
    handleQuantidadeChange,
    handleQuilatesChange,
    handlePtsChange,
    handleLarguraChange,
    handleComprimentoChange,
    handleAlturaChange,
    handleSave,
    handleEdit,
  } = usePedraLogic(stone);

  const tiposDePedra = [
    'Diamante', 'Safira', 'Rubi', 'Esmeralda', 'Topázio', 'Ametista', 'Turmalina', 'Opala', 'Pérola', 'Granada',
    'Água-marinha', 'Citrino', 'Alexandrita', 'Tanzanita', 'Lápis-lazúli', 'Quartzo Rosa', 'Pedra da Lua', 'Malaquita',
    'Ônix', 'Coral', 'Zircônia', 'Zircão',
  ];

  const updateStone = () => {
    const updatedStone: Stone = {
      stone_type: tipo,
      cut: lapidacao,
      quantity: quantidade,
      quilates: quilates ? parseFloat(quilates) : undefined,
      pts: pts ? parseFloat(pts) : undefined,
      largura: largura || undefined,
      altura: altura || undefined,
      comprimento: comprimento || undefined,
    };
    onChange(updatedStone);
    return updatedStone;
  };

  const handleSaveClick = () => {
    const updatedStone = updateStone();
    handleSave();
    onSave(updatedStone);
  };

  const handleEditClick = () => {
    handleEdit();
  };

  return (
    <StoneContainer>
      <StoneHeader>
        <StoneTitle>Grupo Pedra {index + 1}</StoneTitle>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {isViewMode ? (
            <EditButton type="button" onClick={handleEditClick}>
              Editar
            </EditButton>
          ) : (
            <SaveButton type="button" onClick={handleSaveClick}>
              Salvar pedra
            </SaveButton>
          )}
          <RemoveButton type="button" onClick={() => onRemove(index)}>
            <MinusCircle size={20} />
          </RemoveButton>
        </div>
      </StoneHeader>

      {isViewMode ? (
        <ViewMode>
          <GridMain>
            <ViewText>
              <Label>Tipo:</Label> {tipo}
            </ViewText>
            <ViewText>
              <Label>Lapidação:</Label> {lapidacao}
            </ViewText>
            <ViewText>
              <Label>Quantidade:</Label> {quantidade}
            </ViewText>
            <ViewText>
              <Label>Quilates:</Label> {quilates || 'N/A'}
            </ViewText>
          </GridMain>
          <GridMain>
            <ViewText>
              <Label>PTS:</Label> {pts || 'N/A'}
            </ViewText>
            <ViewText>
              <Label>Largura:</Label> {largura ? `${largura} mm` : 'N/A'}
            </ViewText>            
            <ViewText>
              <Label>Comprimento:</Label> {comprimento ? `${comprimento} mm` : 'N/A'}
            </ViewText>
            <ViewText>
              <Label>Altura:</Label> {altura ? `${altura} mm` : 'N/A'}
            </ViewText>
          </GridMain>          
        </ViewMode>
      ) : (
        <div>
          <GridMain>
            <div>
              <Label>Tipo *</Label>
              <Select name="stone_type" value={tipo} onChange={handleTipoChange} required>
                {tiposDePedra.map((pedra) => (
                  <option key={pedra} value={pedra}>
                    {pedra}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label>Lapidação *</Label>
              <Select name="cut" value={lapidacao} onChange={handleLapidacaoChange} required>
                <option value="Redonda">Redonda</option>
                <option value="Quadrada">Quadrada</option>
                <option value="Oval">Oval</option>
                <option value="Gota">Gota</option>
                <option value="Navete">Navete</option>
                <option value="Esmeralda">Esmeralda</option>
                <option value="Princesa">Princesa</option>
                <option value="Almofada">Esmeralda quadrada</option>
                <option value="Outra">Outra</option>
              </Select>
            </div>
            <div>
              <Label>Quantidade *</Label>
              <Input
                type="number"
                name="quantity"
                min="1"
                value={quantidade}
                onChange={handleQuantidadeChange}
                required
              />
            </div>
            <div>
              <Label>Largura (mm)</Label>
              <Input
                type="number"
                name="largura"
                step="0.1"
                placeholder="Largura"
                value={largura}
                onChange={handleLarguraChange}
              />
            </div>
          </GridMain>
          <GridMain>
            <div>
              <Label>Comprimento (mm)</Label>
              <Input
                type="number"
                name="comprimento"
                step="0.1"
                placeholder="Comprimento"
                value={comprimento}
                onChange={handleComprimentoChange}
              />
            </div>
            <div>
              <Label>Altura (mm)</Label>
              <Input type="number" name="altura" step="0.1" value={altura} onChange={handleAlturaChange} />
            </div>
            <div>
              <Label>Quilates (calculado)</Label>
              <Input
                type="number"
                name="quilates"
                step="0.001"
                value={quilates}
                onChange={handleQuilatesChange}
                placeholder="Auto-calculado"
              />
            </div>
            <div>
              <Label>PTS (calculado)</Label>
              <Input 
                type="number" 
                name="pts" 
                step="0.01" 
                value={pts} 
                onChange={handlePtsChange}
                placeholder="Auto-calculado"
              />
            </div>
          </GridMain>
        </div>
      )}
    </StoneContainer>
  );
};

export default React.memo(Pedra);
