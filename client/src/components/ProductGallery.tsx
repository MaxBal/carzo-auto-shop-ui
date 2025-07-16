
import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
}

export const ProductGallery = ({ images }: ProductGalleryProps) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <>
      {/* Desktop Gallery */}
      <div className="hidden md:block col-span-7">
        <div className="flex gap-8">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`w-16 h-16 aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                  index === activeImageIndex ? 'border-[#00D1B3]' : 'border-gray-200'
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
              className="w-full aspect-square object-cover rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            />
          </div>
        </div>
      </div>

      {/* Mobile Gallery */}
      <div className="md:hidden col-span-12 -mx-4">
        <div 
          className="relative overflow-x-auto snap-x snap-mandatory w-screen"
          onScroll={(e) => {
            const scrollLeft = e.currentTarget.scrollLeft;
            const itemWidth = e.currentTarget.scrollWidth / images.length;
            const newIndex = Math.round(scrollLeft / itemWidth);
            setActiveImageIndex(newIndex);
          }}
        >
          <div className="flex">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Продукт ${index + 1}`}
                className="min-w-full aspect-square object-cover snap-start"
                onLoad={() => index === 0 && setActiveImageIndex(0)}
              />
            ))}
          </div>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === activeImageIndex ? 'bg-cyan-400 scale-125' : 'bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
