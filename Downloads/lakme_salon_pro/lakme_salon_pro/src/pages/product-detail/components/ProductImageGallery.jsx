import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const ProductImageGallery = ({ images, productName }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images?.length) % images?.length);
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  return (
    <div className="space-y-4">
      {/* Main Image Display */}
      <div className="relative bg-surface rounded-lg overflow-hidden">
        <div className="aspect-square relative">
          <Image
            src={images?.[currentImageIndex]}
            alt={`${productName} - Image ${currentImageIndex + 1}`}
            className={`w-full h-full object-cover cursor-pointer transition-transform duration-300 ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            onClick={toggleZoom}
          />
          
          {/* Navigation Arrows */}
          {images?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background transition-smooth"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-background/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground hover:bg-background transition-smooth"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
            </>
          )}

          {/* Zoom Indicator */}
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full p-2">
            <Icon name={isZoomed ? "ZoomOut" : "ZoomIn"} size={16} className="text-foreground" />
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-sm font-medium text-foreground">
              {currentImageIndex + 1} / {images?.length}
            </span>
          </div>
        </div>
      </div>
      {/* Thumbnail Navigation */}
      {images?.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => selectImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-smooth ${
                index === currentImageIndex
                  ? 'border-primary' :'border-border hover:border-muted-foreground'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductImageGallery;