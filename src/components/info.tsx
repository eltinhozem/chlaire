import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translate } from './Styles'; // Importe a função de tradução
import { supabase } from '../lib/supabase'; // Importe o cliente do Supabase

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

  // Função para abrir o modal de exclusão
  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  // Função para fechar o modal de exclusão
  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setPassword('');
    setErrorMessage('');
  };

  // Função para confirmar a exclusão
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

  // Se o produto não for encontrado, exibe uma mensagem
  if (!product) {
    return (
      <div className="p-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-gray-700">Produto não encontrado.</p>
          <button
            onClick={() => navigate('/search')}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Voltar para busca
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-sm rounded-lg">
      {/* Cabeçalho */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Informações da Joia
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Imagem do Produto */}
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
            <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Sem imagem</span>
            </div>
          )}
        </div>

        {/* Informações Básicas */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Informações</h3>
            <div className="mt-2 space-y-2">
              <p>
                <span className="font-medium">Referência:</span>{' '}
                {product.reference_name}
              </p>
              <p>
                <span className="font-medium">Categoria:</span>{' '}
                {translate('category', product.category)}
              </p>
              {product.weight && (
                <p>
                  <span className="font-medium">Peso:</span> {product.weight}g
                </p>
              )}
              {product.finish && (
                <p>
                  <span className="font-medium">Acabamento:</span>{' '}
                  {translate('finish', product.finish)}
                </p>
              )}
              {product.size && (
                <p>
                  <span className="font-medium">Tamanho:</span> {product.size}
                </p>
              )}
              {product.designer && (
                <p>
                  <span className="font-medium">Designer:</span>{' '}
                  {translate('designer', product.designer)}
                </p>
              )}
              {product.target_audience && (
                <p>
                  <span className="font-medium">Público-Alvo:</span>{' '}
                  {translate('target_audience', product.target_audience)}
                </p>
              )}
              {product.client_name && (
                <p>
                  <span className="font-medium">Nome do Cliente:</span>{' '}
                  {product.client_name}
                </p>
              )}
              {product.date && (
                <p>
                  <span className="font-medium">Data:</span> {product.date}
                </p>
              )}
              {product.rota && (
                <p>
                  <span className="font-medium">Rota:</span> {product.rota}
                </p>
              )}
              {product.stl && (
                <p>
                  <span className="font-medium">STL:</span> {product.stl}
                </p>
              )}
              {product.version !== null && (
                <p>
                  <span className="font-medium">Versão:</span> {product.version}
                </p>
              )}
              {product.material && (
                <p>
                  <span className="font-medium">Material:</span> {product.material}
                </p>
              )}
              {product.descricao && (
                <p>
                  <span className="font-medium">Descrição:</span> {product.descricao}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pedras */}
      {product.stones && product.stones.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Pedras</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {product.stones.map((stone: any, index: number) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">
                  Pedra {index + 1}
                </h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Tipo:</span> {stone.stone_type}
                  </p>
                  <p>
                    <span className="font-medium">Lapidação:</span>{' '}
                    {translate('cut', stone.cut)}
                  </p>
                  <p>
                    <span className="font-medium">Quantidade:</span>{' '}
                    {stone.quantity}
                  </p>
                  {stone.quilates && (
                    <p>
                      <span className="font-medium">Quilates:</span>{' '}
                      {stone.quilates}
                    </p>
                  )}
                  {stone.pts && (
                    <p>
                      <span className="font-medium">PTS:</span> {stone.pts}
                    </p>
                  )}
                  {(stone.largura || stone.altura || stone.comprimento) && (
                    <p>
                      <span className="font-medium">Dimensões:</span>{' '}
                      {[ 
                        stone.largura && `L: ${stone.largura}mm`,
                        stone.altura && `A: ${stone.altura}mm`,
                        stone.comprimento && `C: ${stone.comprimento}mm`
                      ]
                        .filter(Boolean)
                        .join(' × ')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Observações */}
      {product.observations && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Observações
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">
            {product.observations}
          </p>
        </div>
      )}

      {/* Botões de Ação */}
      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => navigate('/search')}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Voltar
        </button>
        <button
          onClick={() =>
            navigate('/register', { state: { product, stones: product.stones } })
          }
          className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
        >
          Alterar
        </button>
        <button
          onClick={handleDeleteClick}
          className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
        >
          Excluir
        </button>
      </div>

      {/* Modal de Exclusão */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirmar Exclusão
            </h3>
            <p className="text-gray-700 mb-4">
              Digite a senha <strong>1020</strong> para confirmar a exclusão:
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Digite a senha"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
            <div className="mt-4 flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
