import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translate } from '../Styles'; // Função de tradução
import { supabase } from '../../lib/supabase'; // Cliente do Supabase
import {
  ActionButton,
  CustomButton,
  InfoContainer,
  InfoLabel,
  InfoSection,
  InfoText,
  ModalContent,
  ModalInput,
  ModalOverlay,
  RedButton,
} from './styles';
import { FormTitle } from '../form/styles';

export default function Info() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;

  // Estado para controlar a visibilidade do modal de exclusão
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Estado para armazenar a senha digitada pelo usuário
  const [password, setPassword] = useState('');
  // Estado para exibir mensagens de erro
  const [errorMessage, setErrorMessage] = useState('');

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setPassword('');
    setErrorMessage('');
  };

  const handleConfirmDelete = async () => {
    if (password === '1020') {
      try {
        const { error } = await supabase
          .from('jewelry')
          .delete()
          .eq('id', product.id);
        if (error) throw error;
        alert('Joia excluída com sucesso!');
        navigate('/search');
      } catch (error) {
        alert('Erro ao excluir a joia.');
      }
    } else {
      setErrorMessage('Senha incorreta. Tente novamente.');
    }
  };

  if (!product) {
    return (
      <InfoContainer>
        <div className="text-center">
          <p className="text-lg">Produto não encontrado.</p>
          <ActionButton onClick={() => navigate('/search')}>
            Voltar para busca
          </ActionButton>
        </div>
      </InfoContainer>
    );
  }

  return (
    <InfoContainer>
      <FormTitle>Informações da Joia</FormTitle>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Imagem */}
        <div>
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.reference_name}
              className="w-full h-auto object-cover rounded-lg shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/300?text=Sem+Imagem';
              }}
            />
          ) : (
            <div
              className="w-full h-64 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            >
              <span className="text-gray-500">Sem imagem</span>
            </div>
          )}
        </div>
        {/* Informações Gerais */}
        <div className="space-y-4">
          <InfoSection>
            <h3 className="text-lg font-semibold">Informações</h3>
            <div className="mt-2 space-y-2">
              <InfoText>
                <InfoLabel>Referência:</InfoLabel> {product.reference_name}
              </InfoText>
              <InfoText>
                <InfoLabel>Categoria:</InfoLabel>{' '}
                {translate('category', product.category)}
              </InfoText>
              {product.date && (
                <InfoText>
                  <InfoLabel>Data:</InfoLabel> {product.date}
                </InfoText>
              )}
              {product.target_audience && (
                <InfoText>
                  <InfoLabel>Público-Alvo:</InfoLabel> {product.target_audience}
                </InfoText>
              )}
              {product.client_name && (
                <InfoText>
                  <InfoLabel>Nome do Cliente:</InfoLabel> {product.client_name}
                </InfoText>
              )}
              {product.weight && (
                <InfoText>
                  <InfoLabel>Peso:</InfoLabel> {product.weight}g
                </InfoText>
              )}
              {product.finish && (
                <InfoText>
                  <InfoLabel>Acabamento:</InfoLabel>{' '}
                  {translate('finish', product.finish)}
                </InfoText>
              )}
              {product.designer && (
                <InfoText>
                  <InfoLabel>Designer:</InfoLabel>{' '}
                  {translate('designer', product.designer)}
                </InfoText>
              )}
              {product.material && (
                <InfoText>
                  <InfoLabel>Material:</InfoLabel> {product.material}
                </InfoText>
              )}
              {product.size && (
                <InfoText>
                  <InfoLabel>Tamanho:</InfoLabel> {product.size}
                </InfoText>
              )}
              {product.rota && (
                <InfoText>
                  <InfoLabel>Rota:</InfoLabel> {product.rota}
                </InfoText>
              )}
              {product.stl && (
                <InfoText>
                  <InfoLabel>STL:</InfoLabel> {product.stl}
                </InfoText>
              )}
              {product.version !== null && (
                <InfoText>
                  <InfoLabel>Versão:</InfoLabel> {product.version}
                </InfoText>
              )}
              {product.descricao && (
                <InfoText>
                  <InfoLabel>Descrição:</InfoLabel> {product.descricao}
                </InfoText>
              )}
            </div>
          </InfoSection>
        </div>
      </div>

      {product.stones && product.stones.length > 0 && (
  <InfoSection>
    <h3 className="text-lg font-semibold">Pedras</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {product.stones.map((stone: any, index: number) => (
        <div
          key={index}
          className="p-4 rounded-lg"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          <h4 className="font-medium">Pedra {index + 1}</h4>
          <div className="space-y-1 text-sm">
            <InfoText>
              <InfoLabel>Tipo:</InfoLabel> {stone.stone_type}
            </InfoText>
            <InfoText>
              <InfoLabel>Lapidação:</InfoLabel> {stone.cut}
            </InfoText>
            {stone.quantity && (
              <InfoText>
                <InfoLabel>Quantidade:</InfoLabel> {stone.quantity}
              </InfoText>
            )}
            {stone.quilates && (
              <InfoText>
                <InfoLabel>Quilates:</InfoLabel> {stone.quilates}
              </InfoText>
            )}
            {stone.pts && (
              <InfoText>
                <InfoLabel>PTS:</InfoLabel> {stone.pts}
              </InfoText>
            )}
            {(stone.largura || stone.comprimento ||stone.altura ) && (
              <InfoText>
                <InfoLabel>Dimensões:</InfoLabel>{' '}
                {[
                  stone.largura && `L: ${stone.largura}`,                  
                  stone.comprimento && `C: ${stone.comprimento}`,
                  stone.altura && `A: ${stone.altura}     mm`,
                ]
                  .filter(Boolean)
                  .join(' × ')}
              </InfoText>
            )}
          </div>
        </div>
      ))}
    </div>
  </InfoSection>
)}
      

      {product.observations && (
        <InfoSection>
          <h3 className="text-lg font-semibold">Observações</h3>
          <InfoText>{product.observations}</InfoText>
        </InfoSection>
      )}

      <div className="mt-8 flex justify-end space-x-4">
        <ActionButton onClick={() => navigate('/search')}>Voltar</ActionButton>
        <CustomButton
          onClick={() =>
            navigate('/register', {
              state: { product, stones: product.stones }
            })
          }
        >
          Alterar
        </CustomButton>
        <RedButton onClick={handleDeleteClick}>Excluir</RedButton>
      </div>

      {showDeleteModal && (
        <ModalOverlay>
          <ModalContent>
            <h3 className="text-lg font-semibold">Confirmar Exclusão</h3>
            <p className="mb-4">Digite a senha para confirmar a exclusão:</p>
            <ModalInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
            <div className="mt-4 flex justify-end space-x-4">
              <ActionButton onClick={handleCloseModal}>Cancelar</ActionButton>
              <RedButton onClick={handleConfirmDelete}>Confirmar</RedButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </InfoContainer>
  );
}
