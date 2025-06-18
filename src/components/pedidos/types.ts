export interface PedidoStone {
  onde: string;
  tipo: string;
  lapidacao: string;
  quantidade: number;
  largura: string;
  altura: string;
  comprimento: string;
  pts: string;
  quantidadeMaxima?: number;
  quantidadeMinima?: number;
  tipoQuantidade: 'exata' | 'maximo' | 'minimo' | 'livre';
}

export interface ReferenciaModelo {
  rota: string;
  cliente: string;
}

export interface Pedido {
  id: string;
  imagem?: string;
  nomeCliente: string;
  categoria: string;
  tamanho: string;
  descricao: string;
  aramado: boolean;
  galeria: boolean;
  paraRender: boolean;
  dataCreated: Date;
  dataPrevistaEntrega?: Date;
  stones: PedidoStone[];
  referenciaModelo: ReferenciaModelo;
  riscado: boolean;
  prioridade: number;
}