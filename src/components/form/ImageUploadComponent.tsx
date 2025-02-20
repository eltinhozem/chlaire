import React, { useState } from 'react';
import { PlusCircle, Upload } from 'lucide-react';
import {
  imageUploadContainer,
  imagePreview,
  imageUploadButton
} from './styles';

const ImageUploadComponent = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className={imageUploadContainer}>
      <label htmlFor="image-upload" className={imageUploadButton}>
        {imagePreviewUrl ? (
          <img src={imagePreviewUrl} alt="Preview" className={imagePreview} />
        ) : (
          <Upload className="upload-icon" />
        )}
        <span>{imagePreviewUrl ? 'Trocar Imagem' : 'Adicionar Imagem'}</span>
      </label>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ImageUploadComponent;