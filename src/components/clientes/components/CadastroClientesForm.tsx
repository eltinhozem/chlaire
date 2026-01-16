import React from 'react';
import {
  FormSection,
  SectionTitle,
  FormGrid,
  FingerToggle,
  FingerToggleInput,
  HandsGrid,
  HandCard,
  HandTitle,
  HandImage,
  FingerInputs,
  FingerField,
  FingerLabel,
  FingerInput
} from '../styles';
import { PrimaryButton, SecondaryButton } from '../../buttons';
import FormField from '../../form/components/FormField';
import {
  ClienteFormData,
  FingerKey,
  HandSide,
  NumeracaoDedos,
  SpecialDate,
  estadoCivilOptions,
  generoOptions,
  origemCadastroOptions,
  tipoPessoaOptions
} from '../types';
import { fingerLabels } from '../constants';
import MaoDireita from '../../ReferenciasVisuais/dedos/maodi.svg';
import MaoEsquerda from '../../ReferenciasVisuais/dedos/maoes.svg';

const handOptions: { key: HandSide; label: string; image: string }[] = [
  { key: 'direita', label: 'Mão direita', image: MaoDireita },
  { key: 'esquerda', label: 'Mão esquerda', image: MaoEsquerda }
];

interface CadastroClientesFormProps {
  formData: ClienteFormData;
  submitting: boolean;
  isEditing: boolean;
  isCasado: boolean;
  spouseOptions: { value: string; label: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  onSpouseChange: (id: string | null) => void;
  onViewSpouse: (id: string) => void;
  specialDates: SpecialDate[];
  onAddSpecialDate: () => void;
  onUpdateSpecialDate: (index: number, field: keyof SpecialDate, value: string) => void;
  onRemoveSpecialDate: (index: number) => void;
  showFingerSizing: boolean;
  fingerSizes: NumeracaoDedos;
  onToggleFingerSizing: (checked: boolean) => void;
  onFingerSizeChange: (hand: HandSide, finger: FingerKey) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCPFChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onPhoneChange: (field: 'telefone' | 'celular') => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
}

const CadastroClientesForm: React.FC<CadastroClientesFormProps> = ({
  formData,
  submitting,
  isEditing,
  isCasado,
  spouseOptions,
  onChange,
  onSubmit,
  onCancel,
  onSpouseChange,
  onViewSpouse,
  specialDates,
  onAddSpecialDate,
  onUpdateSpecialDate,
  onRemoveSpecialDate,
  showFingerSizing,
  fingerSizes,
  onToggleFingerSizing,
  onFingerSizeChange,
  onCPFChange,
  onPhoneChange
}) => {
  return (
    <form onSubmit={onSubmit}>
      <FormSection>
        <SectionTitle>Dados Pessoais</SectionTitle>
        <FormGrid style={{ gridTemplateColumns: '3fr 1fr', marginBottom: '1rem' }}>
          <FormField
            label="Nome Completo"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={onChange}
            required
            placeholder="Nome do cliente"
          />
          <FormField
            label="Data de Nascimento"
            id="data_nascimento"
            name="data_nascimento"
            type="date"
            value={formData.data_nascimento || ''}
            onChange={onChange}
          />
        </FormGrid>
        <div style={{ gridColumn: '1 / -1', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <button
              type="button"
              onClick={onAddSpecialDate}
              style={{ padding: '0.35rem 0.75rem', borderRadius: 6, border: '1px solid #d1d5db', background: '#f9fafb', cursor: 'pointer' }}
            >
              + Datas Especiais
            </button>
            <span style={{ color: '#6b7280', fontSize: 14 }}>Cadastre datas importantes e o motivo</span>
          </div>
          {specialDates.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {specialDates.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '160px 1fr 36px',
                    gap: '0.5rem',
                    alignItems: 'center'
                  }}
                >
                  <input
                    type="date"
                    value={item.data}
                    onChange={(e) => onUpdateSpecialDate(idx, 'data', e.target.value)}
                    style={{ padding: '0.55rem 0.75rem', borderRadius: 8, border: '1px solid #d1d5db' }}
                  />
                  <input
                    type="text"
                    value={item.descricao}
                    placeholder="Ex: Aniversário de casamento"
                    onChange={(e) => onUpdateSpecialDate(idx, 'descricao', e.target.value)}
                    style={{ padding: '0.55rem 0.75rem', borderRadius: 8, border: '1px solid #d1d5db' }}
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveSpecialDate(idx)}
                    style={{ border: '1px solid #ef4444', color: '#ef4444', background: 'white', borderRadius: 8, height: '100%' }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        <FormGrid style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '1rem' }}>
          <FormField
            label="Gênero"
            id="genero"
            name="genero"
            value={formData.genero || ''}
            onChange={onChange}
            options={generoOptions}
          />
          <FormField
            label="Estado Civil"
            id="estado_civil"
            name="estado_civil"
            value={formData.estado_civil || ''}
            onChange={onChange}
            options={estadoCivilOptions}
          />
          <FormField
            label="Profissão/Ocupação"
            id="profissao"
            name="profissao"
            value={formData.profissao || ''}
            onChange={onChange}
            placeholder="Ex: Empresário"
          />
        </FormGrid>
        {isCasado && (
          <div style={{ marginBottom: '1rem' }}>
            <FormField
              label="Cônjuge"
              id="conjuge_id"
              name="conjuge_id"
              value={formData.conjuge_id || ''}
              onChange={(e) => onSpouseChange(e.target.value || null)}
              options={spouseOptions}
            />
            {formData.conjuge_id && (
              <div style={{ marginTop: '0.5rem' }}>
                <SecondaryButton type="button" onClick={() => onViewSpouse(formData.conjuge_id as string)}>
                  Ver informações do cônjuge
                </SecondaryButton>
              </div>
            )}
          </div>
        )}
        <FormGrid style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginBottom: '1rem' }}>
          <FormField
            label="Nacionalidade"
            id="nacionalidade"
            name="nacionalidade"
            value={formData.nacionalidade || ''}
            onChange={onChange}
            placeholder="Ex: Brasileira"
          />
          <FormField
            label="Tipo de Pessoa"
            id="tipo_pessoa"
            name="tipo_pessoa"
            value={formData.tipo_pessoa}
            onChange={onChange}
            options={tipoPessoaOptions}
            required
          />
          <FormField
            label="CPF/CNPJ"
            id="cpf"
            name="cpf"
            value={formData.cpf || ''}
            onChange={onCPFChange}
            placeholder={formData.tipo_pessoa === 'fisica' ? '000.000.000-00' : '00.000.000/0000-00'}
            maxLength={formData.tipo_pessoa === 'fisica' ? 14 : 18}
          />
        </FormGrid>
        <div style={{ marginTop: '0.5rem' }}>
          <FingerToggle>
            <FingerToggleInput
              type="checkbox"
              checked={showFingerSizing}
              onChange={(e) => onToggleFingerSizing(e.target.checked)}
            />
            Numeração dos dedos
          </FingerToggle>
          {showFingerSizing && (
            <HandsGrid>
              {handOptions.map((hand) => (
                <HandCard key={hand.key}>
                  <HandTitle>{hand.label}</HandTitle>
                  <HandImage src={hand.image} alt={hand.label} />
                  <FingerInputs>
                    {fingerLabels.map((finger) => {
                      const fieldId = `dedos-${hand.key}-${finger.key}`;
                      return (
                        <FingerField key={fieldId}>
                          <FingerLabel htmlFor={fieldId}>{finger.label}</FingerLabel>
                          <FingerInput
                            id={fieldId}
                            type="text"
                            inputMode="decimal"
                            value={fingerSizes[hand.key][finger.key]}
                            onChange={onFingerSizeChange(hand.key, finger.key)}
                            placeholder="--"
                          />
                        </FingerField>
                      );
                    })}
                  </FingerInputs>
                </HandCard>
              ))}
            </HandsGrid>
          )}
        </div>
      </FormSection>

