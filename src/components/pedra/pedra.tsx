import React, { useState } from 'react';
import { MinusCircle } from 'lucide-react';
import { classes, usePedraLogic, SaveButton, EditButton } from './styles';

interface Stone {
  stone_type: string;
  cut: string;
  quantity: number;
  quilates?: number;
  pts?: number;
  largura?: string;
  altura?: string;
  comprimento?: string;
}

interface PedraProps {
  index: number;
  stone: Stone;
  onRemove: (index: number) => void;
  onChange: (updatedStone: Stone) => void;
  onSave: (updatedStone: Stone) => void;
}

const Pedra: React.FC<PedraProps> = ({
  index,
  stone,
  onRemove,
  onChange,
  onSave,
}) => {
  const {
    tipo,
    lapidacao,
    quantidade,
    quilates,
    largura,
    altura,
    comprimento,
    pts,
    saved,
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
    dimensionsWithUnit,
  } = usePedraLogic(stone); // Passa a pedra inicial para o hook

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
    onChange(updatedStone); // Atualiza a pedra no componente pai
    return updatedStone;
  };

  const handleSaveClick = () => {
    const updatedStone = updateStone();
    handleSave();
    onSave(updatedStone); // Notifica o componente pai que a pedra foi salva
  };

  const handleEditClick = () => {
    handleEdit(); // Alternar para o modo de edição
  };

  const tiposDePedra = [
    'Diamante',
    'Safira',
    'Rubi',
    'Esmeralda',
    'Topázio',
    'Ametista',
    'Turmalina',
    'Opala',
    'Pérola',
    'Granada',
    'Água-marinha',
    'Citrino',
    'Alexandrita',
    'Tanzanita',
    'Lápis-lazúli',
    'Quartzo Rosa',
    'Pedra da Lua',
    'Malaquita',
    'Ônix',
    'Coral',
    'Zircônia',
    'Zircão',
  ];

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h4 className={classes.headerTitle}>Grupo Pedra {index + 1}</h4>
        <div className="flex space-x-2">
          {isViewMode ? (
            <EditButton type="button" onClick={handleEditClick}>
              Editar
            </EditButton>
          ) : (
            <SaveButton type="button" onClick={handleSaveClick}>
              Salvar pedra
            </SaveButton>
          )}
          <button
            type="button"
            onClick={() => onRemove(index)}
            className={classes.removeButton}
            aria-label="Remover pedra"
          >
            <MinusCircle className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isViewMode ? (
        // Modo de visualização
        <div className={classes.viewMode}>
          <div className={classes.gridMain}>
            <div>
              <p>
                <span className={classes.label}>Tipo:</span> {tipo}
              </p>
            </div>
            <div>
              <p>
                <span className={classes.label}>Lapidação:</span> {lapidacao}
              </p>
            </div>
            <div>
              <p>
                <span className={classes.label}>Largura:</span> {largura} mm
              </p>
            </div>
          </div>
          <div className={classes.gridMain}>
            <div>
              <p>
                <span className={classes.label}>Quantidade:</span> {quantidade}
              </p>
            </div>
            <div>
              <p>
                <span className={classes.label}>Quilates:</span> {quilates}
              </p>
            </div>
            <div>
              <p>
                <span className={classes.label}>Comprimento:</span> {comprimento} mm
              </p>
            </div>
          </div>
          <div className={classes.gridPTS}>
            <div>
              <p>
                <span className={classes.label}>PTS:</span> {pts}
              </p>
            </div>
            <div>
              <p>
                <span className={classes.label}>Altura:</span> {altura} mm
              </p>
            </div>
          </div>
        </div>
      ) : (
        // Modo de edição
        <div>
          <div className={classes.gridMain}>
            <div>
              <label className={classes.label}>Tipo *</label>
              <select
                name="stone_type"
                value={tipo}
                onChange={handleTipoChange}
                required
                className={classes.input}
              >
                {tiposDePedra.map((pedra) => (
                  <option key={pedra} value={pedra}>
                    {pedra}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={classes.label}>Lapidação *</label>
              <select
                name="cut"
                value={lapidacao}
                onChange={handleLapidacaoChange}
                required
                className={classes.input}
              >
                <option value="Redonda">Redonda</option>
                <option value="Quadrada">Quadrada</option>
                <option value="Oval">Oval</option>
                <option value="Gota">Gota</option>
                <option value="Navete">Navete</option>
                <option value="Esmeralda">Esmeralda</option>
                <option value="Princesa">Princesa</option>
                <option value="Almofada">Esmeralda quadrada</option>
                <option value="Outra">Outra</option>
              </select>
            </div>
            <div>
              <label className={classes.label}>Largura (mm)</label>
              <input
                type="number"
                name="largura"
                step="0.1"
                placeholder="Largura"
                value={largura}
                onChange={handleLarguraChange}
                className={classes.input}
              />
            </div>
          </div>
          <div className={classes.gridMain}>
            <div>
              <label className={classes.label}>Quantidade *</label>
              <input
                type="number"
                name="quantity"
                min="1"
                value={quantidade}
                onChange={handleQuantidadeChange}
                required
                className={classes.input}
              />
            </div>
            <div>
              <label className={classes.label}>Quilates</label>
              <input
                type="number"
                name="quilates"
                step="0.001"
                value={quilates}
                onChange={handleQuilatesChange}
                className={classes.input}
                readOnly
              />
            </div>
            <div>
              <label className={classes.label}>Comprimento (mm)</label>
              <input
                type="number"
                name="comprimento"
                step="0.1"
                placeholder="Comprimento"
                value={comprimento}
                onChange={handleComprimentoChange}
                className={classes.input}
              />
            </div>
          </div>
          <div className={classes.gridPTS}>
            <div>
              <label className={classes.label}>PTS</label>
              <input
                type="number"
                name="pts"
                step="0.01"
                value={pts}
                onChange={handlePtsChange}
                className={classes.input}
              />
            </div>
            <div>
              <label className={classes.label}>Altura (mm)</label>
              <input
                type="number"
                name="altura"
                step="0.1"
                value={altura}
                onChange={handleAlturaChange}
                className={classes.input}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedra;