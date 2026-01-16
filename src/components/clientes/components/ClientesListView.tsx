import React from 'react';
import { Search } from 'lucide-react';
import FormField from '../../form/components/FormField';
import type { Cliente } from '../types';
import { birthMonthOptions } from '../constants';
import { buildWhatsAppLink, getInitials } from '../utils';
import { formatDateLabel } from '../../../lib/dateUtils';
import {
  ClientesList,
  ClienteCard,
  ClienteHeader,
  ClienteAvatar,
  ClienteInfo,
  ClienteInfoHeader,
  ClienteNome,
  ClienteEmail,
  ClienteDetails,
  ClienteDetailItem,
  ClienteDetailLabel,
  ClienteDetailValue,
  InstaButton,
  SearchContainer,
  SearchInput,
  SearchIcon,
  FilterPanel,
  FilterRow,
  FilterLabel,
  FilterActionButton,
  MonthPickerBox,
  MonthGrid,
  MonthButton,
  FilterToggleButton
} from '../styles';

interface ClientesListViewProps {
  showFilters: boolean;
  showMonthPicker: boolean;
  selectedMonthLabel?: string;
  birthMonthFilter: string;
  collectionFilter: string;
  collections: { id: string; name: string }[];
  estadoCivilLabel: string;
  estadoCivilState: string;
  searchQuery: string;
  loading: boolean;
  clientes: Cliente[];
  onToggleMonthPicker: () => void;
  onSelectMonth: (value: string) => void;
  onCollectionFilterChange: (value: string) => void;
  onCycleEstadoCivil: () => void;
  onClearFilters: () => void;
  onSearch: (query: string) => void;
  onOpenDetails: (cliente: Cliente) => void;
}

const ClientesListView: React.FC<ClientesListViewProps> = ({
  showFilters,
  showMonthPicker,
  selectedMonthLabel,
  birthMonthFilter,
  collectionFilter,
  collections,
  estadoCivilLabel,
  estadoCivilState,
  searchQuery,
  loading,
  clientes,
  onToggleMonthPicker,
  onSelectMonth,
  onCollectionFilterChange,
  onCycleEstadoCivil,
  onClearFilters,
  onSearch,
  onOpenDetails
}) => {
  return (
    <>
      {showFilters && (
        <FilterPanel>
          <FilterRow>
            <div style={{ minWidth: 220, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <FilterLabel>Aniversário</FilterLabel>
              <FilterActionButton
                type="button"
                onClick={onToggleMonthPicker}
              >
                {selectedMonthLabel || 'Selecionar mês'}
              </FilterActionButton>
            </div>
            <div style={{ minWidth: 220, flex: 1 }}>
              <FormField
                label="Coleção"
                id="filtro-colecao"
                name="filtro-colecao"
                value={collectionFilter}
                onChange={(e) => onCollectionFilterChange(e.target.value)}
                options={collections.map((collection) => ({
                  value: collection.id,
                  label: collection.name
                }))}
              />
            </div>
            <FilterToggleButton type="button" $state={estadoCivilState} onClick={onCycleEstadoCivil}>
              {estadoCivilLabel}
            </FilterToggleButton>
            <FilterActionButton type="button" onClick={onClearFilters}>
              Limpar filtros
            </FilterActionButton>
          </FilterRow>
          {showMonthPicker && (
            <MonthPickerBox>
              <MonthGrid>
                {birthMonthOptions.map((month) => (
                  <MonthButton
                    key={month.value}
                    type="button"
                    $active={birthMonthFilter === month.value}
                    onClick={() => onSelectMonth(month.value)}
                  >
                    {month.label}
                  </MonthButton>
                ))}
              </MonthGrid>
            </MonthPickerBox>
          )}
        </FilterPanel>
      )}
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Pesquisar clientes..."
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
        />
        <SearchIcon>
          <Search size={16} />
        </SearchIcon>
      </SearchContainer>

      {loading ? (
        <p>Carregando...</p>
      ) : clientes.length === 0 ? (
        <p>Nenhum cliente encontrado.</p>
      ) : (
        <ClientesList>
          {clientes.map((cliente) => {
            const rawPhone = cliente.celular || cliente.telefone || '';
            const phone = rawPhone || '-';
            const instagram = (cliente.instagram || '').trim();
            const instagramLink = instagram
              ? instagram.startsWith('http')
                ? instagram
                : `https://instagram.com/${instagram.replace('@', '')}`
              : '';
            const facebook = (cliente.facebook || '').trim();
            const facebookLink = facebook
              ? facebook.startsWith('http')
                ? facebook
                : `https://facebook.com/${facebook.replace('@', '')}`
              : '';
            const site = (cliente.site_empresa || '').trim();
            const siteLink = site
              ? site.startsWith('http')
                ? site
                : `https://${site}`
              : '';
            const whatsappLink = buildWhatsAppLink(rawPhone);
            const initials = getInitials(cliente.nome);
            const birthInfo = formatDateLabel(cliente.data_nascimento);

            return (
              <ClienteCard key={cliente.id} onClick={() => onOpenDetails(cliente)}>
                <ClienteHeader>
                  <ClienteAvatar>{initials}</ClienteAvatar>
                  <ClienteInfoHeader>
                    <ClienteNome>{cliente.nome}</ClienteNome>
                    <ClienteEmail>{phone}</ClienteEmail>
                  </ClienteInfoHeader>
                </ClienteHeader>
                <ClienteInfo>
                  <ClienteDetails>
                    {birthInfo?.label && (
                      <ClienteDetailItem>
                        <span>
                          <ClienteDetailLabel>Aniversário:</ClienteDetailLabel>
                          <ClienteDetailValue>{birthInfo.label}</ClienteDetailValue>
                        </span>
                      </ClienteDetailItem>
                    )}
                    {(instagramLink || facebookLink || siteLink || whatsappLink) && (
                      <ClienteDetailItem>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                          {instagramLink && (
                            <InstaButton
                              href={instagramLink}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Instagram
                            </InstaButton>
                          )}
                          {facebookLink && (
                            <InstaButton
                              href={facebookLink}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Facebook
                            </InstaButton>
                          )}
                          {siteLink && (
                            <InstaButton
                              href={siteLink}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              Site
                            </InstaButton>
                          )}
                          {whatsappLink && (
                            <InstaButton
                              href={whatsappLink}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                            >
                              WhatsApp
                            </InstaButton>
                          )}
                        </div>
                      </ClienteDetailItem>
                    )}
                  </ClienteDetails>
                </ClienteInfo>
              </ClienteCard>
            );
          })}
        </ClientesList>
      )}
    </>
  );
};

export default ClientesListView;
