'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

interface GalleryProps {
  images: string[]
}

export default function ProductGallery({ images }: GalleryProps) {
  const [active, setActive] = useState(0)

  return (
    <section className='flex gap-6'>
      {/* thumbs */}
      <ul className='flex flex-col gap-3 max-h-[640px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300'>
        {images.map((src, i) => (
          <li key={src}>
            <button
              onClick={() => setActive(i)}
              className={cn(
                'block w-16 h-16 rounded-lg overflow-hidden',
                'border-2 transition-transform duration-150',
                active === i
                  ? 'border-brand scale-105'
                  : 'border-transparent hover:scale-105'
              )}
            >
              <img
                src={src}
                alt=''
                className='h-full w-full object-cover'
              />
            </button>
          </li>
        ))}
      </ul>

      {/* main */}
      <div className='flex-1 aspect-square rounded-2xl overflow-hidden'>
        <img
          src={images[active]}
          alt=''
          className='w-full h-full object-cover'
        />
      </div>
    </section>
  )
}