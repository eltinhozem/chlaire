import React from 'react';
import { PedidoStone } from '../types';

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

const baseInputStyles = "block w-full px-3 py-2 text-sm bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 rounded-md shadow-sm placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-primary-light focus:border-primary-light";

const Label: React.FC<{ children: React.ReactNode; required?: boolean }> = ({ children, required }) => (
  <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1">
    {children} {required && <span className="text-danger">*</span>}
  </label>
);

const Field: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
  <div className="flex flex-col">
    <Label required={required}>{label}</Label>
    {children}
  </div>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...props} className={`${baseInputStyles} ${props.className}`} />
);

const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => (
  <select {...props} className={`${baseInputStyles} ${props.className}`} />
);

const Radio: React.FC<{ name: string; checked: boolean; onChange: () => void; label: string; }> = ({ name, checked, onChange, label }) => (
    <label className="flex items-center gap-2 cursor-pointer">
      <input
        type="radio"
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 text-primary focus:ring-primary-light border-neutral-300 dark:border-neutral-600"
      />
      <span className="text-sm text-neutral-800 dark:text-neutral-200">{label}</span>
    </label>
);


const StoneFormFields: React.FC<StoneFormFieldsProps> = ({ stone, index, onChange }) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Primeira linha: Informações básicas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Field label="Onde">
          <Input
            type="text"
            value={stone.onde}
            onChange={(e) => onChange('onde', e.target.value)}
          />
        </Field>
        
        <Field label="Tipo">
          <Select
            value={stone.tipo}
            onChange={(e) => onChange('tipo', e.target.value)}
          >
            {tiposDePedra.map((tipo) => (
              <option key={tipo} value={tipo}>
                {tipo}
              </option>
            ))}
          </Select>
        </Field>
        
        <Field label="Lapidação">
          <Select
            value={stone.lapidacao}
            onChange={(e) => onChange('lapidacao', e.target.value)}
          >
            <option value="Redonda">Redonda</option>
            <option value="Quadrada">Quadrada</option>
            <option value="Oval">Oval</option>
            <option value="Gota">Gota</option>
            <option value="Navete">Navete</option>
            <option value="Esmeralda">Esmeralda</option>
            <option value="Princesa">Princesa</option>
            <option value="Almofada">Almofada</option>
            <option value="Coração">Coração</option>
            <option value="Outra">Outra</option>
          </Select>
        </Field>
      </div>

      {/* Segunda linha: Tipo de Cravação e Tipo de Quantidade */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Field label="Tipo de Cravação">
          <Select
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
        </Field>

        <div className="flex flex-col">
           <Label>Tipo de Quantidade</Label>
           <div className="grid grid-cols-2 gap-2 mt-1">
              <Radio name={`tipoQuantidade-${index}`} checked={stone.tipoQuantidade === 'exata'} onChange={() => onChange('tipoQuantidade' as keyof PedidoStone, 'exata')} label="Exata" />
              <Radio name={`tipoQuantidade-${index}`} checked={stone.tipoQuantidade === 'maximo'} onChange={() => onChange('tipoQuantidade'as keyof PedidoStone, 'maximo')} label="Máximo" />
              <Radio name={`tipoQuantidade-${index}`} checked={stone.tipoQuantidade === 'minimo'} onChange={() => onChange('tipoQuantidade'as keyof PedidoStone, 'minimo')} label="Mínimo" />
              <Radio name={`tipoQuantidade-${index}`} checked={stone.tipoQuantidade === 'livre'} onChange={() => onChange('tipoQuantidade'as keyof PedidoStone, 'livre')} label="Livre" />
          </div>
          
          {stone.tipoQuantidade !== 'livre' && (
            <div className="mt-2">
              <Field label="Quantidade">
                <Input
                  type="number"
                  min="1"
                  value={stone.quantidade === 0 ? '' : stone.quantidade}
                  onChange={(e) => {
                    const value = e.target.value;
                    onChange('quantidade', value === '' ? 0 : Number(value));
                  }}
                  placeholder="Digite a quantidade"
                />
              </Field>
            </div>
          )}
        </div>
      </div>
      
      {/* Terceira linha: Dimensões e PTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Field label={`PTS ${stone.lapidacao === 'Redonda' ? '(auto)' : ''}`}>
          <Input
            type="number"
            step="0.01"
            value={stone.pts}
            onChange={(e) => onChange('pts', e.target.value)}
            placeholder="PTS (sincronizado)"
          />
        </Field>

        <Field label={`Quilates ${stone.lapidacao === 'Redonda' ? '(auto)' : ''}`}>
          <Input
            type="number"
            step="0.001"
            value={stone.quilates || ''}
            onChange={(e) => onChange('quilates' as keyof PedidoStone, e.target.value)}
            placeholder="Quilates (sincronizado)"
          />
        </Field>
        
        <Field label={`${stone.lapidacao === 'Redonda' ? 'Diâmetro (mm)' : 'Largura (mm)'}`}>
          <Input
            type="number"
            step="0.1"
            value={stone.largura}
            onChange={(e) => onChange('largura', e.target.value)}
            placeholder={stone.lapidacao === 'Redonda' ? 'Digite o diâmetro' : 'Largura'}
          />
        </Field>   
        
        <Field label="Comprimento (mm)">
          <Input
            type="number"
            step="0.1"
            value={stone.comprimento}
            onChange={(e) => onChange('comprimento', e.target.value)}
            placeholder="Comprimento"
          />
        </Field>

        <Field label="Altura (mm)">
          <Input
            type="number"
            step="0.1"
            value={stone.altura}
            onChange={(e) => onChange('altura', e.target.value)}
          />
        </Field>
      </div>
    </div>
  );
};

export default StoneFormFields;
