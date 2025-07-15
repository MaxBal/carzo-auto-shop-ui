import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <>
      {/* Desktop Gallery */}
      <div className="hidden lg:block col-span-5">
        <div className="flex gap-4">
          {/* Thumbnails */}
          <div className="flex flex-col gap-4">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-16 h-16 rounded-lg overflow-hidden ${
                  index === activeImageIndex ? 'ring-2 ring-brand' : ''
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

          {/* Main image */}
          <div className="flex-1">
            <img
              src={images[activeImageIndex]}
              alt="Основне зображення продукту"
              className="w-full aspect-square object-cover rounded-xl shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Mobile Gallery */}
      <div className="lg:hidden">
        <div className="relative overflow-x-auto snap-x snap-mandatory">
          <div className="flex">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Продукт ${index + 1}`}
                className="min-w-full aspect-square object-cover snap-start"
              />
            ))}
          </div>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === activeImageIndex ? 'bg-brand' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};