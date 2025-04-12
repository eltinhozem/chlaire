
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { ImageUploadContainer, ImagePreview, ImageUploadButton } from '../styles';

interface ImageUploadProps {
  imagePreviewUrl: string;
  onImageChange: (file: File) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ imagePreviewUrl, onImageChange }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageChange(e.target.files[0]);
    }
  };

  return (
    <ImageUploadContainer>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </ImageUploadButton>
      </div>
    </ImageUploadContainer>
  );
};

export default ImageUpload;
