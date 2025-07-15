import React, { useState } from 'react'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Tabs'
import { RadioGroup, RadioItem }       from '@/components/ui/RadioGroup'
import { Switch }                      from '@/components/ui/Switch'
import { buildSku }                    from '@/utils/buildSku'

type Design='Carzo 1.0'|'Carzo 2.0'|'Carzo 3.0'|'Carzo 4.0'
type Color='black'|'black-silver'|'black-blue'|'black-red'|'brown'|'beige'
type Logo='без лого'|'латунь'|'нержавіюча'
type Fix='без фіксації'|'дно'|'стіна'|'дно+стіна'

export default function ProductOptions(){
  const [design,setDesign]=useState<Design>('Carzo 1.0')
  const [size,setSize]=useState<'M'|'L'|'XL'>('M')
  const [color,setColor]=useState<Color>('black')
  const [logo,setLogo]=useState<Logo>('без лого')
  const [fix,setFix]=useState<Fix>('без фіксації')

  const sku=buildSku({size,design,color,logo,fix})

  return(
    <aside className='rounded-2xl border border-gray-100 shadow-sm p-8 flex flex-col gap-6'>
      <header className='flex flex-col gap-1'>
        <h1 className='text-heading-1 font-semibold'>Автокейс з&nbsp;лого&nbsp;Toyota</h1>
        <p className='text-xs tracking-tight text-gray-500'>{sku}</p>
        <div className='flex items-baseline gap-3'>
          <span className='text-2xl font-semibold'>2090 ₴</span>
          <span className='line-through text-gray-500'>2600 ₴</span>
        </div>
      </header>

      <Tabs defaultValue='designs' className='flex flex-col gap-6'>
        <TabsList>
          <TabsTrigger value='designs'>Дизайни</TabsTrigger>
          <TabsTrigger value='sizes'>Розміри</TabsTrigger>
          <TabsTrigger value='logo'>Лого</TabsTrigger>
          <TabsTrigger value='fix'>Фіксація</TabsTrigger>
        </TabsList>

        {/* designs */}
        <div data-state='designs' className='grid grid-cols-2 gap-4'>
          {(['Carzo 1.0','Carzo 2.0','Carzo 3.0','Carzo 4.0'] as Design[]).map(d=>(
            <button key={d}
              onClick={()=>setDesign(d)}
              className={`border-2 rounded-xl p-4 text-left text-sm font-medium
                  ${design===d?'border-brand text-brand':'border-gray-300 text-gray-900'}`}>
              {d}
              <div className='text-xs text-gray-500'>{d==='Carzo 1.0'?'6 кольорів':'1 колір'}</div>
            </button>
          ))}
        </div>

        {/* sizes */}
        <RadioGroup value={size} onValueChange={v=>setSize(v as any)}
          className='grid grid-cols-3 gap-4'>
          {['M','L','XL'].map(s=>(
            <RadioItem key={s} value={s} label={s}/>
          ))}
        </RadioGroup>

        {/* logo */}
        <RadioGroup value={logo} onValueChange={v=>setLogo(v as any)}
          className='grid grid-cols-3 gap-4'>
          {['без лого','латунь','нержавіюча'].map(l=>(
            <RadioItem key={l} value={l} label={l}/>
          ))}
        </RadioGroup>

        {/* fixation */}
        <div className='pl-4 border-l-2 border-gray-100 flex flex-col gap-4'>
          {(['без фіксації','дно','стіна','дно+стіна'] as Fix[]).map(f=>(
            <label key={f} className='flex items-center gap-3 text-sm font-medium'>
              <input type='radio'
                     checked={fix===f}
                     onChange={()=>setFix(f)}
                     className='h-4 w-4 rounded-full border-2 border-gray-300
                                checked:border-brand checked:bg-brand'/>
              {f}
            </label>
          ))}
        </div>
      </Tabs>

      <button className='w-full flex items-center justify-center gap-2 py-3 bg-black hover:bg-gray-900 text-white rounded-full text-body font-medium'>
        <svg width='20' height='20' fill='none' stroke='currentColor' strokeWidth='2'>
          <path d='M6 6h13l-1.5 9h-11L4 4H1'/><circle cx='8' cy='18' r='2'/><circle cx='17' cy='18' r='2'/>
        </svg>
        Купити&nbsp;2090 ₴
      </button>
    </aside>
  )
}