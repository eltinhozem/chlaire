import styled from 'styled-components';

// Container principal do formulário
export const FormContainer = styled.div`
  max-width: 56rem;
  margin: 0 auto;
  padding: 1rem;
  border-radius: 0.75rem;
  background: white
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

// Título do formulário
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
`;

// Grid do formulário
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.5rem;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

// Label dos campos
export const InputLabel = styled.label`

  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
`;

// Campo de entrada (input, select, textarea)
export const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  text-align: center;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: rgba(255, 255, 255, 0.5);
  transition: all 0.2s;
  &:focus {
    border-color: #ca9674;
    outline: none;
    box-shadow: 0 0 0 2px rgba(202, 150, 116, 0.5);
    background-color: white;
  }
`;

export const SelectField = styled.select`
  ${InputField}  

  resize: vertical;
  min-height: 2.5rem;
  width: 100%;
  border-radius: 0.5rem;
  border: 1px solid #d1d5db;
  text-align: center;
`;

export const TextAreaField = styled.textarea`
  ${InputField}

  resize: vertical;
  min-height: 6rem;
`;

// Seção de pedras
export const StoneHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 1.5rem;
`;

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
`;

export const StoneSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// Botão de adicionar pedra
export const AddStoneButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #8b4513;
  background: linear-gradient(to right, #fad2a4, #f6cda0, #ca9674);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(250, 210, 164, 0.5);
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
    box-shadow: 0 15px 40px rgba(250, 210, 164, 0.7);
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(202, 150, 116, 0.5);
  }
`;

// Botão de ação (Cancelar e Salvar)
export const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

export const SubmitButton = styled(ActionButton)`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  color: #8b4513;
  background: linear-gradient(to right, #fad2a4, #f6cda0, #ca9674);
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(250, 210, 164, 0.5);
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
    box-shadow: 0 15px 40px rgba(250, 210, 164, 0.7);
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(202, 150, 116, 0.5);
  }
`;

// Container de upload de imagem
export const ImageUploadContainer = styled.div`
  margin-bottom: 2rem;
`;

export const ImagePreview = styled.div`
  position: relative;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ImageUploadButton = styled.label`
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  background-color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }

  input {
    display: none;
  }
`;