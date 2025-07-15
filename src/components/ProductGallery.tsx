import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-[96px_1fr] gap-4">
      {/* Thumbnails - Left side */}
      <div className="flex flex-col gap-2 order-2 md:order-1">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setActiveImageIndex(index)}
            className={`w-16 h-16 rounded-xl overflow-hidden shadow-sm border-2 transition-colors ${
              index === activeImageIndex ? 'border-teal-400' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <img
              src={image}
              alt={`Продукт ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image - Right side / Mobile */}
      <div className="order-1 md:order-2">
        <div className="snap-x overflow-x-auto scroll-smooth md:overflow-hidden">
          <div className="flex md:block">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Продукт ${index + 1}`}
                className={`aspect-square w-full h-full object-cover rounded-2xl flex-shrink-0 snap-start ${
                  index === activeImageIndex ? 'block' : 'hidden md:hidden'
                } ${index === activeImageIndex ? 'md:block' : ''}`}
                style={{ display: index === activeImageIndex ? 'block' : 'none' }}
              />
            ))}
            {/* Mobile slider */}
            <div className="flex md:hidden">
              {images.map((image, index) => (
                <img
                  key={`mobile-${index}`}
                  src={image}
                  alt={`Продукт ${index + 1}`}
                  className="aspect-square w-full h-full object-cover rounded-2xl flex-shrink-0 snap-start min-w-full"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};