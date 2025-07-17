import { Header } from '@/components/Header';
import { ProductGallery } from '@/components/ProductGallery';
import { ProductOptions } from '@/components/ProductOptions';
import { ServiceBadges } from '@/components/ServiceBadges';
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-[1280px] mx-auto md:mt-20 grid grid-cols-12 md:gap-8 px-4 md:px-6">
        <ProductGallery images={productImages} />
        <ProductOptions product={product} />
      </main>

      <ServiceBadges />
      <FeatureSection />
    </div>
  );
};

export default Bags;