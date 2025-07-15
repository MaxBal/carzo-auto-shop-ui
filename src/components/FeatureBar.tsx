import { Truck, CreditCard, RefreshCw, Zap, Camera } from 'lucide-react';

interface FeatureBarProps {
  onDeliveryClick: () => void;
  onPaymentClick: () => void;
  onExchangeClick: () => void;
  onPromoClick: () => void;
  onReviewsClick: () => void;
}

export const FeatureBar = ({
  onDeliveryClick,
  onPaymentClick,
  onExchangeClick,
  onPromoClick,
  onReviewsClick
}: FeatureBarProps) => {
  const features = [
    { icon: Truck, label: 'Доставка', onClick: onDeliveryClick },
    { icon: CreditCard, label: 'Оплата', onClick: onPaymentClick },
    { icon: RefreshCw, label: 'Обмін', onClick: onExchangeClick },
    { icon: Zap, label: 'Акції', onClick: onPromoClick },
    { icon: Camera, label: 'Відгуки', onClick: onReviewsClick }
  ];

  return (
    <div className="flex justify-between md:justify-start md:gap-8 text-center mt-4 overflow-x-auto snap-x px-1">
      {features.map((feature, index) => (
        <button
          key={index}
          onClick={feature.onClick}
          className="flex flex-col items-center gap-1 min-w-[64px] snap-start hover:opacity-70 transition-opacity"
        >
          <feature.icon size={24} className="text-gray-600" />
          <span className="text-xs text-gray-600">{feature.label}</span>
        </button>
      ))}
    </div>
  );
};