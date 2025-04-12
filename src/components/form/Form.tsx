import React from 'react';
import { FormContainer, FormTitle, InputLabel, Container, Campo } from './styles';
import { useFormLogic } from './useFormLogic';
import ImageUpload from './components/ImageUpload';
import FormSection from './components/FormSection';
import FormField from './components/FormField';
import StonesList from './components/StonesList';
import FormActions from './components/FormActions';
import { 
  categoryOptions, 
  targetAudienceOptions, 
  designerOptions, 
  materialOptions, 
  finishOptions 
} from './formOptions';

export default function JewelryForm() {
  const {
    formData,
    stones,
    loading,
    imagePreviewUrl,
    handleChange,
    handleSubmit,
    handleImageChange,
    addStone,
    removeStone,
    handleStoneChange,
    isEditing
  } = useFormLogic();

  return (
    <FormContainer>
      <FormTitle>{isEditing ? 'Editar Joia' : 'Cadastrar Nova Joia'}</FormTitle>
      <form onSubmit={handleSubmit}>
        {/* Primeira linha: Imagem da Joia e Data */}
        <FormSection>
          <div>
            <InputLabel>Imagem da Joia</InputLabel>
            <ImageUpload 
              imagePreviewUrl={imagePreviewUrl} 
              onImageChange={handleImageChange} 
            />
          </div>
          <FormField
            label="Data"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            type="date"
            required
          />
        </FormSection>

        {/* Segunda linha: 4 campos */}
        <FormSection>
          <FormField
            label="Referência"
            id="reference_name"
            name="reference_name"
            value={formData.reference_name}
            onChange={handleChange}
            required
          />
          <FormField
            label="Categoria"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categoryOptions}
            required
          />
          <FormField
            label="Público-Alvo"
            id="target_audience"
            name="target_audience"
            value={formData.target_audience}
            onChange={handleChange}
            options={targetAudienceOptions}
          />
          <FormField
            label="Nome do Cliente"
            id="client_name"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
          />
        </FormSection>

        {/* Terceira linha: 4 campos */}
        <FormSection>
          <FormField
            label="Tamanho"
            id="size"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
          <FormField
            label="Rota"
            id="rota"
            name="rota"
            value={formData.rota}
            onChange={handleChange}
          />
          <FormField
            label="STL"
            id="stl"
            name="stl"
            value={formData.stl}
            onChange={handleChange}
          />
          <FormField
            label="Versão"
            id="version"
            name="version"
            value={formData.version}
            onChange={handleChange}
            type="number"
          />
        </FormSection>

        {/* Quarta linha: 4 campos */}
        <FormSection>
          <FormField
            label="Peso (g)"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            type="number"
            step="0.01"
          />
          <FormField
            label="Designer"
            id="designer"
            name="designer"
            value={formData.designer}
            onChange={handleChange}
            options={designerOptions}
          />
          <FormField
            label="Material"
            id="material"
            name="material"
            value={formData.material}
            onChange={handleChange}
            options={materialOptions}
          />
          <FormField
            label="Acabamento"
            id="finish"
            name="finish"
            value={formData.finish}
            onChange={handleChange}
            options={finishOptions}
          />
        </FormSection>

        <Container>
          <Campo>
            <FormField
              label="Descrição"
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              isTextArea
              rows={4}
            />
          </Campo>

          <Campo>
            <FormField
              label="Observações"
              id="observations"
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              isTextArea
              rows={4}
            />
          </Campo>
        </Container>

        {/* Seção de Pedras */}
        <StonesList
          stones={stones}
          onAddStone={addStone}
          onRemoveStone={removeStone}
          onStoneChange={handleStoneChange}
        />

        {/* Botões de Ação */}
        <FormActions loading={loading} isEditing={isEditing} />
      </form>
    </FormContainer>
  );
}
