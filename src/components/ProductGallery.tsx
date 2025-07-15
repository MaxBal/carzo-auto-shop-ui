'use client'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

export default function ProductGallery({ images }: { images:string[] }){
  const [active,setActive]=useState(0)
  return(
    <section className='flex gap-6'>
      <ul className='flex flex-col gap-3 max-h-[640px] overflow-y-auto scrollbar-thin'>
        {images.map((src,i)=>(
          <li key={src}>
            <button onClick={()=>setActive(i)}
              className={cn(
                'block w-16 h-16 overflow-hidden rounded-lg border-2 transition-transform',
                active===i ? 'border-brand scale-105' : 'border-transparent hover:scale-105')}>
              <img src={src} alt='' className='h-full w-full object-cover'/>
            </button>
          </li>
        ))}
      </ul>
      <div className='flex-1 aspect-square overflow-hidden rounded-2xl'>
        <img src={images[active]} alt='' className='w-full h-full object-cover'/>
      </div>
    </section>
  )
}