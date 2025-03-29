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
  formatarData
} from './styles';
import { FormTitle, PedraTitle } from '../form/styles';

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
        <table>
  <tbody>
    <tr>
      <td><strong>Referência:</strong></td>
      <td>{product.reference_name}</td>
    </tr>
    <tr>
      <td><strong>Categoria:</strong></td>
      <td>{translate('category', product.category)}</td>
    </tr>
    {product.date && (
      <tr>
        <td><strong>Data:</strong></td>
        <td>{formatarData(product.date)}</td>
      </tr>
    )}
    {product.target_audience && (
      <tr>
        <td><strong>Público-Alvo:</strong></td>
        <td>{translate('target_audience', product.target_audience)}</td>
      </tr>
    )}
    {product.client_name && (
      <tr>
        <td><strong>Nome do Cliente:</strong></td>
        <td>{product.client_name}</td>
      </tr>
    )}
    {product.weight && (
      <tr>
        <td><strong>Peso:</strong></td>
        <td>{product.weight}g</td>
      </tr>
    )}
    {product.finish && (
      <tr>
        <td><strong>Acabamento:</strong></td>
        <td>{translate('finish', product.finish)}</td>
      </tr>
    )}
    {product.designer && (
      <tr>
        <td><strong>Designer:</strong></td>
        <td>{translate('designer', product.designer)}</td>
      </tr>
    )}
    {product.material && (
      <tr>
        <td><strong>Material:</strong></td>
        <td>{product.material}</td>
      </tr>
    )}
    {product.size && (
      <tr>
        <td><strong>Tamanho:</strong></td>
        <td>{product.size}</td>
      </tr>
    )}
    {product.rota && (
      <tr>
        <td><strong>Rota:</strong></td>
        <td>{product.rota}</td>
      </tr>
    )}
    {product.stl && (
      <tr>
        <td><strong>STL:</strong></td>
        <td>{product.stl}</td>
      </tr>
    )}
    {product.version !== null && (
      <tr>
        <td><strong>Versão:</strong></td>
        <td>{product.version}</td>
      </tr>
    )}
    {product.descricao && (
      <tr>
        <td><strong>Descrição:</strong></td>
        <td>{product.descricao}</td>
      </tr>
    )}
  </tbody>
</table>
      </div>

      {product.stones && product.stones.length > 0 && (
  <InfoSection>
    <PedraTitle>Pedras</PedraTitle>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {product.stones.map((stone: any, index: number) => (
        <table
          key={index}
          className="w-full p-4 rounded-lg"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          <tbody>
            <tr>
              <td className="font-medium"><InfoLabel>Tipo de Pedra:</InfoLabel></td>
              <td>{stone.stone_type}</td>
            </tr>
            <tr>
              <td><InfoLabel>Lapidação:</InfoLabel></td>
              <td>{stone.cut}</td>
            </tr>
            {stone.quantity && (
              <tr>
                <td><InfoLabel>Quantidade:</InfoLabel></td>
                <td>{stone.quantity}</td>
              </tr>
            )}
            {stone.quilates && (
              <tr>
                <td><InfoLabel>Quilates:</InfoLabel></td>
                <td>{stone.quilates}</td>
              </tr>
            )}
            {stone.pts && (
              <tr>
                <td><InfoLabel>PTS:</InfoLabel></td>
                <td>{stone.pts}</td>
              </tr>
            )}
            {(stone.largura || stone.comprimento || stone.altura) && (
              <tr>
                <td><InfoLabel>Dimensões:</InfoLabel></td>
                <td>
                  {[
                    stone.largura && `${stone.largura}`,
                    stone.comprimento && `${stone.comprimento}`,
                    stone.altura && `${stone.altura}`,
                  ]
                    .filter(Boolean)
                    .join(' × ')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
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
