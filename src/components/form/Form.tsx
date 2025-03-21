import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { PlusCircle, Upload } from 'lucide-react'
import Pedra from '../pedra/pedra'
import {
  FormContainer,
  FormTitle,
  InputLabel,
  InputField,
  SelectField,
  TextAreaField,
  ImageDateGrid,
  FormGrid,
  StoneHeader,
  StoneTitle,
  AddStoneButton,
  StoneSection,
  ActionButton,
  SubmitButton,
  ImageUploadContainer,
  ImagePreview,
  ImageUploadButton,
  Container,
  Campo,
  getNextReference
} from './styles'

interface Stone {
  stone_type: string
  cut: string
  quantity: number
  quilates?: number
  pts?: number
  largura?: string
  altura?: string
  comprimento?: string
}

interface JewelryFormData {
  id?: string
  reference_name: string
  category: string
  target_audience: string
  client_name: string

  size: string
  rota: string
  stl: string
  version: number | null

  weight: number | null
  designer: string
  material: string
  finish: string

  date: string
  observations: string
  descricao: string
  stones: Stone[]
  image_url?: string
}

export default function JewelryForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const product = location.state?.product

  const [loading, setLoading] = useState(false)
  const [stones, setStones] = useState<Stone[]>(product?.stones || [])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(
    product?.image_url || ''
  )

  const [formData, setFormData] = useState<JewelryFormData>({
    id: product?.id,
    reference_name: product?.reference_name || '',
    category: product?.category || '',
    target_audience: product?.target_audience || '',
    client_name: product?.client_name || '',

    size: product?.size || '',
    rota: product?.rota || '',
    stl: product?.stl || '',
    version: product?.version || null,

    weight: product?.weight || null,
    designer: product?.designer || '',
    material: product?.material || '',
    finish: product?.finish || '',

    date: product?.date || new Date().toISOString().split('T')[0],
    observations: product?.observations || '',
    descricao: product?.descricao || '',
    stones: product?.stones || [],
    image_url: product?.image_url || ''
  })

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id,
        reference_name: product.reference_name,
        category: product.category,
        target_audience: product.target_audience,
        client_name: product.client_name,

        size: product.size,
        rota: product.rota,
        stl: product.stl,
        version: product.version,

        weight: product.weight,
        designer: product.designer,
        material: product.material,
        finish: product.finish,

        date: product.date || new Date().toISOString().split('T')[0],
        observations: product.observations,
        descricao: product.descricao,
        stones: product.stones,
        image_url: product.image_url
      })
      setStones(product.stones || [])
      setImagePreviewUrl(product.image_url || '')
    }
  }, [product])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setImageFile(file)
      setImagePreviewUrl(URL.createObjectURL(file))
    }
  }

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('jewelry-images')
      .upload(filePath, file)

    if (uploadError) {
      throw uploadError
    }

    const { data } = supabase.storage
      .from('jewelry-images')
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) throw new Error('Usuário não autenticado')

      let image_url = formData.image_url
      if (imageFile) {
        image_url = await uploadImage(imageFile)
      }

      const payload: any = {
        ...formData,
        stones,
        image_url,
        user_id: user.id
      }

      if (!payload.id) {
        delete payload.id
      }

      const { data, error } = await supabase
        .from('jewelry')
        .upsert([payload])
        .select()

      if (error) throw error

      if (data && data[0]) {
        navigate('/info', { state: { product: data[0] } })
      }
    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'weight'
          ? value
            ? parseFloat(value)
            : null
          : name === 'version'
          ? value
            ? parseInt(value, 10)
            : null
          : value
    }))
  
    if (name === 'category' && value) {
      const newRef = await getNextReference(value, supabase)
      setFormData((prev) => ({
        ...prev,
        reference_name: newRef,
        category: value
      }))
    }
  }
  

  const addStone = () => {
    setStones([
      ...stones,
      {
        stone_type: '',
        cut: 'Redonda',
        quantity: 1
      }
    ])
  }

  const removeStone = (index: number) => {
    setStones(stones.filter((_, i) => i !== index))
  }

  const handleStoneChange = (index: number, updatedStone: Stone) => {
    const updatedStones = [...stones]
    updatedStones[index] = updatedStone
    setStones(updatedStones)
  }

  return (
    <FormContainer>
      <FormTitle>{product ? 'Editar Joia' : 'Cadastrar Nova Joia'}</FormTitle>
      <form onSubmit={handleSubmit}>
        {/* Primeira linha: Imagem da Joia e Data */}
        <ImageDateGrid>
          <div>
            <InputLabel>Imagem da Joia</InputLabel>
            <ImageUploadContainer>
              <div
                style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}
              >
                {imagePreviewUrl && (
                  <ImagePreview>
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      style={{
                        width: '8rem',
                        height: '8rem',
                        objectFit: 'cover'
                      }}
                    />
                  </ImagePreview>
                )}
                <ImageUploadButton>
                  <Upload size={20} style={{ marginRight: '0.5rem' }} />
                  {imagePreviewUrl ? 'Trocar Imagem' : 'Adicionar Imagem'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </ImageUploadButton>
              </div>
            </ImageUploadContainer>
          </div>
          <div>
            <InputLabel htmlFor="date">Data *</InputLabel>
            <InputField
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </ImageDateGrid>

        {/* Segunda linha: 4 campos */}
        <FormGrid>
          <div>
            <InputLabel htmlFor="reference_name">Referência *</InputLabel>
            <InputField
              type="text"
              id="reference_name"
              name="reference_name"
              value={formData.reference_name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <InputLabel htmlFor="category">Categoria *</InputLabel>
            <SelectField
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Selecione</option>
              <option value="ring">Anel</option>
              <option value="wedding_ring">Aliança</option>
              <option value="meia_alianca">Meia Aliança</option>
              <option value="pendant">Pingente</option>
              <option value="earring">Brinco</option>
              <option value="necklace">Colar</option>
              <option value="bracelet">Pulseira</option>
              <option value="brooch">Broche</option>
              <option value="rivi">Rivieira</option>
            </SelectField>
          </div>
          <div>
            <InputLabel htmlFor="target_audience">Público-Alvo</InputLabel>
            <SelectField
              id="target_audience"
              name="target_audience"
              value={formData.target_audience}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="female">Feminino</option>
              <option value="male">Masculino</option>
              <option value="children">Infantil</option>
              <option value="unisex">Unissex</option>
            </SelectField>
          </div>
          <div>
            <InputLabel htmlFor="client_name">Nome do Cliente</InputLabel>
            <InputField
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
            />
          </div>
        </FormGrid>

        {/* Terceira linha: 4 campos */}
        <FormGrid>
          <div>
            <InputLabel htmlFor="size">Tamanho</InputLabel>
            <InputField
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
            />
          </div>
          <div>
            <InputLabel htmlFor="rota">Rota</InputLabel>
            <InputField
              type="text"
              id="rota"
              name="rota"
              value={formData.rota}
              onChange={handleChange}
            />
          </div>
          <div>
            <InputLabel htmlFor="stl">STL</InputLabel>
            <InputField
              type="text"
              id="stl"
              name="stl"
              value={formData.stl}
              onChange={handleChange}
            />
          </div>
          <div>
            <InputLabel htmlFor="version">Versão</InputLabel>
            <InputField
              type="number"
              id="version"
              name="version"
              value={formData.version || ''}
              onChange={handleChange}
            />
          </div>
        </FormGrid>

        {/* Quarta linha: 4 campos */}
        <FormGrid>
          <div>
            <InputLabel htmlFor="weight">Peso (g)</InputLabel>
            <InputField
              type="number"
              id="weight"
              name="weight"
              value={formData.weight || ''}
              onChange={handleChange}
              step="0.01"
            />
          </div>
          <div>
            <InputLabel htmlFor="designer">Designer</InputLabel>
            <SelectField
              id="designer"
              name="designer"
              value={formData.designer}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="classic">Clássico</option>
              <option value="modern">Moderno</option>
              <option value="vintage">Vintage</option>
              <option value="contemporary">Contemporâneo</option>
              <option value="personalizado">Personalizado</option>
              <option value="minimalist">Minimalista</option>
            </SelectField>
          </div>
          <div>
            <InputLabel htmlFor="material">Material</InputLabel>
            <SelectField
              id="material"
              name="material"
              value={formData.material}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="ouro">Ouro</option>
              <option value="ouro branco">Ouro Branco</option>
              <option value="ouro rose">Ouro Rose</option>
              <option value="prata">Prata</option>
            </SelectField>
          </div>
          <div>
            <InputLabel htmlFor="finish">Acabamento</InputLabel>
            <SelectField
              id="finish"
              name="finish"
              value={formData.finish}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="polished">Polido</option>
              <option value="matte">Fosco</option>
              <option value="textured">Texturizado</option>
              <option value="hammered">Martelado</option>
              <option value="brushed">Escovado</option>
              <option value="antique">Envelhecido</option>
            </SelectField>
          </div>
        </FormGrid>

        <Container>
          <Campo>
            <InputLabel htmlFor="descricao">Descrição</InputLabel>
            <TextAreaField
              id="descricao"
              name="descricao"
              value={formData.descricao || ''}
              onChange={handleChange}
              rows={4}
              style={{ width: '100%' }}
            />
          </Campo>

          <Campo>
            <InputLabel htmlFor="observations">Observações</InputLabel>
            <TextAreaField
              id="observations"
              name="observations"
              value={formData.observations}
              onChange={handleChange}
              rows={4}
              style={{ width: '100%' }}
            />
          </Campo>
        </Container>

        {/* Seção de Pedras */}
        <StoneHeader>
          <StoneTitle>Pedras</StoneTitle>
          <AddStoneButton type="button" onClick={addStone}>
            <PlusCircle size={16} style={{ marginRight: '0.5rem' }} />
            Adicionar Pedra
          </AddStoneButton>
        </StoneHeader>
        <StoneSection>
          {stones.map((stone, index) => (
            <Pedra
              key={index}
              index={index}
              stone={stone}
              onRemove={removeStone}
              onChange={(updatedStone) =>
                handleStoneChange(index, updatedStone)
              }
              onSave={() => {}}
            />
          ))}
        </StoneSection>

        {/* Botões de Ação */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-end',
            gap: '1rem',
            marginTop: '2rem'
          }}
        >
          <ActionButton type="button" onClick={() => navigate('/search')}>
            Cancelar
          </ActionButton>
          <SubmitButton type="submit" disabled={loading}>
            {product ? 'Atualizar Joia' : 'Salvar Joia'}
          </SubmitButton>
        </div>
      </form>
    </FormContainer>
  )
}
