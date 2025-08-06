import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const BeforeAfterGallery = ({ service }) => {
  const [selectedImage, setSelectedImage] = useState(0);

  const beforeAfterImages = [
    {
      id: 1,
      before: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop",
      after: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
      description: "Hydrating facial treatment results"
    },
    {
      id: 2,
      before: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
      after: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
      description: "Hair treatment transformation"
    },
    {
      id: 3,
      before: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
      after: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop",
      description: "Skin rejuvenation results"
    }
  ];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % beforeAfterImages?.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + beforeAfterImages?.length) % beforeAfterImages?.length);
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <h3 className="text-xl font-heading font-semibold mb-6">Before & After Results</h3>
      <div className="relative">
        {/* Main Image Display */}
        <div className="relative bg-muted rounded-lg overflow-hidden mb-4">
          <div className="grid grid-cols-2 gap-1">
            {/* Before Image */}
            <div className="relative">
              <Image
                src={beforeAfterImages?.[selectedImage]?.before}
                alt="Before treatment"
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
                Before
              </div>
            </div>
            
            {/* After Image */}
            <div className="relative">
              <Image
                src={beforeAfterImages?.[selectedImage]?.after}
                alt="After treatment"
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                After
              </div>
            </div>
          </div>
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth"
          >
            <Icon name="ChevronLeft" size={16} />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-smooth"
          >
            <Icon name="ChevronRight" size={16} />
          </button>
        </div>
        
        {/* Image Description */}
        <p className="text-center text-sm text-muted-foreground mb-4">
          {beforeAfterImages?.[selectedImage]?.description}
        </p>
        
        {/* Thumbnail Navigation */}
        <div className="flex justify-center space-x-2">
          {beforeAfterImages?.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-3 h-3 rounded-full transition-smooth ${
                index === selectedImage
                  ? 'bg-primary' :'bg-muted-foreground/30 hover:bg-muted-foreground/50'
              }`}
            />
          ))}
        </div>
      </div>
      {/* Results Disclaimer */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-muted-foreground mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-sm text-muted-foreground">
              <strong>Results may vary:</strong> Individual results depend on skin/hair type, lifestyle, and adherence to post-treatment care. 
              Images shown are actual client results with their consent. Consult with our professionals for personalized expectations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterGallery;