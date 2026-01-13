import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { translate } from '../Styles';
import { supabase } from '../../lib/supabase';
import type { Stone } from '../pedra/types';
import { Edit, Trash2, ArrowLeft, Calendar, User, Gem, Palette, Ruler, Package, Calculator } from 'lucide-react';
import {
  ActionButton,
  CustomButton,
  InfoContainer,
  ModalContent,
  ModalInput,
  ModalOverlay,
  RedButton,
  formatarData
} from './styles';

export default function Info() {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product;
  const normalizeStones = (value: unknown): Stone[] => {
    if (!value) return [];
    if (typeof value === 'string') {
      try {
        return normalizeStones(JSON.parse(value));
      } catch {
        return [];
      }
    }
    if (Array.isArray(value)) {
      return value
        .map((item) => item as Stone)
        .filter((item) => item && typeof item === 'object');
    }
    if (typeof value === 'object') {
      return [value as Stone];
    }
    return [];
  };
  const stones = normalizeStones(product?.stones);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState('');
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
      } catch (err) {
        console.error('Erro ao excluir a joia:', err);
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
      {/* Header */}
      <div className="mb-8">
        <button 
          onClick={() => navigate('/search')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          Voltar
        </button>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
          {product.reference_name}
        </h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Image Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.reference_name}
                className="w-full h-80 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x400?text=Sem+Imagem';
                }}
              />
            ) : (
              <div className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <Package size={48} className="mx-auto text-gray-400 mb-2" />
                  <span className="text-gray-500">Sem imagem</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Gem className="text-amber-600" size={20} />
              Informações Básicas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">Categoria</span>
                  <p className="text-gray-800">{translate('category', product.category)}</p>
                </div>
                {product.weight && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Peso</span>
                    <p className="text-gray-800">{product.weight}g</p>
                  </div>
                )}
                {product.size && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Tamanho</span>
                    <p className="text-gray-800">{product.size}</p>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {product.material && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Material</span>
                    <p className="text-gray-800">{product.material}</p>
                  </div>
                )}
                {product.finish && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Acabamento</span>
                    <p className="text-gray-800">{translate('finish', product.finish)}</p>
                  </div>
                )}
                {product.target_audience && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Público-Alvo</span>
                    <p className="text-gray-800">{translate('target_audience', product.target_audience)}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Design Info Card */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <Palette className="text-amber-600" size={20} />
              Design & Produção
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                {product.designer && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Designer</span>
                    <p className="text-gray-800">{translate('designer', product.designer)}</p>
                  </div>
                )}
                {product.rota && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Rota</span>
                    <p className="text-gray-800">{product.rota}</p>
                  </div>
                )}
              </div>
              <div className="space-y-3">
                {product.stl && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">STL</span>
                    <p className="text-gray-800">{product.stl}</p>
                  </div>
                )}
                {product.version !== null && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Versão</span>
                    <p className="text-gray-800">{product.version}</p>
                  </div>
                )}
              </div>
            </div>
            {product.observations && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-500">Descrição</span>
                <p className="text-gray-800 mt-1">{product.observations}</p>
              </div>
            )}
          </div>

          {/* Client & Date Info Card */}
          {(product.client_name || product.date) && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="text-amber-600" size={20} />
                Cliente & Data
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.client_name && (
                  <div>
                    <span className="text-sm font-medium text-gray-500">Nome do Cliente</span>
                    <p className="text-gray-800">{product.client_name}</p>
                  </div>
                )}
                {product.date && (
                  <div>
                    <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                      <Calendar size={16} />
                      Data
                    </span>
                    <p className="text-gray-800">{formatarData(product.date)}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Stones Section */}
      {stones.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Ruler className="text-amber-600" size={24} />
            Pedras
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stones.map((stone: Stone, index: number) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-amber-500"
              >
                <h3 className="font-semibold text-gray-800 mb-4">{stone.stone_type}</h3>
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-500">Lapidação</span>
                    <p className="text-gray-800">{stone.cut}</p>
                  </div>
                  {stone.quantity && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Quantidade</span>
                      <p className="text-gray-800">{stone.quantity}</p>
                    </div>
                  )}
                  {stone.quilates && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Quilates</span>
                      <p className="text-gray-800">{stone.quilates}</p>
                    </div>
                  )}
                  {stone.pts && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">PTS</span>
                      <p className="text-gray-800">{stone.pts}</p>
                    </div>
                  )}
                  {(stone.largura || stone.comprimento || stone.altura) && (
                    <div>
                      <span className="text-sm font-medium text-gray-500">Dimensões</span>
                      <p className="text-gray-800">
                        {[
                          stone.largura && `${stone.largura}`,
                          stone.comprimento && `${stone.comprimento}`,
                          stone.altura && `${stone.altura}`,
                        ]
                          .filter(Boolean)
                          .join(' × ')}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-end">
        <CustomButton
          onClick={() =>
            navigate('/calcular-joia', {
              state: { product: { ...product, stones } }
            })
          }
          className="inline-flex items-center gap-2"
        >
          <Calculator size={16} />
          Calcular valor dessa joia
        </CustomButton>
        <CustomButton
          onClick={() =>
            navigate('/register', {
              state: { product: { ...product, stones }, stones }
            })
          }
          className="inline-flex items-center gap-2"
        >
          <Edit size={16} />
          Alterar
        </CustomButton>
        <RedButton 
          onClick={handleDeleteClick}
          className="inline-flex items-center gap-2"
        >
          <Trash2 size={16} />
          Excluir
        </RedButton>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <ModalOverlay>
          <ModalContent>
            <h3 className="text-lg font-semibold mb-2">Confirmar Exclusão</h3>
            <p className="mb-4 text-gray-600">Digite a senha para confirmar a exclusão:</p>
            <ModalInput
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
            )}
            <div className="mt-6 flex justify-end space-x-4">
              <ActionButton onClick={handleCloseModal}>Cancelar</ActionButton>
              <RedButton onClick={handleConfirmDelete}>Confirmar</RedButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </InfoContainer>
  );
}
