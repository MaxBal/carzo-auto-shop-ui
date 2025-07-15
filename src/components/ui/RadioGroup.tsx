'use client'
import * as React from 'react'
import * as RadioPrimitives from '@radix-ui/react-radio-group'
import { cn } from '@/lib/utils'

export const RadioGroup = RadioPrimitives.Root

export const RadioItem = React.forwardRef<
  React.ElementRef<typeof RadioPrimitives.Item>,
  React.ComponentPropsWithoutRef<typeof RadioPrimitives.Item> & { label:string }
>(({ className,label, ...props }, ref)=>(
  <label className='flex items-center gap-2'>
    <RadioPrimitives.Item
      ref={ref}
      className={cn(
        'h-4 w-4 shrink-0 rounded-full border-2 border-gray-300 bg-white '+
        'data-[state=checked]:border-brand data-[state=checked]:bg-brand '+
        'focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2',
        className
      )}
      {...props}
    >
      <RadioPrimitives.Indicator className='flex items-center justify-center'>
        <svg className='h-2.5 w-2.5 fill-white' viewBox='0 0 8 8'>
          <circle cx='4' cy='4' r='3'/>
        </svg>
      </RadioPrimitives.Indicator>
    </RadioPrimitives.Item>
    <span className='text-sm font-medium'>{label}</span>
  </label>
))
RadioItem.displayName='RadioItem'