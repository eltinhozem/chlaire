
import React from 'react';
import { PedidoStone } from '../types';
import { lightTheme } from '../../Styles';
import {
  StonePreviewContainer,
  StonePreviewGrid,
  StonePreviewItem,
  StonePreviewHint
} from '../styles/StoneStyles';

interface StonePreviewProps {
  savedStone: PedidoStone;
  onEdit: () => void;
}

const StonePreview: React.FC<StonePreviewProps> = ({ savedStone, onEdit }) => {
  const currentTheme = lightTheme; // This could be dynamic based on your theme context

  const getQuantidadeDisplay = () => {
    if (savedStone.tipoQuantidade === 'livre') {
      return 'Livre';
    } else if (savedStone.tipoQuantidade === 'maximo') {
      return `No máximo ${savedStone.quantidade}`;
    } else if (savedStone.tipoQuantidade === 'minimo') {
      return `No mínimo ${savedStone.quantidade}`;
    } else {
      return savedStone.quantidade === 0 ? 'Livre' : savedStone.quantidade;
    }
  };

  return (
    <StonePreviewContainer theme={currentTheme} onClick={onEdit}>
      <StonePreviewGrid>
        <StonePreviewItem theme={currentTheme}><strong>Onde:</strong> {savedStone.onde}</StonePreviewItem>
        <StonePreviewItem theme={currentTheme}><strong>Tipo:</strong> {savedStone.tipo}</StonePreviewItem>
        <StonePreviewItem theme={currentTheme}><strong>Lapidação:</strong> {savedStone.lapidacao}</StonePreviewItem>
        <StonePreviewItem theme={currentTheme}><strong>Quantidade:</strong> {getQuantidadeDisplay()}</StonePreviewItem>
        <StonePreviewItem theme={currentTheme}><strong>Largura:</strong> {savedStone.largura}mm</StonePreviewItem>
        <StonePreviewItem theme={currentTheme}><strong>Altura:</strong> {savedStone.altura || 'N/A'}</StonePreviewItem>
        <StonePreviewItem theme={currentTheme}><strong>Comprimento:</strong> {savedStone.comprimento}mm</StonePreviewItem>
        <StonePreviewItem theme={currentTheme}><strong>PTS:</strong> {savedStone.pts || 'N/A'}</StonePreviewItem>
      </StonePreviewGrid>
      <StonePreviewHint theme={currentTheme}>- Clique para editar</StonePreviewHint>
    </StonePreviewContainer>
  );
};

export default StonePreview;
