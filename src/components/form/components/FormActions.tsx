
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

// Botão de cancelar (cinza)
const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid ${({ theme }) => theme.actionButtonBorder};
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.actionButtonText};
  background-color: ${({ theme }) => theme.actionButtonBackground};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.actionButtonHoverBackground};
  }
`;

// Botão de submit (azul)
const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.buttonText};
  background: ${({ theme }) => theme.buttonBackground};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.buttonHoverBackground};
  }

  &:focus {
    outline: none;
    box-shadow: ${({ theme }) => theme.buttonFocusShadow};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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
