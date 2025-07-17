export const ServiceBadges = () => {
  const services = ['Доставка', 'Оплата', 'Обмін', 'Акції', 'Відгуки'];

  return (
    <div className="w-full py-8 bg-white">
      <div className="max-w-[1280px] mx-auto px-4">
        {/* Mobile version - single row with smaller circles */}
        <div className="flex justify-center gap-4 md:hidden">
          {services.map((service, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-[#00d5b5] rounded-full flex items-center justify-center group-hover:bg-[#00c2a8] transition-colors duration-200">
                <span className="text-xs font-medium text-white text-center leading-tight">
                  {service}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop version - larger circles with text below */}
        <div className="hidden md:flex justify-center gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="w-20 h-20 bg-[#00d5b5] rounded-full flex items-center justify-center group-hover:bg-[#00c2a8] transition-colors duration-200">
                <span className="text-sm font-medium text-white text-center leading-tight">
                  {service}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};