import { Truck, CreditCard, RefreshCw, Tag, Star } from 'lucide-react';

export const ServiceBadges = () => {
  const services = [
    { icon: Truck, label: 'Доставка' },
    { icon: CreditCard, label: 'Оплата' },
    { icon: RefreshCw, label: 'Обмін' },
    { icon: Tag, label: 'Акції' },
    { icon: Star, label: 'Відгуки' }
  ];

  return (
    <div className="w-full py-12 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index}
                className="flex flex-col items-center gap-3 group cursor-pointer"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-[#00d5b5] rounded-full flex items-center justify-center group-hover:bg-[#00c2a8] transition-colors duration-200">
                  <Icon className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <span className="text-sm md:text-base font-medium text-gray-800 group-hover:text-[#00d5b5] transition-colors duration-200">
                  {service.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};