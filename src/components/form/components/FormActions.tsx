
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionButton, SubmitButton } from '../styles';

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
