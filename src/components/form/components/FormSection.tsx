
import React from 'react';
import { FormGrid } from '../styles';

interface FormSectionProps {
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ children }) => {
  return <FormGrid>{children}</FormGrid>;
};

export default FormSection;
