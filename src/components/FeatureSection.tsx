import { Shield, Zap, Heart, Star } from 'lucide-react';

export const FeatureSection = () => {
  const features = [
    {
      icon: Shield,
      badge: 'Безпека',
      title: 'Захист багажника',
      description: 'Міцні матеріали та надійна фіксація захищають ваш автомобіль від пошкоджень'
    },
    {
      icon: Zap,
      badge: 'Якість',
      title: 'Преміум матеріали',
      description: 'Використовуємо тільки найкращі матеріали для максимальної довговічності'
    },
    {
      icon: Heart,
      badge: 'Комфорт',
      title: 'Зручність використання',
      description: 'Продуманий дизайн для максимального комфорту щоденного використання'
    },
    {
      icon: Star,
      badge: 'Надійність',
      title: 'Українське виробництво',
      description: 'Розроблено та виготовлено в Україні з гарантією якості'
    }
  ];

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="rounded-3xl bg-gray-800 p-6 shadow-lg relative">
              <div className="text-xs font-semibold bg-teal-600/10 text-teal-400 rounded-full px-3 py-0.5 mb-3 inline-block">
                {feature.badge}
              </div>
              
              <div className="flex items-start gap-4">
                <feature.icon size={32} className="text-teal-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-300">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};