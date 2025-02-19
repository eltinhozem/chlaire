import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Info() {
  const location = useLocation()
  const navigate = useNavigate()
  const product = location.state?.product

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
    )
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
                const target = e.target as HTMLImageElement
                target.src = 'https://via.placeholder.com/300?text=Sem+Imagem'
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
                <span className="font-medium">Nome de Referência:</span>{' '}
                {product.reference_name}
              </p>
              <p>
                <span className="font-medium">Categoria:</span>{' '}
                {product.category}
              </p>
              {product.weight && (
                <p>
                  <span className="font-medium">Peso:</span> {product.weight}g
                </p>
              )}
              {product.finish && (
                <p>
                  <span className="font-medium">Acabamento:</span>{' '}
                  {product.finish}
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
                  {product.designer}
                </p>
              )}
              {product.target_audience && (
                <p>
                  <span className="font-medium">Público-Alvo:</span>{' '}
                  {product.target_audience}
                </p>
              )}
              {product.client_name && (
                <p>
                  <span className="font-medium">Nome do Cliente:</span>{' '}
                  {product.client_name}
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
                    <span className="font-medium">Tipo:</span>{' '}
                    {stone.stone_type}
                  </p>
                  <p>
                    <span className="font-medium">Lapidação:</span> {stone.cut}
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
          onClick={() => navigate('/register', { state: { product } })}
          className="px-4 py-2 bg-indigo-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-indigo-700"
        >
          Editar
        </button>
      </div>
    </div>
  )
}
