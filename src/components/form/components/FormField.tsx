import React from 'react';
import { InputLabel, InputField, SelectField, TextAreaField } from '../styles';

interface FormFieldProps {
  label: string;
  id: string;
  name: string;
  value: string | number | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  step?: string;
  rows?: number;
  isTextArea?: boolean;
  readOnly?: boolean;
  pattern?: string;
  title?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>['inputMode'];
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  name,
  value,
  onChange,
  type = 'text',
  required = false,
  options,
  placeholder,
  step,
  rows = 4,
  isTextArea = false,
  readOnly = false,
  pattern,
  title,
  maxLength,
  inputMode
}) => {
  return (
    <div>
      <InputLabel htmlFor={id}>{label}{required && ' *'}</InputLabel>
      {options ? (
        <SelectField
          id={id}
          name={name}
          value={value || ''}
          onChange={onChange}
          required={required}
        >
          <option value="">Selecione</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      ) : isTextArea ? (
        <TextAreaField
          id={id}
          name={name}
          value={value || ''}
          onChange={onChange}
          rows={rows}
          placeholder={placeholder}
          style={{ width: '100%' }}
          required={required}
        />
      ) : (
        <InputField
          type={type}
          id={id}
          name={name}
          value={value === null ? '' : value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          step={step}
          readOnly={readOnly}
          pattern={pattern}
          title={title}
          maxLength={maxLength}
          inputMode={inputMode}
        />
      )}
    </div>
  );
};

export default FormField;
