import { Header } from '@/components/Header';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductOptions } from '@/components/ProductOptions';
import { FeatureSection } from '@/components/FeatureSection';
import productMain from '@/assets/product-main.jpg';
import productSide from '@/assets/product-side.jpg';
import productInterior from '@/assets/product-interior.jpg';
import productLogo from '@/assets/product-logo.jpg';

const Index = () => {
  const productImages = [productMain, productSide, productInterior, productLogo];
  
  const product = {
    name: "Автокейс з лого Toyota",
    article: "M Carzo 1.0",
    price: 2090,
    oldPrice: 2600,
    image: productMain
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-screen-xl mx-auto mt-20 grid grid-cols-12 gap-8 px-4">
        <ProductGallery images={productImages} />
        <ProductOptions product={product} />
      </main>

      <FeatureSection />
    </div>
  );
};

export default Index;
