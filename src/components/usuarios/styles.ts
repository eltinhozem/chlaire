import styled from 'styled-components'

export const Page = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
`

export const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 700;
  margin-bottom: 1.25rem;
  color: ${({ theme }) => theme.titleColor};
`

export const Card = styled.div`
  background: ${({ theme }) => theme.formBackground};
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 10px;
  padding: 1.25rem;
  margin-bottom: 1rem;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
`

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`

export const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 600;
  color: ${({ theme }) => theme.labelColor};
  margin-bottom: 0.35rem;
`

export const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid ${({ theme }) => theme.inputBorderColor};
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.inputBackground};
  color: ${({ theme }) => theme.inputText};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.inputFocusBorderColor};
    box-shadow: ${({ theme }) => theme.inputFocusShadow};
    background: ${({ theme }) => theme.inputFocusBackground};
  }
`

export const Row = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  align-items: center;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const Th = styled.th`
  text-align: left;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${({ theme }) => theme.labelColor};
  padding: 0.6rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.inputBorderColor};
`

export const Td = styled.td`
  padding: 0.65rem 0.5rem;
  border-bottom: 1px solid ${({ theme }) => theme.inputBorderColor};
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;
`

export const Muted = styled.p`
  margin-top: 0.75rem;
  color: ${({ theme }) => theme.labelColor};
  font-size: 0.9rem;
`

