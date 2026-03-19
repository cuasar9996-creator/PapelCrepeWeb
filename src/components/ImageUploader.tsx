'use client';

import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, RotateCw, ZoomIn, ZoomOut, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { toast } from 'sonner';
import { compressImage } from '@/lib/utils/image-optimization';

export interface UploadedImage {
  id: string;
  dataUrl: string;
  name: string;
  size: number;
  type: string;
  opacity: number;
  rotation: number;
}

interface ImageUploaderProps {
  images: UploadedImage[];
  onImagesChange: (images: UploadedImage[]) => void;
  onInsertImage: (image: UploadedImage) => void;
  maxImages?: number;
  maxSizeMB?: number;
}

export function ImageUploader({
  images,
  onImagesChange,
  onInsertImage,
  maxImages = 10,
  maxSizeMB = 5
}: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    // Validate type
    if (!file.type.startsWith('image/')) {
      toast.error('Solo se permiten archivos de imagen');
      return;
    }

    // Validate size
    if (file.size > maxSizeMB * 1024 * 1024) {
      toast.error(`La imagen debe ser menor a ${maxSizeMB}MB`);
      return;
    }

    // Check max images
    if (images.length >= maxImages) {
      toast.error(`Máximo ${maxImages} imágenes permitidas`);
      return;
    }

    // Read and compress file
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      try {
        const compressedDataUrl = await compressImage(base64, 1080, 1080, 0.85);

        const newImage: UploadedImage = {
          id: Date.now().toString() + Math.random().toString(36).substr(2),
          dataUrl: compressedDataUrl,
          name: file.name,
          size: file.size,
          type: 'image/jpeg',
          opacity: 100,
          rotation: 0,
        };
        onImagesChange([...images, newImage]);
        onInsertImage(newImage); // Auto-insert on upload
        toast.success('Imagen subida correctamente');
      } catch (error) {
        console.error('Error comprimiendo imagen:', error);
        toast.error('Error al procesar la imagen');
      }
    };
    reader.readAsDataURL(file);
  }, [images, maxImages, maxSizeMB, onImagesChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [handleFile]);

  const handleDelete = (id: string) => {
    onImagesChange(images.filter(img => img.id !== id));
    if (selectedImage?.id === id) {
      setSelectedImage(null);
    }
  };

  const handleUpdateImage = (updates: Partial<UploadedImage>) => {
    if (!selectedImage) return;
    
    const updatedImages = images.map(img => 
      img.id === selectedImage.id ? { ...img, ...updates } : img
    );
    onImagesChange(updatedImages);
    setSelectedImage({ ...selectedImage, ...updates });
  };

  return (
    <div className="space-y-4">
      {/* Upload Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        className={`
          relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer
          transition-all duration-200
          ${isDragging 
            ? 'border-rose-400 bg-rose-50' 
            : 'border-gray-200 hover:border-rose-300 hover:bg-gray-50'
          }
        `}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleInputChange}
          className="hidden"
        />
        
        <motion.div
          animate={{ scale: isDragging ? 1.05 : 1 }}
          className="space-y-2"
        >
          <div className={`
            mx-auto w-12 h-12 rounded-full flex items-center justify-center
            ${isDragging ? 'bg-rose-100' : 'bg-gray-100'}
          `}>
            <Upload className={`w-6 h-6 ${isDragging ? 'text-rose-500' : 'text-gray-400'}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">
              {isDragging ? 'Suelta tu imagen aquí' : 'Arrastra una imagen o haz clic'}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              JPG, PNG, WEBP hasta {maxSizeMB}MB
            </p>
          </div>
        </motion.div>
      </div>

      {/* Gallery */}
      {images.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-gray-700">Imágenes subidas ({images.length}/{maxImages})</p>
          
          <div className="grid grid-cols-3 gap-2">
            {images.map((image) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`
                  relative aspect-square rounded-lg overflow-hidden cursor-pointer
                  border-2 transition-all
                  ${selectedImage?.id === image.id 
                    ? 'border-rose-500 ring-2 ring-rose-200' 
                    : 'border-gray-200 hover:border-gray-300'
                  }
                `}
                onClick={() => {
                  setSelectedImage(image);
                  onInsertImage(image); // Auto-insert on click
                }}
              >
                <img
                  src={image.dataUrl}
                  alt={image.name}
                  className="w-full h-full object-cover"
                  style={{
                    opacity: image.opacity / 100,
                    transform: `rotate(${image.rotation}deg)`,
                  }}
                />
                
                {/* Botón de eliminar (canastito) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(image.id);
                  }}
                  className="absolute top-1 right-1 p-1.5 bg-red-500/80 hover:bg-red-600 text-white rounded-lg shadow-lg transition-all z-10"
                  title="Eliminar foto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Image Editor */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border border-gray-200 rounded-xl p-4 space-y-4"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-700">Editar imagen</p>
              <Button
                size="sm"
                onClick={() => onInsertImage(selectedImage)}
                className="bg-gradient-to-r from-rose-500 to-purple-500"
              >
                <ImageIcon className="w-4 h-4 mr-1" />
                Insertar en invitación
              </Button>
            </div>

            {/* Preview */}
            <div className="flex justify-center bg-gray-50 rounded-lg p-4">
              <img
                src={selectedImage.dataUrl}
                alt={selectedImage.name}
                className="max-h-32 object-contain"
                style={{
                  opacity: selectedImage.opacity / 100,
                  transform: `rotate(${selectedImage.rotation}deg)`,
                }}
              />
            </div>

            {/* Opacity */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Opacidad</span>
                <span className="font-medium">{selectedImage.opacity}%</span>
              </div>
              <Slider
                value={[selectedImage.opacity]}
                onValueChange={([value]) => handleUpdateImage({ opacity: value })}
                min={10}
                max={100}
                step={5}
              />
            </div>

            {/* Rotation */}
            <div className="flex items-center justify-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUpdateImage({ rotation: (selectedImage.rotation - 90) % 360 })}
              >
                <RotateCw className="w-4 h-4 mr-1 -scale-x-100" />
                -90°
              </Button>
              <span className="text-sm text-gray-500 w-12 text-center">{selectedImage.rotation}°</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleUpdateImage({ rotation: (selectedImage.rotation + 90) % 360 })}
              >
                <RotateCw className="w-4 h-4 mr-1" />
                +90°
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
