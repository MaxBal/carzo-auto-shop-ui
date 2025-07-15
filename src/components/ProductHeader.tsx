import { buildSku } from '@/utils/sku';

interface ProductHeaderProps {
  name: string;
  price: number;
  oldPrice?: number;
  size: string;
  designName: string;
  designVersion: string;
  logoMaterial: string;
  fixVariant: string;
}

export const ProductHeader = ({ 
  name, 
  price, 
  oldPrice, 
  size, 
  designName, 
  designVersion, 
  logoMaterial, 
  fixVariant 
}: ProductHeaderProps) => {
  const sku = buildSku({ size, designName, designVersion, logoMaterial, fixVariant });

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-semibold leading-tight tracking-tight">
        {name}
      </h1>
      
      <p className="text-xs text-gray-500 tracking-tight mt-1">
        {sku}
      </p>

      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-2xl font-semibold">{price} ₴</span>
        {oldPrice && (
          <span className="text-lg line-through text-gray-400">{oldPrice} ₴</span>
        )}
      </div>
    </div>
  );
};