      <FormSection>
        <SectionTitle>Contato</SectionTitle>
        <FormGrid>
          <FormField
            label="Email"
            id="email"
            name="email"
            type="email"
            value={formData.email || ''}
            onChange={onChange}
            placeholder="email@exemplo.com"
          />
          <FormField
            label="Telefone Fixo"
            id="telefone"
            name="telefone"
            value={formData.telefone || ''}
            onChange={onPhoneChange('telefone')}
            placeholder="(00) 0000-0000"
            maxLength={14}
          />
          <FormField
            label="Celular"
            id="celular"
            name="celular"
            value={formData.celular || ''}
            onChange={onPhoneChange('celular')}
            placeholder="(00) 00000-0000"
            maxLength={15}
          />
          <FormField
            label="Endereço"
            id="endereco"
            name="endereco"
            value={formData.endereco || ''}
            onChange={onChange}
            placeholder="Rua, número, bairro, cidade - UF"
          />
          <FormField
            label="Instagram"
            id="instagram"
            name="instagram"
            type="url"
            value={formData.instagram || ''}
            onChange={onChange}
            placeholder="https://instagram.com/usuario"
          />
          <FormField
            label="Facebook"
            id="facebook"
            name="facebook"
            type="url"
            value={formData.facebook || ''}
            onChange={onChange}
            placeholder="https://facebook.com/usuario"
          />
          <FormField
            label="Site da Empresa"
            id="site_empresa"
            name="site_empresa"
            type="url"
            value={formData.site_empresa || ''}
            onChange={onChange}
            placeholder="https://www.empresa.com.br"
          />
        </FormGrid>
      </FormSection>

      <FormSection>
        <SectionTitle>Origem do Cadastro</SectionTitle>
        <FormGrid style={{ gridTemplateColumns: '1fr 3fr'}}>
          <FormField
            label="Como conheceu?"
            id="origem_cadastro"
            name="origem_cadastro"
            value={formData.origem_cadastro || ''}
            onChange={onChange}
            options={origemCadastroOptions}
          />
          <FormField
            label="Indicado por"
            id="indicado_por"
            name="indicado_por"
            value={formData.indicado_por || ''}
            onChange={onChange}
            placeholder="Nome de quem indicou (se aplicável)"
          />
        </FormGrid>
      </FormSection>

      <FormSection>
        <SectionTitle>Observações</SectionTitle>
        <FormGrid>
          <div style={{ gridColumn: '1 / -1' }}>
            <FormField
              label="Obs."
              id="observacao"
              name="observacao"
              value={formData.observacao || ''}
              onChange={onChange}
              isTextArea
              rows={4}
              placeholder="Observações adicionais sobre o cliente"
            />
          </div>
        </FormGrid>
      </FormSection>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
        <SecondaryButton type="button" onClick={onCancel}>
          Cancelar
        </SecondaryButton>
        <PrimaryButton type="submit" disabled={submitting}>
          {submitting ? 'Salvando...' : isEditing ? 'Atualizar' : 'Cadastrar'}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default CadastroClientesForm;
