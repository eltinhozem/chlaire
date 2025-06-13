
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SecondaryButton, PrimaryButton } from '../../buttons';

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
      <SecondaryButton type="button" onClick={() => navigate('/search')}>
        Cancelar
      </SecondaryButton>
      <PrimaryButton type="submit" disabled={loading}>
        {isEditing ? 'Atualizar Joia' : 'Salvar Joia'}
      </PrimaryButton>
    </div>
  );
};

export default FormActions;
