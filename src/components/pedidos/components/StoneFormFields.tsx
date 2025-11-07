import React from 'react';
import { PedidoStone } from '../types';
import { lightTheme } from '../../Styles';
import {
  StoneFormContainer,
  FormRow,
  FormRowLarge,
  FieldContainer,
  Label,
  Input,
  Select,
  QuantityTypeContainer,
  RadioLabel
} from '../styles/StoneStyles';

interface StoneFormFieldsProps {
  stone: PedidoStone;
  index: number;
  onChange: (field: keyof PedidoStone, value: string | number | boolean) => void;
}

const tiposDePedra = [
  'Diamante', 'Safira', 'Rubi', 'Esmeralda', 'Topázio', 'Ametista', 
  'Turmalina', 'Opala', 'Pérola', 'Granada', 'Água-marinha', 'Citrino',
  'Alexandrita', 'Tanzanita', 'Lápis-lazúli', 'Quartzo Rosa', 'Pedra da Lua',
  'Malaquita', 'Ônix', 'Coral', 'Zircônia', 'Zircão'
];

const StoneFormFields: React.FC<StoneFormFieldsProps> = ({ stone, index, onChange }) => {
  const currentTheme = lightTheme; // This could be dynamic based on your theme context

  return (
    <StoneFormContainer>
      {/* Primeira linha: Informações básicas */}
      <FormRow>
        <FieldContainer>
          <Label theme={currentTheme}>
            Onde *
          </Label>
          <Input
            theme={currentTheme}
            type="text"
            value={stone.onde}
            onChange={(e) => onChange('onde', e.target.value)}
            required
          />
        </FieldContainer>
        
        <FieldContainer>
          <Label theme={currentTheme}>
            Tipo *
          </Label>
          <Select
            theme={currentTheme}
            value={stone.tipo}
            onChange={(e) => onChange('tipo', e.target.value)}
            required
          >
            {tiposDePedra.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </Select>
        </FieldContainer>
        
        <FieldContainer>
          <Label theme={currentTheme}>
            Lapidação *
          </Label>
          <Select
            theme={currentTheme}
            value={stone.lapidacao}
            onChange={(e) => onChange('lapidacao', e.target.value)}
            required
          >
            <option value="Redonda">Redonda</option>
            <option value="Quadrada">Quadrada</option>
            <option value="Oval">Oval</option>
            <option value="Gota">Gota</option>
            <option value="Navete">Navete</option>
            <option value="Esmeralda">Esmeralda</option>
            <option value="Princesa">Princesa</option>
            <option value="Almofada">Esmeralda quadrada</option>
            <option value="Coração">Coração</option>
            <option value="Outra">Outra</option>
          </Select>
        </FieldContainer>
      </FormRow>

      {/* Segunda linha: Tipo de Cravação e Tipo de Quantidade */}
      <FormRow>
        <FieldContainer>
          <Label theme={currentTheme}>
            Tipo de Cravação
          </Label>
          <Select
            theme={currentTheme}
            value={stone.tipoCravacao || ''}
            onChange={(e) => onChange('tipoCravacao' as keyof PedidoStone, e.target.value)}
          >
            <option value="">Selecione</option>
            <option value="Guarras 2">Guarras 2</option>
            <option value="Guarras 3">Guarras 3</option>
            <option value="Guarras 4">Guarras 4</option>
            <option value="Guarras 5">Guarras 5</option>
            <option value="Guarras 6">Guarras 6</option>
          </Select>
        </FieldContainer>

        <FieldContainer>
          <Label theme={currentTheme}>
            Tipo de Quantidade
          </Label>
          <QuantityTypeContainer>
            <RadioLabel theme={currentTheme}>
              <input
                type="radio"
                name={`tipoQuantidade-${index}`}
                checked={stone.tipoQuantidade === 'exata'}
                onChange={() => onChange('tipoQuantidade' as keyof PedidoStone, 'exata')}
              />
              <span>Quantidade exata</span>
            </RadioLabel>
            <RadioLabel theme={currentTheme}>
              <input
                type="radio"
                name={`tipoQuantidade-${index}`}
                checked={stone.tipoQuantidade === 'maximo'}
                onChange={() => onChange('tipoQuantidade' as keyof PedidoStone, 'maximo')}
              />
              <span>No máximo</span>
            </RadioLabel>
            <RadioLabel theme={currentTheme}>
              <input
                type="radio"
                name={`tipoQuantidade-${index}`}
                checked={stone.tipoQuantidade === 'minimo'}
                onChange={() => onChange('tipoQuantidade' as keyof PedidoStone, 'minimo')}
              />
              <span>No mínimo</span>
            </RadioLabel>
            <RadioLabel theme={currentTheme}>
              <input
                type="radio"
                name={`tipoQuantidade-${index}`}
                checked={stone.tipoQuantidade === 'livre'}
                onChange={() => onChange('tipoQuantidade' as keyof PedidoStone, 'livre')}
              />
              <span>Livre</span>
            </RadioLabel>
          </QuantityTypeContainer>
          
          {stone.tipoQuantidade !== 'livre' && (
            <div style={{ marginTop: '0.5rem' }}>
              <Label theme={currentTheme}>
                Quantidade *
              </Label>
              <Input
                theme={currentTheme}
                type="number"
                min="1"
                value={stone.quantidade === 0 ? '' : stone.quantidade}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '') {
                    onChange('quantidade', 0);
                  } else {
                    const numValue = Number(value);
                    if (!isNaN(numValue)) {
                      onChange('quantidade', numValue);
                    }
                  }
                }}
                placeholder="Digite a quantidade"
                required
              />
            </div>
          )}
        </FieldContainer>
      </FormRow>
      
      {/* Terceira linha: Dimensões e PTS */}
      <FormRowLarge>
        <FieldContainer>
          <Label theme={currentTheme}>
            PTS {stone.lapidacao === 'Redonda' && '(auto)'}
          </Label>
          <Input
            theme={currentTheme}
            type="number"
            step="0.01"
            value={stone.pts}
            onChange={(e) => onChange('pts', e.target.value)}
            placeholder={stone.lapidacao === 'Redonda' ? 'Autocompletado' : 'PTS'}
            readOnly={stone.lapidacao === 'Redonda'}
          />
        </FieldContainer>

        <FieldContainer>
          <Label theme={currentTheme}>
            Quilates {stone.lapidacao === 'Redonda' && '(auto)'}
          </Label>
          <Input
            theme={currentTheme}
            type="number"
            step="0.001"
            value={stone.quilates || ''}
            onChange={(e) => onChange('quilates' as keyof PedidoStone, e.target.value)}
            placeholder={stone.lapidacao === 'Redonda' ? 'Autocompletado' : 'Quilates'}
            readOnly={stone.lapidacao === 'Redonda'}
          />
        </FieldContainer>
        
        <FieldContainer>
          <Label theme={currentTheme}>
            {stone.lapidacao === 'Redonda' ? 'Diâmetro (mm) *' : 'Largura (mm) *'}
          </Label>
          <Input
            theme={currentTheme}
            type="number"
            step="0.1"
            value={stone.largura}
            onChange={(e) => onChange('largura', e.target.value)}
            required
            placeholder={stone.lapidacao === 'Redonda' ? 'Digite o diâmetro' : 'Largura'}
          />
        </FieldContainer>   
        
        <FieldContainer>
          <Label theme={currentTheme}>
            Comprimento (mm) *
          </Label>
          <Input
            theme={currentTheme}
            type="number"
            step="0.1"
            value={stone.comprimento}
            onChange={(e) => onChange('comprimento', e.target.value)}
            required
            readOnly={stone.lapidacao === 'Redonda'}
            placeholder={stone.lapidacao === 'Redonda' ? 'Sincronizado' : 'Comprimento'}
          />
        </FieldContainer>

        <FieldContainer>
          <Label theme={currentTheme}>
            Altura (mm)
          </Label>
          <Input
            theme={currentTheme}
            type="number"
            step="0.1"
            value={stone.altura}
            onChange={(e) => onChange('altura', e.target.value)}
          />
        </FieldContainer>
      </FormRowLarge>
    </StoneFormContainer>
  );
};

export default StoneFormFields;
