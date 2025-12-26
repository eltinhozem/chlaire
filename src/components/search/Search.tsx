import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon, X, ArrowUp, ArrowDown } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import semImagem from '../logo/semImagem.png'
import {
  SearchContainer,
  SearchHeader,
  SearchInputContainer,
  SearchInputWrapper,
  SearchIconWrapper,
  SearchInput,
  ResultsGrid,
  ResultCard,
  ResultImageContainer,
  ResultImage,
  ResultCardContent,
  ResultTitle,
  ResultDescription,
  FilterButton,
  FilterPanel,
  FilterSection,
  FilterLabel,
  FilterSelect,
  ActiveFilters,
  FilterTag
} from './styles'
import { translate } from '../Styles'
import type { Stone } from '../pedra/types'

interface Jewelry {
  id: string
  reference_name: string
  rota: string | null
  category: string
  weight: number | null
  finish: string | null
  size: string | null
  designer: string | null
  target_audience: string | null
  client_name: string | null
  observations: string | null
  stones: Stone[]
  image_url: string | null
  created_at: string
}

interface Filters {
  category: string
  finish: string
  designer: string
  target_audience: string
  stone_size: string
  stone_unit: 'pts' | 'mm' | ''
}

export default function JewelrySearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [jewelry, setJewelry] = useState<Jewelry[]>([])
  const [loading, setLoading] = useState(true)
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<Filters>({
    category: '',
    finish: '',
    designer: '',
    target_audience: '',
    stone_size: '',
    stone_unit: ''
  })
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchJewelry()
  }, [])

  const fetchJewelry = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('jewelry')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const jewelryWithPublicUrls = await Promise.all(
        (data || []).map(async (item) => {
          if (item.image_url) {
            const { data: publicUrlData } = supabase.storage
              .from('jewelry-images')
              .getPublicUrl(item.image_url.split('/').pop() || '')
            return {
              ...item,
              image_url: publicUrlData.publicUrl
            }
          }
          return item
        })
      )

      setJewelry(jewelryWithPublicUrls)
    } catch (error) {
      console.error('Error fetching jewelry:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredAndSortedJewelry = jewelry
    .filter((item) => {
      const searchLower = searchTerm.toLowerCase()
      const matchesSearch =
        (item.rota?.toLowerCase() || '').includes(searchLower) ||
        (item.reference_name?.toLowerCase() || '').includes(searchLower) ||
        (item.category?.toLowerCase() || '').includes(searchLower) ||
        (item.client_name?.toLowerCase() || '').includes(searchLower) ||
        (item.observations?.toLowerCase() || '').includes(searchLower) ||
        (item.designer?.toLowerCase() || '').includes(searchLower) ||
        (item.finish?.toLowerCase() || '').includes(searchLower) ||
        (item.target_audience?.toLowerCase() || '').includes(searchLower) ||
        item.stones?.some(
          (stone) =>
            (stone.stone_type?.toLowerCase() || '').includes(searchLower) ||
            (stone.cut?.toLowerCase() || '').includes(searchLower) ||
            (stone.pts?.toString() || '').includes(searchLower) ||
            (stone.quilates?.toString() || '').includes(searchLower)
        )

      const matchesFilters =
        (!filters.category || item.category === filters.category) &&
        (!filters.finish || item.finish === filters.finish) &&
        (!filters.designer || item.designer === filters.designer) &&
        (!filters.target_audience ||
          item.target_audience === filters.target_audience) &&
        (!filters.stone_size || !filters.stone_unit ||
          item.stones?.some((stone) => {
            if (filters.stone_unit === 'pts') {
              return (stone.pts?.toString() || '') === filters.stone_size ||
                     (stone.quilates?.toString() || '') === filters.stone_size
            } else if (filters.stone_unit === 'mm') {
              return (stone.largura?.toString() || '') === filters.stone_size ||
                     (stone.altura?.toString() || '') === filters.stone_size ||
                     (stone.comprimento?.toString() || '') === filters.stone_size
            }
            return false
          }))

      return matchesSearch && matchesFilters
    })
    .sort((a, b) => {
      if (!sortOrder) return 0
      
      const rotaA = a.rota || a.reference_name || ''
      const rotaB = b.rota || b.reference_name || ''
      
      if (sortOrder === 'asc') {
        return rotaA.localeCompare(rotaB)
      } else {
        return rotaB.localeCompare(rotaA)
      }
    })

  const handleItemClick = (item: Jewelry) => {
    navigate('/info', { state: { product: item } })
  }

  const handleFilterChange = (name: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const clearFilter = (name: keyof Filters) => {
    setFilters((prev) => ({
      ...prev,
      [name]: ''
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      category: '',
      finish: '',
      designer: '',
      target_audience: '',
      stone_size: '',
      stone_unit: ''
    })
  }

  const getUniqueValues = (field: keyof Omit<Filters, 'stone_size' | 'stone_unit'>) => {
    return Array.from(
      new Set(jewelry.map((item) => item[field]).filter(Boolean))
    )
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchInputContainer>
          <SearchInputWrapper>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <SearchInput
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Pesquisar joias..."
            />
          </SearchInputWrapper>
          <FilterButton onClick={() => setShowFilters(!showFilters)}>
            Filtros
            {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
          </FilterButton>
          <FilterButton onClick={() => {
            if (sortOrder === 'asc') {
              setSortOrder('desc')
            } else if (sortOrder === 'desc') {
              setSortOrder(null)
            } else {
              setSortOrder('asc')
            }
          }}>
            {sortOrder === 'asc' && <ArrowUp size={16} />}
            {sortOrder === 'desc' && <ArrowDown size={16} />}
            {!sortOrder && 'Rota'}
            {sortOrder && ' Rota'}
          </FilterButton>
        </SearchInputContainer>
      </SearchHeader>

      {showFilters && (
        <FilterPanel>
          <FilterSection>
            <FilterLabel>Categoria</FilterLabel>
            <FilterSelect
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">
    {translate('category', 'Todas as categorias')}
  </option>
  {getUniqueValues('category').map((category) => (
    <option key={category} value={String(category)}>
      {translate('category', category)}
    </option>
              ))}
            </FilterSelect>
          </FilterSection>

          <FilterSection>
            <FilterLabel>Acabamento</FilterLabel>
            <FilterSelect
              value={filters.finish}
              onChange={(e) => handleFilterChange('finish', e.target.value)}
            >
              <option value="">Todos os acabamentos</option>
              {getUniqueValues('finish').map((finish) => (
                <option key={finish} value={String(finish)}>
                 {translate('finish', finish)}
                </option>
              ))}
            </FilterSelect>
          </FilterSection>

          <FilterSection>
            <FilterLabel>Designer</FilterLabel>
            <FilterSelect
              value={filters.designer}
              onChange={(e) => handleFilterChange('designer', e.target.value)}
            >
              <option value="">Todos os designers</option>
              {getUniqueValues('designer').map((designer) => (
                <option key={designer} value={String(designer)}>
                 {translate('designer', designer)}
                </option>
              ))}
            </FilterSelect>
          </FilterSection>

          <FilterSection>
            <FilterLabel>Público-Alvo</FilterLabel>
            <FilterSelect
              value={filters.target_audience}
              onChange={(e) =>
                handleFilterChange('target_audience', e.target.value)
              }
            >
              <option value="">Todos os públicos</option>
              {getUniqueValues('target_audience').map((audience) => (
                <option key={audience} value={String(audience)}>
                  {translate('target_audience', audience)}
                </option>
              ))}
            </FilterSelect>
          </FilterSection>

          <FilterSection>
            <FilterLabel>Tamanho da Pedra</FilterLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div style={{ display: 'flex', gap: '0.25rem' }}>
                <SearchInput
                  type="text"
                  value={filters.stone_size}
                  onChange={(e) => handleFilterChange('stone_size', e.target.value)}
                  placeholder={filters.stone_unit ? `Digite ${filters.stone_unit}...` : "Digite o tamanho..."}
                  style={{ 
                    flex: 1,
                    fontSize: '14px',
                    padding: '8px 12px',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                />
                <button
                  style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    background: filters.stone_unit === 'pts' ? '#3b82f6' : '#ffffff',
                    color: filters.stone_unit === 'pts' ? '#ffffff' : '#374151',
                    cursor: 'pointer',
                    minWidth: '40px'
                  }}
                  onClick={() => handleFilterChange('stone_unit', filters.stone_unit === 'pts' ? '' : 'pts')}
                  type="button"
                >
                  PTS
                </button>
                <button
                  style={{
                    padding: '0.25rem 0.5rem',
                    fontSize: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.25rem',
                    background: filters.stone_unit === 'mm' ? '#3b82f6' : '#ffffff',
                    color: filters.stone_unit === 'mm' ? '#ffffff' : '#374151',
                    cursor: 'pointer',
                    minWidth: '40px'
                  }}
                  onClick={() => handleFilterChange('stone_unit', filters.stone_unit === 'mm' ? '' : 'mm')}
                  type="button"
                >
                  MM
                </button>
              </div>
            </div>
          </FilterSection>
        </FilterPanel>
      )}

      {activeFilterCount > 0 && (
        <ActiveFilters>
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null
            return (
              <FilterTag key={key}>
                {value}
                <X
                  onClick={() => clearFilter(key as keyof Filters)}
                  className="ml-2 cursor-pointer"
                />
              </FilterTag>
            )
          })}
          <button onClick={clearAllFilters}>Limpar todos</button>
        </ActiveFilters>
      )}

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <ResultsGrid>
          {filteredAndSortedJewelry.map((item) => (
            <ResultCard key={item.id} onClick={() => handleItemClick(item)}>
              <ResultImageContainer>
  {item.image_url ? (
    <ResultImage
      src={item.image_url}
      alt={item.reference_name}
      onError={(e) => {
        const target = e.target as HTMLImageElement;
        target.src = semImagem; // Corrigido: use "=" em vez de "={}"
      }}
    />
  ) : (
    <ResultImage
      src={semImagem}
      alt="Sem Imagem"
    />
  )}
</ResultImageContainer>
              <ResultCardContent>
                <ResultTitle>{item.rota || item.reference_name}</ResultTitle>
                <ResultDescription>
                  {translate('category', item.category)}{' '}
                  {item.size ? `- ${item.size}` : ''}
                </ResultDescription>
                {item.client_name && <div>Cliente: {item.client_name}</div>}
              </ResultCardContent>
            </ResultCard>
          ))}
          {filteredAndSortedJewelry.length === 0 && !loading && (
            <div>Nenhuma joia encontrada</div>
          )}
        </ResultsGrid>
      )}
    </SearchContainer>
  )
}
