import { Header } from '@/components/Header';
import { ProductSubheader } from '@/components/ProductSubheader';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductOptions } from '@/components/ProductOptions';
import { FeatureSection } from '@/components/FeatureSection';
import productMain from '@/assets/amg-bag.png';
import productSide from '@/assets/product-side.jpg';
import productInterior from '@/assets/product-interior.jpg';
import productLogo from '@/assets/product-logo.jpg';

const Index = () => {
  const productImages = [productSide, productMain, productInterior, productLogo];

  const product = {
    name: "Автокейс з лого Toyota",
    article: "M Carzo 1.0",
    price: 2090,
    oldPrice: 2600,
    image: productMain
  };

  return (
    <div className="min-h-screen bg-background" style={{ display: 'flex', flexDirection: 'column' }}>
      <Header />

      {/* Spacer to push content below the fixed header */}
      <div style={{ height: '56px', flexShrink: 0 }} />

      <ProductSubheader />

      <main className="max-w-[1280px] mx-auto w-full grid grid-cols-12 md:gap-8 px-4 md:px-4 mt-0 pt-4 md:pt-6">
        <ProductGallery images={productImages} />
        <ProductOptions product={product} />
      </main>

      <FeatureSection />
    </div>
  );
};

export default Index;
