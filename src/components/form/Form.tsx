import type { ChangeEvent } from 'react';
import { FormContainer, FormTitle, InputLabel, Container, Campo } from './styles';
import { useFormLogic } from './useFormLogic';
import ImageUpload from './components/ImageUpload';
import FormSection from './components/FormSection';
import FormField from './components/FormField';
import StonesList from './components/StonesList';
import FormActions from './components/FormActions';
import ClienteAutocomplete from '../common/ClienteAutocomplete';
import { PrimaryButton, SecondaryButton } from '../buttons';
import { 
  categoryOptions, 
  targetAudienceOptions, 
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
    stoneSaveSignal,
    isEditing,
    isCloning,
    collections,
    collectionLoading,
    showNewCollection,
    setShowNewCollection,
    newCollectionName,
    setNewCollectionName,
    createCollection
  } = useFormLogic();

  const handleClientNameChange = (value: string) => {
    // Reaproveita a função padrão de mudança de campo para manter formData sincronizado
    handleChange({
      target: { name: 'client_name', value }
    } as ChangeEvent<HTMLInputElement>);
  };

  return (
    <FormContainer>
      <FormTitle>
        {isEditing ? 'Editar Joia' : isCloning ? 'Clonar Joia' : 'Cadastrar Nova Joia'}
      </FormTitle>
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
              <div style={{ flex: 1 }}>
                <FormField
                  label="Data"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  type="date"
                  required
                />
              </div>
              <SecondaryButton
                type="button"
                size="sm"
                onClick={() => setShowNewCollection((prev) => !prev)}
                disabled={collectionLoading}
              >
                Nova coleção
              </SecondaryButton>
            </div>
            {showNewCollection && (
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                <div style={{ flex: 1 }}>
                  <FormField
                    label="Nome da coleção"
                    id="collection_name"
                    name="collection_name"
                    value={newCollectionName}
                    onChange={(e) => setNewCollectionName(e.target.value)}
                    placeholder="Ex: Coleção Primavera"
                  />
                </div>
                <PrimaryButton
                  type="button"
                  size="sm"
                  onClick={createCollection}
                  disabled={collectionLoading || !newCollectionName.trim()}
                >
                  Salvar
                </PrimaryButton>
              </div>
            )}
          </div>
        </FormSection>

        <FormSection>
          <div style={{ gridColumn: '1 / -1' }}>
            <FormField
              label="Coleção (opcional)"
              id="collection_id"
              name="collection_id"
              value={formData.collection_id || ''}
              onChange={handleChange}
              options={collections.map((collection) => ({
                value: collection.id,
                label: collection.name
              }))}
            />
          </div>
        </FormSection>

        {/* Segunda linha: 4 campos */}
        <FormSection>
          <FormField
            label="Referência"
            id="reference_name"
            name="reference_name"
            value={formData.reference_name}
            onChange={handleChange}
            placeholder={formData.collection_id ? 'Digite a referência' : 'Automatico'}
            required
            readOnly={isCloning ? false : !formData.collection_id}
            title={
              isCloning
                ? 'Você pode ajustar a referência ao clonar'
                : formData.collection_id
                  ? 'Editável para joias em coleção'
                  : 'Gerado automaticamente ao selecionar a categoria'
            }
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
            label="Designer"
            id="designer"
            name="designer"
            value={formData.designer}
            onChange={handleChange}
          />
          <div>
            <InputLabel>Nome do Cliente</InputLabel>
            <ClienteAutocomplete
              value={formData.client_name}
              onChange={handleClientNameChange}
              required
            />
          </div>
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
            required
            placeholder="01-01"
            pattern="[0-9]{2}-[0-9]{2}"
            title="Informe a rota no formato 00-00"
            maxLength={5}
            inputMode="numeric"
          />
          <FormField
            label="STL"
            id="stl"
            name="stl"
            value={formData.stl}
            onChange={handleChange}
          />
          <FormField
            label="Volume"
            id="volume"
            name="volume"
            value={formData.volume}
            onChange={handleChange}
            type="number"
            step="0.0001"
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
            label="Público-Alvo"
            id="target_audience"
            name="target_audience"
            value={formData.target_audience}
            onChange={handleChange}
            options={targetAudienceOptions}
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
          saveSignal={stoneSaveSignal}
          forceEditMode={isCloning}
        />

        {/* Botões de Ação */}
        <FormActions loading={loading} isEditing={isEditing} />
      </form>
    </FormContainer>
  );
}
