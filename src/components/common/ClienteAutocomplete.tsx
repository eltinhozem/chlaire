import React, { useState, useEffect, useRef, useCallback } from 'react';
import styled, { useTheme } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useClientes } from '../clientes/hooks/useClientes';
import { Cliente } from '../clientes/types';

interface ThemeProps {
  theme: {
    inputBackground: string;
    inputText: string;
    inputBorderColor: string;
    inputFocusBorderColor: string;
    inputFocusShadow: string;
    inputFocusBackground: string;
    placeholderColor: string;
    cardBackground: string;
    titleColor: string;
  };
}

const AutocompleteContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input<ThemeProps>`
  width: 100%;
  padding: 0.75rem;
  background-color: ${props => props.theme.inputBackground};
  color: ${props => props.theme.inputText};
  border: 1px solid ${props => props.theme.inputBorderColor};
  border-radius: 0.375rem;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.inputFocusBorderColor};
    box-shadow: ${props => props.theme.inputFocusShadow};
    background-color: ${props => props.theme.inputFocusBackground};
  }
  
  &::placeholder {
    color: ${props => props.theme.placeholderColor};
  }
`;

const SuggestionsList = styled.ul<ThemeProps>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 50;
  max-height: 200px;
  overflow-y: auto;
  background-color: ${props => props.theme.cardBackground};
  border: 1px solid ${props => props.theme.inputBorderColor};
  border-top: none;
  border-radius: 0 0 0.375rem 0.375rem;
  margin: 0;
  padding: 0;
  list-style: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
`;

const SuggestionItem = styled.li<ThemeProps & { isHighlighted?: boolean }>`
  padding: 0.75rem;
  cursor: pointer;
  color: ${props => props.theme.inputText};
  background-color: ${props => props.isHighlighted ? props.theme.inputFocusBackground : 'transparent'};
  
  &:hover {
    background-color: ${props => props.theme.inputFocusBackground};
  }
`;

const NotFoundMessage = styled.div<ThemeProps>`
  padding: 0.75rem;
  color: ${props => props.theme.titleColor};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const NotFoundText = styled.span`
  font-size: 0.875rem;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button<{ variant: 'primary' | 'secondary' }>`
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  cursor: pointer;
  border: none;
  
  ${props => props.variant === 'primary' ? `
    background-color: #3b82f6;
    color: white;
    &:hover {
      background-color: #2563eb;
    }
  ` : `
    background-color: #6b7280;
    color: white;
    &:hover {
      background-color: #4b5563;
    }
  `}
`;

interface ClienteAutocompleteProps {
  value: string;
  onChange: (value: string) => void;
  theme?: ThemeProps['theme'];
  required?: boolean;
  placeholder?: string;
}

const ClienteAutocomplete: React.FC<ClienteAutocompleteProps> = ({
  value,
  onChange,
  theme,
  required = false,
  placeholder = "Digite o nome do cliente"
}) => {
  const themeFromContext = useTheme() as ThemeProps['theme'];
  const appliedTheme = theme ?? themeFromContext;
  const navigate = useNavigate();
  const { clientes } = useClientes();
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showNotFound, setShowNotFound] = useState(false);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filterClientes = useCallback((searchValue: string) => {
    if (!searchValue.trim()) {
      setFilteredClientes([]);
      setShowSuggestions(false);
      setShowNotFound(false);
      return;
    }

    const filtered = clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(searchValue.toLowerCase())
    );

    setFilteredClientes(filtered);
    setShowSuggestions(filtered.length > 0);
    setShowNotFound(filtered.length === 0 && searchValue.trim().length > 0);
  }, [clientes]);

  useEffect(() => {
    filterClientes(value);
  }, [value, filterClientes]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setShowNotFound(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setHighlightedIndex(-1);
  };

  const handleSelectCliente = (cliente: Cliente) => {
    onChange(cliente.nome);
    setShowSuggestions(false);
    setShowNotFound(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || filteredClientes.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredClientes.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelectCliente(filteredClientes[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setShowNotFound(false);
        break;
    }
  };

  const handleCadastrar = () => {
    navigate('/cadastro-clientes');
  };

  const handleContinuar = () => {
    setShowNotFound(false);
  };

  return (
    <AutocompleteContainer ref={containerRef}>
      <Input
        ref={inputRef}
        theme={appliedTheme}
        type="text"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (value.trim()) {
            filterClientes(value);
          }
        }}
        required={required}
        placeholder={placeholder}
        autoComplete="off"
      />
      
      {showSuggestions && filteredClientes.length > 0 && (
        <SuggestionsList theme={appliedTheme}>
          {filteredClientes.map((cliente, index) => (
            <SuggestionItem
              key={cliente.id}
              theme={appliedTheme}
              isHighlighted={index === highlightedIndex}
              onClick={() => handleSelectCliente(cliente)}
            >
              {cliente.nome}
            </SuggestionItem>
          ))}
        </SuggestionsList>
      )}

      {showNotFound && (
        <SuggestionsList theme={appliedTheme}>
          <NotFoundMessage theme={appliedTheme}>
            <NotFoundText>
              Cliente não cadastrado. Deseja cadastrar?
            </NotFoundText>
            <ButtonsContainer>
              <ActionButton variant="primary" onClick={handleCadastrar}>
                Sim
              </ActionButton>
              <ActionButton variant="secondary" onClick={handleContinuar}>
                Não
              </ActionButton>
            </ButtonsContainer>
          </NotFoundMessage>
        </SuggestionsList>
      )}
    </AutocompleteContainer>
  );
};

export default ClienteAutocomplete;
