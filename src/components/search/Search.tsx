import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search as SearchIcon, Filter, X } from 'lucide-react'
import { supabase } from '../../lib/supabase'
import {
  searchContainer,
  searchHeader,
  searchInputContainer,
  searchInputWrapper,
  searchIcon,
  searchInput,
  resultsGrid,
  resultCard,
  resultImageContainer,
  resultImage,
  resultCardContent,
  resultTitle,
  resultDescription,
  filterButton,
  filterPanel,
  filterSection,
  filterLabel,
  filterSelect,
  activeFilters,
  filterTag
} from './styles'

interface Jewelry {
  id: string
  reference_name: string
  category: string
  weight: number | null
  finish: string | null
  size: string | null
  designer: string | null
  target_audience: string | null
  client_name: string | null
  observations: string | null
  stones: any[]
  image_url: string | null
  created_at: string
}

interface Filters {
  category: string
  finish: string
  designer: string
  target_audience: string
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
    target_audience: ''
  })
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

  const filteredJewelry = jewelry.filter((item) => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch =
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
          (stone.cut?.toLowerCase() || '').includes(searchLower)
      )

    const matchesFilters =
      (!filters.category || item.category === filters.category) &&
      (!filters.finish || item.finish === filters.finish) &&
      (!filters.designer || item.designer === filters.designer) &&
      (!filters.target_audience ||
        item.target_audience === filters.target_audience)

    return matchesSearch && matchesFilters
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
      target_audience: ''
    })
  }

  const getUniqueValues = (field: keyof Filters) => {
    return Array.from(
      new Set(jewelry.map((item) => item[field]).filter(Boolean))
    )
  }

  const activeFilterCount = Object.values(filters).filter(Boolean).length

  return (
    <div className={searchContainer}>
      <div className={searchHeader}>
        <div className={searchInputContainer}>
          <div className={searchInputWrapper}>
            <SearchIcon className={searchIcon} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={searchInput}
              placeholder="Pesquisar joias..."
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={filterButton}
          >
            Filtros
            {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className={filterPanel}>
          <div className={filterSection}>
            <label className={filterLabel}>Categoria</label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className={filterSelect}
            >
              <option value="">Todas as categorias</option>
              {getUniqueValues('category').map((category) => (
                <option key={category} value={String(category)}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className={filterSection}>
            <label className={filterLabel}>Acabamento</label>
            <select
              value={filters.finish}
              onChange={(e) => handleFilterChange('finish', e.target.value)}
              className={filterSelect}
            >
              <option value="">Todos os acabamentos</option>
              {getUniqueValues('finish').map((finish) => (
                <option key={finish} value={String(finish)}>
                  {finish}
                </option>
              ))}
            </select>
          </div>

          <div className={filterSection}>
            <label className={filterLabel}>Designer</label>
            <select
              value={filters.designer}
              onChange={(e) => handleFilterChange('designer', e.target.value)}
              className={filterSelect}
            >
              <option value="">Todos os designers</option>
              {getUniqueValues('designer').map((designer) => (
                <option key={designer} value={String(designer)}>
                  {designer}
                </option>
              ))}
            </select>
          </div>

          <div className={filterSection}>
            <label className={filterLabel}>Público-Alvo</label>
            <select
              value={filters.target_audience}
              onChange={(e) =>
                handleFilterChange('target_audience', e.target.value)
              }
              className={filterSelect}
            >
              <option value="">Todos os públicos</option>
              {getUniqueValues('target_audience').map((audience) => (
                <option key={audience} value={String(audience)}>
                  {audience}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {activeFilterCount > 0 && (
        <div className={activeFilters}>
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null
            return (
              <div key={key} className={filterTag}>
                {value}
                <X
                  onClick={() => clearFilter(key as keyof Filters)}
                  className="ml-2 cursor-pointer"
                />
              </div>
            )
          })}
          <button onClick={clearAllFilters}>Limpar todos</button>
        </div>
      )}

      {loading ? (
        <div>Carregando...</div>
      ) : (
        <div className={resultsGrid}>
          {filteredJewelry.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className={resultCard}
            >
              <div className={resultImageContainer}>
                {item.image_url ? (
                  <img
                    src={item.image_url}
                    alt={item.reference_name}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src =
                        'https://via.placeholder.com/300?text=Sem+Imagem'
                    }}
                    className={resultImage}
                  />
                ) : (
                  <img
                    src="https://via.placeholder.com/300?text=Sem+Imagem"
                    alt="Sem Imagem"
                    className={resultImage}
                  />
                )}
              </div>
              <div className={resultCardContent}>
                <div className={resultTitle}>{item.reference_name}</div>
                <div className={resultDescription}>
                  {item.category} {item.size ? `- ${item.size}` : ''}
                </div>
                {item.client_name && <div>Cliente: {item.client_name}</div>}
              </div>
            </div>
          ))}
          {filteredJewelry.length === 0 && !loading && (
            <div>Nenhuma joia encontrada</div>
          )}
        </div>
      )}
    </div>
  )
}
