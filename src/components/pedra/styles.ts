import { useState, ChangeEvent } from 'react'

/** Objeto com classes de estilo para o componente */
export const classes = {
  container: 'bg-gray-50 p-4 rounded-md mb-4',
  header: 'flex justify-between items-center mb-4',
  headerTitle: 'text-sm font-medium text-gray-900',
  removeButton: 'text-red-600 hover:text-red-700',
  gridMain: 'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4',
  label: 'block text-sm font-medium text-gray-700',
  input:
    'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
  gridPTS: 'mt-4 grid grid-cols-1 gap-4 md:grid-cols-2',
  gridDimensions: 'mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3',
  halfWidth: 'w-1/2',
  saveButton:
    'inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500',
  summaryContainer: 'border p-4 rounded-md bg-white',
  summaryTitle: 'text-xl font-bold mb-2',
  summaryText: 'text-sm mb-1'
}

/** Interface para o hook com toda a lógica do componente Pedra */
export interface PedraLogic {
  tipo: string
  lapidacao: string
  quantidade: number
  quilates: string
  largura: string
  altura: string
  comprimento: string
  pts: string
  saved: boolean
  handleTipoChange: (e: ChangeEvent<HTMLSelectElement>) => void // Alterado para HTMLSelectElement
  handleLapidacaoChange: (e: ChangeEvent<HTMLSelectElement>) => void
  handleQuantidadeChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleQuilatesChange: (e: ChangeEvent<HTMLInputElement>) => void
  handlePtsChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleLarguraChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleComprimentoChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleAlturaChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSave: () => void
  dimensionsWithUnit: string
}

/**
 * Hook que encapsula toda a lógica e os _handlers_ do componente Pedra.
 * Aqui ficam os estados e as funções que manipulam os campos.
 */
export const usePedraLogic = (): PedraLogic => {
  // Estados para armazenar os valores dos campos
  const [tipo, setTipo] = useState('Diamante') // Valor inicial definido como "Diamante"
  const [lapidacao, setLapidacao] = useState('Redonda')
  const [quantidade, setQuantidade] = useState(1)
  const [quilates, setQuilates] = useState('')
  const [largura, setLargura] = useState('')
  const [altura, setAltura] = useState('')
  const [comprimento, setComprimento] = useState('')
  const [pts, setPts] = useState('')
  const [saved, setSaved] = useState(false)

  // Lista de tipos de pedra
  const tiposDePedra = [
    'Diamante',
    'Safira',
    'Rubi',
    'Esmeralda',
    'Topázio',
    'Ametista',
    'Turmalina',
    'Opala',
    'Pérola',
    'Granada',
    'Água-marinha',
    'Citrino',
    'Alexandrita',
    'Tanzanita',
    'Lápis-lazúli',
    'Quartzo Rosa',
    'Pedra da Lua',
    'Malaquita',
    'Ônix',
    'Coral',
    'Zircônia',
    'Zircão'
  ]

  // Função para formatar o valor de quilates com 2 casas decimais
  const formatQuilates = (value: string): string => {
    const number = parseFloat(value)
    if (isNaN(number)) return ''
    return number.toFixed(2)
  }

  // Handlers dos campos
  const handleTipoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setTipo(e.target.value)
  }

  const handleLapidacaoChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const novoValor = e.target.value
    setLapidacao(novoValor)
    // Se for "Redonda" ou "Quadrada", sincroniza os campos de Largura e Comprimento
    if (novoValor === 'Redonda' || novoValor === 'Quadrada') {
      if (largura) {
        setComprimento(largura)
      } else if (comprimento) {
        setLargura(comprimento)
      }
    }
  }

  const handleQuantidadeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newQuantidade = Number(e.target.value)
    setQuantidade(newQuantidade)

    // Recalcula o valor de quilates com a nova quantidade
    if (pts) {
      const quilatesValue = ((parseFloat(pts) / 100) * newQuantidade).toString()
      setQuilates(formatQuilates(quilatesValue))
    }
  }

  const handleQuilatesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuilates(formatQuilates(value))
  }

  const handlePtsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setPts(value)

    // Converte pontos para quilates (1 ct = 100 pts) e multiplica pela quantidade
    if (value) {
      const quilatesValue = ((parseFloat(value) / 100) * quantidade).toString()
      setQuilates(formatQuilates(quilatesValue))
    } else {
      setQuilates('') // Limpa o campo de quilates se pts estiver vazio
    }
  }

  const handleLarguraChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setLargura(value)
    if (lapidacao === 'Redonda' || lapidacao === 'Quadrada') {
      setComprimento(value)
    }
  }

  const handleComprimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setComprimento(value)
    if (lapidacao === 'Redonda' || lapidacao === 'Quadrada') {
      setLargura(value)
    }
  }

  const handleAlturaChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAltura(e.target.value)
  }

  // Handler para salvar os dados
  const handleSave = () => {
    setSaved(true)
  }

  // Concatena as dimensões (largura, comprimento e altura) e adiciona " mm" ao final,
  // caso haja pelo menos um valor preenchido.
  const dimensionsArray = [largura, comprimento, altura].filter(
    (val) => val.trim() !== ''
  )
  const dimensionsWithUnit =
    dimensionsArray.length > 0 ? dimensionsArray.join(' x ') + ' mm' : ''

  return {
    tipo,
    lapidacao,
    quantidade,
    quilates,
    largura,
    altura,
    comprimento,
    pts,
    saved,
    handleTipoChange,
    handleLapidacaoChange,
    handleQuantidadeChange,
    handleQuilatesChange,
    handlePtsChange,
    handleLarguraChange,
    handleComprimentoChange,
    handleAlturaChange,
    handleSave,
    dimensionsWithUnit
  }
}
