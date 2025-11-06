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
  volume: number | null;
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
    volume: product?.volume || null,
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
        volume: product.volume,
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
      // Preencher rota, cliente e data a partir do arquivo (se possível)
      const { rota, client_name } = parseRotaAndClient(file.name);
      const fileDate = new Date(file.lastModified || Date.now());
      const dateFromImage = fileDate.toISOString().split('T')[0];
      setFormData((prev) => ({
        ...prev,
        ...(rota ? { rota } : {}),
        ...(client_name ? { client_name } : {}),
        ...(!product ? { date: dateFromImage } : {})
      }));
    } catch (error) {
      console.error('Erro ao comprimir imagem:', error);
      // Fallback para arquivo original se compressão falhar
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
      // Mesmo em fallback, tentar preencher rota/cliente/data a partir do arquivo
      const { rota, client_name } = parseRotaAndClient(file.name);
      const fileDate = new Date(file.lastModified || Date.now());
      const dateFromImage = fileDate.toISOString().split('T')[0];
      setFormData((prev) => ({
        ...prev,
        ...(rota ? { rota } : {}),
        ...(client_name ? { client_name } : {}),
        ...(!product ? { date: dateFromImage } : {})
      }));
    }
  };

  // Utilitário: extrai rota (primeiro-numero-segundo-numero) e nome do cliente (texto após parênteses)
  const parseRotaAndClient = (filename: string): { rota: string | null; client_name: string | null } => {
    // remover extensão
    const base = filename.replace(/\.[^.]+$/, '');
    // capturar todos os blocos de dígitos
    const numbers = base.match(/\d+/g) || [];
    const rota = numbers.length >= 2 ? `${numbers[0]}-${numbers[1]}` : null;

    // cliente = tudo após o último parêntese ")"
    const idx = base.lastIndexOf(')');
    const afterParen = idx >= 0 ? base.slice(idx + 1).trim() : '';
    const client_name = afterParen || null;

    return { rota, client_name };
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

  // (Sem upload por pasta) — simplificado conforme solicitado

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Usuário não autenticado');

      // Verificar se já existe uma peça com a mesma rota (apenas para novos registros)
      if (!formData.id && formData.rota) {
        const { data: existingJewelry } = await supabase
          .from('jewelry')
          .select('id')
          .eq('rota', formData.rota)
          .limit(1);

        if (existingJewelry && existingJewelry.length > 0) {
          throw new Error('Já existe uma peça cadastrada com esta rota');
        }
      }

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
    
    // Calcular peso automaticamente quando volume mudar
    if (name === 'volume') {
      const volumeValue = value ? parseFloat(value) : null;
      const calculatedWeight = volumeValue ? Math.round(volumeValue * 0.0155 * 100) / 100 : null;
      
      setFormData((prev) => ({
        ...prev,
        volume: volumeValue,
        weight: calculatedWeight
      }));
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'weight'
          ? value
            ? parseFloat(value)
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
