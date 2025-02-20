import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { PlusCircle, Upload } from 'lucide-react';
import Pedra from '../pedra/pedra';
import {
  formContainer,
  formTitle,
  formGrid,
  inputLabel,
  inputField,
  selectField,
  textAreaField,
  stoneHeader,
  stoneTitle,
  addStoneButton,
  stoneSection,
  actionButtonsContainer,
  cancelButton,
  submitButton,
  imageUploadContainer,
  imagePreview,
  imageUploadButton,
} from './styles';

interface JewelryFormData {
  reference_name: string;
  category: string;
  weight: number | null;
  finish: string;
  size: string;
  designer: string;
  target_audience: string;
  client_name: string;
  observations: string;
  stones: Stone[];
  image_url?: string;
}

interface Stone {
  stone_type: string;
  cut: string;
  quantity: number;
  quilates?: number;
  pts?: number;
  largura?: string;
  altura?: string;
  comprimento?: string;
}

export default function JewelryForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [stones, setStones] = useState<Stone[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');
  const [formData, setFormData] = useState<JewelryFormData>({
    reference_name: '',
    category: '',
    weight: null,
    finish: '',
    size: '',
    designer: '',
    target_audience: '',
    client_name: '',
    observations: '',
    stones: [],
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('jewelry-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data } = supabase.storage
      .from('jewelry-images')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('Usuário não autenticado');

      let image_url = formData.image_url;
      if (imageFile) {
        image_url = await uploadImage(imageFile);
      }

      const { error } = await supabase
        .from('jewelry')
        .insert([
          {
            ...formData,
            stones,
            image_url,
            user_id: user.id,
          },
        ]);

      if (error) throw error;

      navigate('/search');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weight' ? (value ? parseFloat(value) : null) : value,
    }));
  };

  const addStone = () => {
    setStones([...stones, {
      stone_type: '',
      cut: 'Redonda',
      quantity: 1,
    }]);
  };

  const removeStone = (index: number) => {
    setStones(stones.filter((_, i) => i !== index));
  };

  const handleStoneChange = (index: number, updatedStone: Stone) => {
    const updatedStones = [...stones];
    updatedStones[index] = updatedStone;
    setStones(updatedStones);
  };

  return (
    <div className={formContainer}>
      <h2 className={formTitle}>Cadastrar Nova Joia</h2>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Image Upload Section */}
        <div className={imageUploadContainer}>
          <label className={inputLabel}>
            Imagem da Joia
          </label>
          <div className="mt-1 flex items-center space-x-4">
            {imagePreviewUrl && (
              <div className={imagePreview}>
                <img
                  src={imagePreviewUrl}
                  alt="Preview"
                  className="h-32 w-32 object-cover rounded-lg"
                />
              </div>
            )}
            <label className={imageUploadButton}>
              <Upload className="h-5 w-5 mr-2" />
              {imagePreviewUrl ? 'Trocar Imagem' : 'Adicionar Imagem'}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className={formGrid}>
          <div>
            <label htmlFor="reference_name" className={inputLabel}>
              Nome de Referência *
            </label>
            <input
              type="text"
              id="reference_name"
              name="reference_name"
              value={formData.reference_name}
              onChange={handleChange}
              required
              className={inputField}
            />
          </div>

          <div>
            <label htmlFor="category" className={inputLabel}>
              Categoria *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className={selectField}
            >
              <option value="">Selecione uma categoria</option>
              <option value="ring">Anel</option>
              <option value="wedding_ring">Aliança</option>
              <option value="meia_alianca">Meia Aliança</option>
              <option value="pendant">Pingente</option>
              <option value="earring">Brinco</option>
              <option value="necklace">Colar</option>
              <option value="bracelet">Pulseira</option>           
              <option value="brooch">Broche</option>              
              <option value="rivi">Rivieira</option>
            </select>
          </div>

          <div>
            <label htmlFor="weight" className={inputLabel}>
              Peso (g)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight || ''}
              onChange={handleChange}
              step="0.01"
              className={inputField}
            />
          </div>

          <div>
            <label htmlFor="finish" className={inputLabel}>
              Acabamento
            </label>
            <select
              id="finish"
              name="finish"
              value={formData.finish}
              onChange={handleChange}
              className={selectField}
            >
              <option value="">Selecione um acabamento</option>
              <option value="polished">Polido</option>
              <option value="matte">Fosco</option>
              <option value="textured">Texturizado</option>
              <option value="hammered">Martelado</option>
              <option value="brushed">Escovado</option>
              <option value="antique">Envelhecido</option>
            </select>
          </div>

          <div>
            <label htmlFor="size" className={inputLabel}>
              Tamanho
            </label>
            <input
              type="text"
              id="size"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className={inputField}
            />
          </div>

          <div>
            <label htmlFor="designer" className={inputLabel}>
              Designer
            </label>
            <select
              id="designer"
              name="designer"
              value={formData.designer}
              onChange={handleChange}
              className={selectField}
            >
              <option value="">Selecione um estilo</option>
              <option value="classic">Clássico</option>
              <option value="modern">Moderno</option>
              <option value="vintage">Vintage</option>
              <option value="contemporary">Contemporâneo</option>
              <option value="personalizado">Personalizado</option>
              <option value="minimalist">Minimalista</option>
            </select>
          </div>

          <div>
            <label htmlFor="target_audience" className={inputLabel}>
              Público-Alvo
            </label>
            <select
              id="target_audience"
              name="target_audience"
              value={formData.target_audience}
              onChange={handleChange}
              className={selectField}
            >
              <option value="">Selecione o público-alvo</option>
              <option value="female">Feminino</option>
              <option value="male">Masculino</option>
              <option value="children">Infantil</option>
              <option value="unisex">Unissex</option>
            </select>
          </div>

          <div>
            <label htmlFor="client_name" className={inputLabel}>
              Nome do Cliente
            </label>
            <input
              type="text"
              id="client_name"
              name="client_name"
              value={formData.client_name}
              onChange={handleChange}
              className={inputField}
            />
          </div>
        </div>

        <div>
          <div className={stoneHeader}>
            <h3 className={stoneTitle}>Pedras</h3>
            <button
              type="button"
              onClick={addStone}
              className={addStoneButton}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar Pedra
            </button>
          </div>

          <div className={stoneSection}>
            {stones.map((stone, index) => (
              <Pedra
                key={index}
                index={index}
                stone={stone}
                onRemove={removeStone}
                onChange={(updatedStone) => handleStoneChange(index, updatedStone)}
                onSave={() => {}} // Placeholder for stone save functionality
              />
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="observations" className={inputLabel}>
            Observações
          </label>
          <textarea
            id="observations"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            rows={4}
            className={textAreaField}
          />
        </div>

        <div className={actionButtonsContainer}>
          <button
            type="button"
            onClick={() => navigate('/search')}
            className={cancelButton}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className={submitButton}
          >
            {loading ? 'Salvando...' : 'Salvar Joia'}
          </button>
        </div>
      </form>
    </div>
  );
}