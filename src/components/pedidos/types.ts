export interface PedidoStone {
  onde: string;
  tipo: string;
  lapidacao: string;
  quantidade: number;
  largura: string;
  altura: string;
  comprimento: string;
  pts: string;
  quilates?: string;
  quantidadeMaxima?: number;
  quantidadeMinima?: number;
  tipoQuantidade: 'exata' | 'maximo' | 'minimo' | 'livre';
  tipoCravacao?: string;
}

export interface ReferenciaModelo {
  rota: string;
  cliente: string;
}

export interface AroConfig {
  tipoAro: string;
  alturaAro: string;
  comprimentoAro: string;
  proporcional: boolean;
  estrutura: 'ocado' | 'macico';
  comPedra: boolean;
  tipoCravacao: string;
  quantidadeFileiras: number;
}

export interface Pedido {
  id: string;
  codigo?: string;
  imagem?: string;
  nomeCliente: string;
  categoria: string;
  tamanho: string;
  descricao: string;
  aramado: boolean;
  galeria: boolean;
  paraRender: boolean;
  tipoOuroRender?: 'branco' | 'rose' | 'amarelo' | null;
  peso?: number | null;
  dataCreated: Date;
  dataPrevistaEntrega?: Date;
  stones: PedidoStone[];
  referenciaModelo: ReferenciaModelo;
  aroConfig?: AroConfig;
  riscado: boolean;
  prioridade: number;
}
