import styled from 'styled-components'
import type { SupabaseClient } from '@supabase/supabase-js'

export const Container = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

// Campo individual
export const Campo = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: 50%;
  }
`

/* Container principal do formulário */
export const FormContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 0.75rem;
  background: ${({ theme }) => theme.formBackground || '#ffffff'};
  color: ${({ theme }) => theme.text || '#333333'};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

/* Título do formulário */
export const PedraTitle = styled.h2`
font-size: 1.875rem;  
  font-weight: bold;
  
  color: ${({ theme }) => theme.text || '#333333'};
    
  );
  
  -webkit-background-clip: text;
  background-clip: text;
  
 
  margin-bottom: 2rem;
  text-align: center;
`

export const FormTitle = styled.h2`
  font-size: 1.875rem;
  
  font-weight: bold;
  background: linear-gradient(
    to right,
    #fad2a4 0%,
    #f6cda0 3%,
    #ca9674 35%,
    #aa6e55 63%,
    #965641 85%,
    #8f4d3a 98%
    
  );
  
  -webkit-background-clip: text;
  background-clip: text;
  
  color: transparent;
  margin-bottom: 2rem;
  text-align: center;
`

/* Grid para a primeira linha: Imagem e Data */
export const ImageDateGrid = styled.div`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: 1fr 200px;
  }
`

/* Grid para grupos de campos – no mobile 1 coluna, em telas maiores 4 colunas */
export const FormGrid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }
`

/* Label dos campos */
export const InputLabel = styled.label`
  display: block;

  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.labelColor || '#374151'};
  margin-bottom: 0.5rem;
`

/* Campo de entrada (input) */
export const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;  
  text-align: center;
  /* Borda mais espessa e arredondada */
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};

  transition: all 0.2s;
  &:focus {
  
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.inputFocusShadow};
    background-color: ${({ theme }) => theme.inputFocusBackground};
    outline: none;
  }
`

export const SelectField = styled.select`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 0.5rem;
  background-color: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};
  text-align: center;
  transition: all 0.2s;

  &:focus {
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.inputFocusShadow};
    background-color: ${({ theme }) => theme.inputFocusBackground};
    outline: none;
  }

  /* Estilo das options */
  & option {
    background-color: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputText};
  }
`;


export const TextAreaField = styled.textarea`
  /* Herda tudo do InputField */
  ${InputField}
  resize: vertical;
  min-height: 6rem;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  background-color: ${({ theme }) => theme.inputBackground};
`

/* Seção de pedras */
export const StoneHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`

export const StoneTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(
    to right,
    #fad2a4 0%,
    #f6cda0 3%,
    #ca9674 35%,
    #aa6e55 63%,
    #965641 85%,
    #8f4d3a 98%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`

export const StoneSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

/* Botão de adicionar pedra */
export const AddStoneButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.addStoneButtonText || '#8b4513'};
  background: ${({ theme }) =>
    theme.addStoneButtonBackground ||
    'linear-gradient(to right, #fad2a4, #f6cda0, #ca9674)'};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 10px 30px
   ${({ theme }) =>
        theme.submitButtonFocusColor ||'rgba(250, 210, 164, 0.5)'};
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    transform: skewX(-45deg);
    transition: left 0.5s ease;
    z-index: -1;
  }
  &:hover {
    transform: scale(1.05);
     box-shadow: 0 0 0 1px
      ${({ theme }) =>
        theme.submitButtonFocusColor || 'rgba(202, 150, 116, 0.5)'};
  }
  &:hover::before {
    left: 100%;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.addStoneButtonFocusColor || 'rgba(202, 150, 116, 0.5)'};
  }
`

/* Botão de ação (Cancelar e Salvar) */
export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.actionButtonBorder || '#d1d5db'};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.actionButtonText || '#374151'};
  background-color: ${({ theme }) => theme.actionButtonBackground || 'white'};
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) =>
      theme.actionButtonHoverBackground || '#f3f4f6'};
  }
`

export const SubmitButton = styled(ActionButton)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.submitButtonText || '#8b4513'};
  background: ${({ theme }) =>
    theme.submitButtonBackground ||
    'linear-gradient(to right, #fad2a4, #f6cda0, #ca9674)'};
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  box-shadow: 0 10px 30px
   ${({ theme }) =>
        theme.submitButtonFocusColor ||'rgba(250, 210, 164, 0.5)'};
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.3);
    transform: skewX(-45deg);
    transition: left 0.5s ease;
    z-index: -1;
  }
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 0 1px
      ${({ theme }) =>
        theme.submitButtonFocusColor || 'rgba(202, 150, 116, 0.5)'};
  }
  &:hover::before {
    left: 100%;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px
      ${({ theme }) =>
        theme.submitButtonFocusColor || 'rgba(202, 150, 116, 0.5)'};
  }
`

/* Container de upload de imagem */
export const ImageUploadContainer = styled.div`
  margin-bottom: 2rem;
`

export const ImagePreview = styled.div`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: ${({ theme }) =>
    theme.imagePreviewBoxShadow || '0 4px 6px rgba(0, 0, 0, 0.1)'};
`

export const ImageUploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.uploadButtonBorder || '#d1d5db'};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.uploadButtonText || '#374151'};
  background-color: ${({ theme }) => theme.uploadButtonBackground || 'white'};
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) =>
      theme.uploadButtonHoverBackground || '#f3f4f6'};
  }
  input {
    display: none;
  }
`
// Função para obter o prefixo correto
export const getCategoryPrefix = (category: string): string => {
  const map: { [key: string]: string } = {
    ring: 'AN',
    wedding_ring: 'AL',
    meia_alianca: 'MA',
    pendant: 'PI',
    earring: 'BR',
    necklace: 'CO',
    bracelet: 'PU',
    brooch: 'BO',
    rivi: 'RI'
  }
  return map[category] || 'XX'
}

// Função para obter a próxima referência disponível no banco
export const getNextReference = async (
  category: string,
  supabaseClient: SupabaseClient
): Promise<string> => {
  const prefix = getCategoryPrefix(category)
  const { data, error } = await supabaseClient
    .from('jewelry')
    .select('reference_name')
    .ilike('reference_name', `%${prefix}`)
    .order('reference_name', { ascending: false })
    .limit(1)

  if (error) {
    console.error('Erro ao buscar referência:', error)
    return `001-${prefix}`
  }

  if (data.length === 0) {
    return `001-${prefix}`
  }

  const lastRef = data[0].reference_name
  const lastNumber = parseInt(lastRef.split('-')[0], 10)
  const nextNumber = (lastNumber + 1).toString().padStart(3, '0')

  return `${nextNumber}-${prefix}`
}
