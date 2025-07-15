import ProductGallery   from '@/components/ProductGallery'
import ProductOptions   from '@/pages/Product/ProductOptions'

const images=[
  '/img/auto1.jpg','/img/auto2.jpg','/img/auto3.jpg',
  '/img/auto4.jpg','/img/auto5.jpg'
]

export default function ProductPage(){
  return(
    <main className='container mx-auto py-12 flex flex-col lg:flex-row gap-10'>
      <ProductGallery images={images}/>
      <ProductOptions/>
    </main>
  )
}