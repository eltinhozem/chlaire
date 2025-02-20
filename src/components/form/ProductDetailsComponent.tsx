import React from 'react';
import {
  inputLabel,
  selectField
} from './styles';

interface ProductDetailsProps {
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ProductDetailsComponent: React.FC<ProductDetailsProps> = ({ formData, handleChange }) => {
  return (
    <>
      <div>
        <label htmlFor="category" className={inputLabel}>
          Categoria *
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className={selectField}
        >
          <option value="">Selecione uma categoria</option>
          <option value="Anel">Anel</option>
          <option value="Aliança">Aliança</option>
          <option value="Meia Aliança">Meia Aliança</option>
          <option value="Pingente">Pingente</option>
          <option value="Brinco">Brinco</option>
          <option value="Colar">Colar</option>
          <option value="Pulseira">Pulseira</option>
          <option value="Broche">Broche</option>
          <option value="Riviera">Riviera</option>
        </select>
      </div>

      <div>
        <label htmlFor="finish" className={inputLabel}>
          Acabamento
        </label>
        <select
          id="finish"
          name="finish"
          value={formData.finish}
          onChange={handleChange}
          className={selectField}
        >
          <option value="">Selecione um acabamento</option>
          <option value="Polido">Polido</option>
          <option value="Fosco">Fosco</option>
          <option value="Texturizado">Texturizado</option>
          <option value="Martelado">Martelado</option>
          <option value="Escovado">Escovado</option>
          <option value="Envelhecido">Envelhecido</option>
        </select>
      </div>

      <div>
        <label htmlFor="designer" className={inputLabel}>
          Designer
        </label>
        <select
          id="designer"
          name="designer"
          value={formData.designer}
          onChange={handleChange}
          className={selectField}
        >
          <option value="">Selecione um estilo</option>
          <option value="Clássico">Clássico</option>
          <option value="Moderno">Moderno</option>
          <option value="Vintage">Vintage</option>
          <option value="Contemporâneo">Contemporâneo</option>
          <option value="Personalizado">Personalizado</option>
          <option value="Minimalista">Minimalista</option>
        </select>
      </div>

      <div>
        <label htmlFor="target_audience" className={inputLabel}>
          Público-Alvo
        </label>
        <select
          id="target_audience"
          name="target_audience"
          value={formData.target_audience}
          onChange={handleChange}
          className={selectField}
        >
          <option value="">Selecione o público-alvo</option>
          <option value="Feminino">Feminino</option>
          <option value="Masculino">Masculino</option>
          <option value="Infantil">Infantil</option>
          <option value="Unissex">Unissex</option>
        </select>
      </div>
    </>
  );
};

export default ProductDetailsComponent;