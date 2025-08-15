import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';
import { getNextReference } from './styles';
import { Stone } from '../pedra/types';
import { compressImage } from '../../lib/imageUtils';

interface JewelryFormData {
  id?: string;
  reference_name: string;
  category: string;
  target_audience: string;
  client_name: string;
  size: string;
  rota: string;
  stl: string;
  version: number | null;
  weight: number | null;
  designer: string;
  material: string;
  finish: string;
  date: string;
  observations: string;
  descricao: string;
  stones: Stone[];
  image_url?: string;
}

export const useFormLogic = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [loading, setLoading] = useState(false);
  const [stones, setStones] = useState<Stone[]>(product?.stones || []);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(
    product?.image_url || ''
  );

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
  });

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
      });
      setStones(product.stones || []);
      setImagePreviewUrl(product.image_url || '');
    }
  }, [product]);

  const handleImageChange = async (file: File) => {
    try {
      // Comprimir imagem antes de salvar
      const compressedFile = await compressImage(file, {
        maxWidth: 800,
        maxHeight: 600,
        quality: 0.8,
        format: 'jpeg'
      });
      
      setImageFile(compressedFile);
      setImagePreviewUrl(URL.createObjectURL(compressedFile));
    } catch (error) {
      console.error('Erro ao comprimir imagem:', error);
      // Fallback para arquivo original se compressão falhar
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
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Usuário não autenticado');

      let image_url = formData.image_url;
      if (imageFile) {
        image_url = await uploadImage(imageFile);
      }

      const payload: any = {
        ...formData,
        stones,
        image_url,
        user_id: user.id
      };

      if (!payload.id) {
        delete payload.id;
      }

      const { data, error } = await supabase
        .from('jewelry')
        .upsert([payload])
        .select();

      if (error) throw error;

      if (data && data[0]) {
        navigate('/info', { state: { product: data[0] } });
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
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
    }));
  
    if (name === 'category' && value) {
      const newRef = await getNextReference(value, supabase);
      setFormData((prev) => ({
        ...prev,
        reference_name: newRef,
        category: value
      }));
    }
  };

  const addStone = () => {
    setStones([
      ...stones,
      {
        stone_type: '',
        cut: 'Redonda',
        quantity: 1
      }
    ]);
  };

  const removeStone = (index: number) => {
    setStones(stones.filter((_, i) => i !== index));
  };

  const handleStoneChange = (index: number, updatedStone: Stone) => {
    const updatedStones = [...stones];
    updatedStones[index] = updatedStone;
    setStones(updatedStones);
  };

  return {
    formData,
    stones,
    loading,
    imagePreviewUrl,
    handleChange,
    handleSubmit,
    handleImageChange,
    addStone,
    removeStone,
    handleStoneChange,
    isEditing: !!product
  };
};
