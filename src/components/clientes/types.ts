export interface Cliente {
  id: string;
  nome: string;
  endereco?: string;
  telefone?: string;
  celular?: string;
  data_nascimento?: string;
  email?: string;
  cpf?: string;
  instagram?: string;
  facebook?: string;
  site_empresa?: string;
  genero?: 'masculino' | 'feminino' | 'outro' | 'nao_informado';
  estado_civil?: 'solteiro' | 'casado' | 'divorciado' | 'viuvo' | 'uniao_estavel';
  profissao?: string;
  nacionalidade?: string;
  tipo_pessoa: 'fisica' | 'juridica';
  origem_cadastro?: 'indicacao' | 'site' | 'loja_fisica' | 'redes_sociais' | 'outro';
  indicado_por?: string;
  observacao?: string;
  numeracao_dedos?: NumeracaoDedos | null;
  created_at: Date;
  updated_at: Date;
}

export type FingerKey = 'polegar' | 'indicador' | 'medio' | 'anelar' | 'minimo';
export type HandSide = 'direita' | 'esquerda';
export type NumeracaoDedos = Record<HandSide, Record<FingerKey, string>>;

export const generoOptions = [
  { value: 'masculino', label: 'Masculino' },
  { value: 'feminino', label: 'Feminino' },
  { value: 'outro', label: 'Outro' },
  { value: 'nao_informado', label: 'Prefiro não informar' }
];

export const estadoCivilOptions = [
  { value: 'solteiro', label: 'Solteiro(a)' },
  { value: 'casado', label: 'Casado(a)' },
  { value: 'divorciado', label: 'Divorciado(a)' },
  { value: 'viuvo', label: 'Viúvo(a)' },
  { value: 'uniao_estavel', label: 'União Estável' }
];

export const tipoPessoaOptions = [
  { value: 'fisica', label: 'Pessoa Física' },
  { value: 'juridica', label: 'Pessoa Jurídica' }
];

export const origemCadastroOptions = [
  { value: 'indicacao', label: 'Indicação' },
  { value: 'site', label: 'Site' },
  { value: 'loja_fisica', label: 'Loja Física' },
  { value: 'redes_sociais', label: 'Redes Sociais' },
  { value: 'outro', label: 'Outro' }
];
