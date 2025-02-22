import { useState, ChangeEvent } from 'react'
import styled from 'styled-components'

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
}
  
  export const SaveButton = styled.button
    `
/* Define a posição relativa do botão, permitindo que elementos internos (como ::before) sejam posicionados em relação a ele */
position: relative;

/* Centraliza os itens horizontalmente e verticalmente dentro do botão */
display: inline-flex;
align-items: center;
justify-content: center;

/* Padding interno: controla o espaço entre o conteúdo (texto/ícone) e as bordas do botão */
padding: 7px 15px; // Altere aqui para diminuir/aumentar o tamanho do botão

/* Tamanho da fonte do texto dentro do botão */
font-size: 14px; // Altere aqui para mudar o tamanho do texto

/* Cor do texto */
color: brown;

/* Gradiente de fundo do botão */
background: linear-gradient(to right, #fad2a4, #f6cda0, #ca9674);

/* Remove a borda padrão do botão */
border: none;

/* Define o raio das bordas (quanto maior, mais arredondado será o botão) */
border-radius: 30px; // Altere aqui para ajustar o quão arredondado é o botão

/* Define o cursor como "pointer" quando o usuário passa o mouse sobre o botão */
cursor: pointer;

/* Garante que o pseudo-elemento ::before não "vaze" para fora do botão */
overflow: hidden;

/* Adiciona transições suaves para transformações (ex.: escala) e sombra */
transition: transform 0.3s ease, box-shadow 0.3s ease;

/* Sombra inicial do botão */
box-shadow: 0 10px 30px rgba(250, 210, 164, 0.5); // Altere aqui para ajustar a intensidade da sombra

/* Z-index garante que o botão fique acima de outros elementos */
z-index: 1;

/* Efeito de luz em movimento */
&::before {
  content: ''; // Cria um pseudo-elemento vazio
  position: absolute; // Posiciona o pseudo-elemento em relação ao botão
  top: 0; // Alinha o topo do pseudo-elemento com o topo do botão
  left: -100%; // Inicia o pseudo-elemento fora da área visível do botão
  width: 100%; // Largura igual à do botão
  height: 100%; // Altura igual à do botão
  background: rgba(255, 255, 255, 0.3); // Cor do efeito de luz (brilho)
  transform: skewX(-45deg); // Distorce o brilho para criar um efeito dinâmico
  transition: left 0.5s ease; // Animação suave do movimento do brilho
  z-index: -1; // Coloca o brilho atrás do conteúdo do botão
}

/* Efeito ao passar o mouse sobre o botão */
&:hover {
  transform: scale(1.05); // Aumenta ligeiramente o tamanho do botão
  box-shadow: 0 15px 40px rgba(250, 210, 164, 0.7); // Intensifica a sombra
}

/* Movimento do efeito de luz ao passar o mouse */
&:hover::before {
  left: 100%; // Move o brilho para fora da área visível do botão
}

/* Estilo para quando o botão está em foco (ex.: navegando com o teclado) */
&:focus {
  outline: none; // Remove o contorno padrão do foco
  box-shadow: 0 0 0 3px rgba(202, 150, 116, 0.5); // Adiciona uma borda destacada para acessibilidade
}
`
 

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
