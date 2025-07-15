'use client'
import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

export const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref)=>(
  <SwitchPrimitives.Root
    ref={ref}
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent',
      'focus:ring-2 focus:ring-brand focus:ring-offset-2',
      'data-[state=checked]:bg-brand data-[state=unchecked]:bg-gray-300',
      className
    )}
    {...props}
  >
    <SwitchPrimitives.Thumb
      className='pointer-events-none block h-5 w-5 rounded-full bg-white shadow
                 transition-transform data-[state=checked]:translate-x-5'
    />
  </SwitchPrimitives.Root>
))
Switch.displayName='Switch'