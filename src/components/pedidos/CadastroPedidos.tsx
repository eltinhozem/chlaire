import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, Upload } from 'lucide-react';
import { PedidoStone, ReferenciaModelo } from './types';
import PedidoStoneComponent from './components/PedidoStone';
import { categoryOptions } from '../form/formOptions';
import { SecondaryButton, PrimaryButton, SuccessButton } from '../buttons';
import { usePedidos } from './hooks/usePedidos';
import { lightTheme } from '../Styles';
import {
  PageContainer,
  PageTitle,
  FormContainer,
  CardContainer,
  SectionTitle,
  GridContainer,
  FieldContainer,
  Label,
  Input,
  Select,
  Textarea,
  CheckboxContainer,
  CheckboxLabel,
  CheckboxInput,
  ButtonContainer,
  ImagePreviewContainer,
  ImagePreview,
  ImagePreviewImg,
  FullWidthContainer
} from './styles/PedidoStyles';

const CadastroPedidos: React.FC = () => {
  const navigate = useNavigate();
  const { savePedido, loading } = usePedidos();
  
  const [imagePreview, setImagePreview] = useState<string>('');
  const [nomeCliente, setNomeCliente] = useState('');
  const [categoria, setCategoria] = useState('');
  const [tamanho, setTamanho] = useState('');
  const [descricao, setDescricao] = useState('');
  const [aramado, setAramado] = useState(false);
  const [galeria, setGaleria] = useState(false);
  const [paraRender, setParaRender] = useState(false);
  const [dataPrevistaEntrega, setDataPrevistaEntrega] = useState('');
  const [semDataEntrega, setSemDataEntrega] = useState(false);
  const [stones, setStones] = useState<PedidoStone[]>([]);
  const [referenciaModelo, setReferenciaModelo] = useState<ReferenciaModelo>({
    rota: '',
    cliente: ''
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addStone = () => {
    const newStone: PedidoStone = {
      onde: '',
      tipo: 'Diamante',
      lapidacao: 'Redonda',
      quantidade: 0,
      largura: '',
      altura: '',
      comprimento: '',
      pts: '',
      quantidadeMaxima: undefined,
      quantidadeMinima: undefined,
      tipoQuantidade: 'exata',
      tipoCravacao: ''
    };
    setStones([...stones, newStone]);
  };

  const removeStone = (index: number) => {
    setStones(stones.filter((_, i) => i !== index));
  };

  const updateStone = (index: number, updatedStone: PedidoStone) => {
    const newStones = [...stones];
    newStones[index] = updatedStone;
    setStones(newStones);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const novoPedido = {
        imagem: imagePreview,
        nomeCliente,
        categoria,
        tamanho,
        descricao,
        aramado,
        galeria,
        paraRender,
        dataCreated: new Date(),
        dataPrevistaEntrega: semDataEntrega ? undefined : (dataPrevistaEntrega ? new Date(dataPrevistaEntrega) : undefined),
        stones,
        referenciaModelo,
        riscado: false,
        prioridade: 1
      };

      await savePedido(novoPedido);
      alert('Pedido cadastrado com sucesso!');
      navigate('/lista-pedidos');
    } catch (err) {
      console.error('Erro ao cadastrar pedido:', err);
      alert('Erro ao cadastrar pedido. Tente novamente.');
    }
  };

  // Determine current theme (you might want to get this from a context or prop)
  const currentTheme = lightTheme; // This could be dynamic based on your theme context

  return (
    <PageContainer theme={currentTheme}>
      <PageTitle theme={currentTheme}>Cadastro de Pedidos</PageTitle>
      
      <FormContainer theme={currentTheme} onSubmit={handleSubmit}>
        {/* Upload de Imagem */}
        <CardContainer theme={currentTheme}>
          <SectionTitle theme={currentTheme}>Imagem do Pedido</SectionTitle>
          <ImagePreviewContainer>
            {imagePreview && (
              <ImagePreview theme={currentTheme}>
                <ImagePreviewImg
                  src={imagePreview}
                  alt="Preview"
                />
              </ImagePreview>
            )}
            <label style={{ cursor: 'pointer' }}>
              <SecondaryButton as="div" className="flex items-center gap-2">
                <Upload size={20} />
                {imagePreview ? 'Trocar Imagem' : 'Adicionar Imagem'}
              </SecondaryButton>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
              />
            </label>
          </ImagePreviewContainer>
        </CardContainer>

        {/* Informações Básicas */}
        <CardContainer theme={currentTheme}>
          <SectionTitle theme={currentTheme}>Informações do Pedido</SectionTitle>
          <GridContainer>
            <FieldContainer>
              <Label theme={currentTheme}>
                Nome Cliente *
              </Label>
              <Input
                theme={currentTheme}
                type="text"
                value={nomeCliente}
                onChange={(e) => setNomeCliente(e.target.value)}
                required
              />
            </FieldContainer>
            
            <FieldContainer>
              <Label theme={currentTheme}>
                Categoria *
              </Label>
              <Select
                theme={currentTheme}
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </FieldContainer>
            
            <FieldContainer>
              <Label theme={currentTheme}>
                Tamanho 
              </Label>
              <Input
                theme={currentTheme}
                type="text"
                value={tamanho}
                onChange={(e) => setTamanho(e.target.value)}
              />
            </FieldContainer>

            <FieldContainer>
              <Label theme={currentTheme}>
                Data Prevista de Entrega
              </Label>
              <Input
                theme={currentTheme}
                type="date"
                value={dataPrevistaEntrega}
                onChange={(e) => setDataPrevistaEntrega(e.target.value)}
                disabled={semDataEntrega}
              />
              <CheckboxLabel theme={currentTheme} style={{ marginTop: '0.5rem' }}>
                <CheckboxInput
                  type="checkbox"
                  checked={semDataEntrega}
                  onChange={(e) => {
                    setSemDataEntrega(e.target.checked);
                    if (e.target.checked) {
                      setDataPrevistaEntrega('');
                    }
                  }}
                />
                <span>Sem data de entrega definida</span>
              </CheckboxLabel>
            </FieldContainer>
            
            <FullWidthContainer>
              <FieldContainer>
                <Label theme={currentTheme}>
                  Descrição *
                </Label>
                <Textarea
                  theme={currentTheme}
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  rows={3}
                  required
                />
              </FieldContainer>
            </FullWidthContainer>
          </GridContainer>
          
          {/* Checkboxes */}
          <CheckboxContainer>
            <CheckboxLabel theme={currentTheme}>
              <CheckboxInput
                type="checkbox"
                checked={aramado}
                onChange={(e) => setAramado(e.target.checked)}
              />
              <span>Aramado</span>
            </CheckboxLabel>
            
            <CheckboxLabel theme={currentTheme}>
              <CheckboxInput
                type="checkbox"
                checked={galeria}
                onChange={(e) => setGaleria(e.target.checked)}
              />
              <span>Galeria</span>
            </CheckboxLabel>

            <CheckboxLabel theme={currentTheme}>
              <CheckboxInput
                type="checkbox"
                checked={paraRender}
                onChange={(e) => setParaRender(e.target.checked)}
              />
              <span>Para Render</span>
            </CheckboxLabel>
          </CheckboxContainer>
        </CardContainer>

        {/* Pedras */}
        <CardContainer theme={currentTheme}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <SectionTitle theme={currentTheme}>Pedras</SectionTitle>
            <SuccessButton type="button" onClick={addStone} className="flex items-center gap-2">
              <PlusCircle size={16} />
              Adicionar Pedra
            </SuccessButton>
          </div>
          
          {stones.map((stone, index) => (
            <PedidoStoneComponent
              key={index}
              index={index}
              stone={stone}
              onRemove={removeStone}
              onChange={updateStone}
            />
          ))}
        </CardContainer>

        {/* Referência do Modelo */}
        <CardContainer theme={currentTheme}>
          <SectionTitle theme={currentTheme}>Referência do Modelo</SectionTitle>
          <GridContainer>
            <FieldContainer>
              <Label theme={currentTheme}>
                Rota
              </Label>
              <Input
                theme={currentTheme}
                type="text"
                value={referenciaModelo.rota}
                onChange={(e) => setReferenciaModelo({
                  ...referenciaModelo,
                  rota: e.target.value
                })}
              />
            </FieldContainer>
            
            <FieldContainer>
              <Label theme={currentTheme}>
                Cliente
              </Label>
              <Input
                theme={currentTheme}
                type="text"
                value={referenciaModelo.cliente}
                onChange={(e) => setReferenciaModelo({
                  ...referenciaModelo,
                  cliente: e.target.value
                })}
              />
            </FieldContainer>
          </GridContainer>
        </CardContainer>

        {/* Botões */}
        <ButtonContainer>
          <SecondaryButton
            type="button"
            onClick={() => navigate('/lista-pedidos')}
            disabled={loading}
          >
            Cancelar
          </SecondaryButton>
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Pedido'}
          </PrimaryButton>
        </ButtonContainer>
      </FormContainer>
    </PageContainer>
  );
};

export default CadastroPedidos;
