import React from 'react'
import { MinusCircle, Save } from 'lucide-react'
import { classes, usePedraLogic } from './styles' // Importa classes e usePedraLogic

interface Stone {
  stone_type: string
  cut: string
  quantity: number
  quilates?: number
  pts?: number
  largura?: string
  altura?: string
  comprimento?: string
}

interface PedraProps {
  index: number
  stone: Stone
  onRemove: (index: number) => void
  onChange: (updatedStone: Stone) => void
  onSave: (updatedStone: Stone) => void // Nova prop para salvar a pedra
}

const Pedra: React.FC<PedraProps> = ({
  index,
  stone,
  onRemove,
  onChange,
  onSave
}) => {
  // Usa o hook usePedraLogic para gerenciar o estado e os handlers
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
    handleTipoChange,
    handleLapidacaoChange,
    handleQuantidadeChange,
    handleQuilatesChange,
    handlePtsChange,
    handleLarguraChange,
    handleComprimentoChange,
    handleAlturaChange,
    handleSave
  } = usePedraLogic()

  // Atualiza o estado da pedra no componente pai
  const updateStone = () => {
    const updatedStone: Stone = {
      stone_type: tipo,
      cut: lapidacao,
      quantity: quantidade,
      quilates: quilates ? parseFloat(quilates) : undefined,
      pts: pts ? parseFloat(pts) : undefined,
      largura: largura || undefined,
      altura: altura || undefined,
      comprimento: comprimento || undefined
    }
    onChange(updatedStone) // Atualiza a pedra no componente pai
    return updatedStone
  }

  // Handler para salvar a pedra
  const handleSaveClick = () => {
    const updatedStone = updateStone() // Atualiza a pedra no componente pai
    handleSave() // Marca a pedra como salva
    onSave(updatedStone) // Chama a função onSave passando a pedra atualizada
  }

  // Lista de tipos de pedra
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
    'Zircão'
  ]

  return (
    <div className={classes.container}>
      {/* Cabeçalho da Pedra */}
      <div className={classes.header}>
        <h4 className={classes.headerTitle}>Grupo Pedra {index + 1}</h4>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={handleSaveClick}
            className={classes.saveButton}
            aria-label="Salvar pedra"
          >
            Gravar
          </button>
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

      {/* Campos da Pedra */}
      <div>
        {/* Tipo e Lapidação */}
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

        {/* Quantidade e Quilates */}
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
              readOnly // Campo somente leitura
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

        {/* PTS e Altura */}
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
    </div>
  )
}

export default Pedra
