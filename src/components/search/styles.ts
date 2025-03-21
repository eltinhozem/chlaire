// styles.ts
import styled from 'styled-components'

/* Container principal de busca */
export const SearchContainer = styled.div`
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  padding: 1rem;
`

/* Cabeçalho da busca */
export const SearchHeader = styled.div`
  background-color: ${({ theme }) => theme.headerBackground || '#ffffff'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  padding: 0.75rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 640px) {
    padding: 1rem;
  }
`

/* Container para o input e botão de filtros */
export const SearchInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (min-width: 640px) {
    flex-direction: row;
  }
`

/* Wrapper para o input (posicionamento relativo para o ícone) */
export const SearchInputWrapper = styled.div`
  flex: 1;
  position: relative;
`

/* Ícone de busca posicionado à esquerda */
export const SearchIconWrapper = styled.div`
  position: absolute;
  inset-y: 0;
  left: 0;
  padding-left: 0.50rem;
  display: flex;
  align-items: center;
  pointer-events: none;
`

/* Campo de entrada da busca */
export const SearchInput = styled.input`
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: ${({ theme }) => theme.inputBackground || '#ffffff'};
  color: ${({ theme }) => theme.inputText || '#000000'};

  &::placeholder {
    color: #a1a1aa;
  }

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 1px #6366f1;
  }
`

/* Grid de resultados */
export const ResultsGrid = styled.div`
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 1280px) {
    grid-template-columns: repeat(6, 1fr);
  }
`

/* Cartão de resultado */
export const ResultCard = styled.div`
  background-color: ${({ theme }) => theme.cardBackground || '#ffffff'};
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
  transition: box-shadow 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: row;

  @media (min-width: 640px) {
    flex-direction: column;
  }

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`

/* Container para a imagem do resultado */
export const ResultImageContainer = styled.div`
  width: 2rem;
  position: relative;

  @media (min-width: 640px) {
    width: 100%;
  }

  aspect-ratio: 1;
`

/* Imagem do resultado */
export const ResultImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  max-width: 80%; // Reduz o tamanho da imagem para 80% do contêiner
  max-height: 80%; // Reduz o tamanho da imagem para 80% do contêiner
  margin: auto; // Centraliza a imagem no contêiner
`

/* Conteúdo do cartão de resultado */
export const ResultCardContent = styled.div`
  flex: 1;
  padding: 0.5rem;
  min-width: 0;
`

/* Título do resultado */
export const ResultTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.titleColor || '#111827'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

/* Descrição do resultado */
export const ResultDescription = styled.div`
  font-size: 0.75rem;
  color: #6b7280;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

/* Botão de filtro */
export const FilterButton = styled.button`
  width: 100%;

  @media (min-width: 640px) {
    width: auto;
  }

  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.buttonText || '#374151'};
  background-color: ${({ theme }) => theme.buttonBackground || '#ffffff'};

  &:hover {
    background-color: #f3f4f6;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #6366f1;
  }
`

/* Painel de filtros */
export const FilterPanel = styled.div`

  background: ${({ theme }) => theme.formBackground};
  color: ${({ theme }) => theme.text};  
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(1, 1fr);

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }

  margin-top: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.375rem;
  
`

/* Seção de cada filtro */
export const FilterSection = styled.div` 

  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

/* Rótulo do filtro */
export const FilterLabel = styled.label`

  font-size: 0.875rem;
  font-weight: 500;
  
`

/* Select do filtro */
export const FilterSelect = styled.select`
 background: ${({ theme }) => theme.formBackground};
  color: ${({ theme }) => theme.text};
  margin-top: 0.25rem;
  width: 100%;
  padding: 0.5rem;
  font-size: 0.875rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 1px #6366f1;
  }
`

/* Container para filtros ativos */
export const ActiveFilters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
`

/* Etiqueta de filtro ativo */
export const FilterTag = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  background-color: #e0e7ff;
  color: #4338ca;
`
