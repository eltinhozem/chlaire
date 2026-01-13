export interface Stone {
    stone_type: string;
    cut: string;
    quantity: number;
    quilates?: number;
    pts?: number;
    largura?: string;
    altura?: string;
    comprimento?: string;
   // tipo_cravacao?: string;
  }
  
  export interface PedraProps {
    index: number;
    stone: Stone;
    onRemove: (index: number) => void;
    onChange: (updatedStone: Stone) => void;
    onSave: (updatedStone: Stone) => void;
    saveSignal?: number;
  }
  
  export interface PedraLogic {
    tipo: string;
    lapidacao: string;
    quantidade: number;
    quilates: string;
    largura: string;
    altura: string;
    comprimento: string;
    pts: string;
   // tipo_cravacao: string;
    isViewMode: boolean;
    handleTipoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleLapidacaoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleQuantidadeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleQuilatesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePtsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleLarguraChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleComprimentoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAlturaChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
   // handleTipoCravacaoChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSave: () => void;
    handleEdit: () => void;
  }
