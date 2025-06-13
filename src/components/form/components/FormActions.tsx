
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Estilo base para todos os botões
const BaseButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
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
  }

  &:hover::before {
    left: 100%;
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

// Botão de cancelar (cinza)
const ActionButton = styled(BaseButton)`
  color: ${({ theme }) => theme.actionButtonText};
  background: ${({ theme }) => theme.actionButtonBackground};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.actionButtonHoverBackground};
  }

  &:focus {
    box-shadow: 0 0 0 3px rgba(156, 163, 175, 0.3);
  }
`;

// Botão de submit (azul)
const SubmitButton = styled(BaseButton)`
  color: ${({ theme }) => theme.buttonText};
  background: ${({ theme }) => theme.buttonBackground};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.buttonHoverBackground};
  }

  &:focus {
    box-shadow: ${({ theme }) => theme.buttonFocusShadow};
  }
`;

interface FormActionsProps {
  loading: boolean;
  isEditing: boolean;
}

const FormActions: React.FC<FormActionsProps> = ({ loading, isEditing }) => {
  const navigate = useNavigate();
  
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        gap: '1rem',
        marginTop: '2rem'
      }}
    >
      <ActionButton type="button" onClick={() => navigate('/search')}>
        Cancelar
      </ActionButton>
      <SubmitButton type="submit" disabled={loading}>
        {isEditing ? 'Atualizar Joia' : 'Salvar Joia'}
      </SubmitButton>
    </div>
  );
};

export default FormActions;
