import { Header } from '@/components/Header';
import { ProductSubheader } from '@/components/ProductSubheader';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductOptions } from '@/components/ProductOptions';
import { FeatureSection } from '@/components/FeatureSection';
import bagMain from '@/assets/bag-main.jpg';
import bagSide from '@/assets/bag-side.jpg';
import bagInterior from '@/assets/bag-interior.jpg';
import bagLogo from '@/assets/bag-logo.jpg';

const Bags = () => {
  const productImages = [bagMain, bagSide, bagInterior, bagLogo];

  const product = {
    name: "Сумка з лого Toyota",
    article: "ART.Carzo.M.N.N",
    price: 2090,
    oldPrice: 2600,
    image: bagMain
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

export default Bags;
