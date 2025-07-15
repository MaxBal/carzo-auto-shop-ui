import { Shield, Zap, Heart, Star } from 'lucide-react';

export const FeatureSection = () => {
  return (
    <>
      {/* Dark Section */}
      <section className="bg-body py-20">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
          <div className="bg-white rounded-xl p-8 flex flex-col lg:flex-row gap-6 items-start">
            <Shield size={32} className="text-brand flex-shrink-0" />
            <div>
              <span className="inline-block bg-brand text-white text-xs px-2 py-0.5 rounded-full mb-2">
                Безпека
              </span>
              <h4 className="font-semibold text-lg">Захист багажника</h4>
              <p className="text-dim text-sm mt-1">
                Міцні матеріали та надійна фіксація захищають ваш автомобіль від пошкоджень
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 flex flex-col lg:flex-row gap-6 items-start">
            <Zap size={32} className="text-brand flex-shrink-0" />
            <div>
              <span className="inline-block bg-brand text-white text-xs px-2 py-0.5 rounded-full mb-2">
                Якість
              </span>
              <h4 className="font-semibold text-lg">Преміум матеріали</h4>
              <p className="text-dim text-sm mt-1">
                Використовуємо тільки найкращі матеріали для максимальної довговічності
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Light Section */}
      <section className="bg-white py-20">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
          <div className="bg-white rounded-xl p-8 flex flex-col lg:flex-row gap-6 items-start border border-gray-100">
            <Heart size={32} className="text-brand flex-shrink-0" />
            <div>
              <span className="inline-block bg-brand text-white text-xs px-2 py-0.5 rounded-full mb-2">
                Комфорт
              </span>
              <h4 className="font-semibold text-lg">Зручність використання</h4>
              <p className="text-dim text-sm mt-1">
                Продуманий дизайн для максимального комфорту щоденного використання
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 flex flex-col lg:flex-row gap-6 items-start border border-gray-100">
            <Star size={32} className="text-brand flex-shrink-0" />
            <div>
              <span className="inline-block bg-brand text-white text-xs px-2 py-0.5 rounded-full mb-2">
                Надійність
              </span>
              <h4 className="font-semibold text-lg">Українське виробництво</h4>
              <p className="text-dim text-sm mt-1">
                Розроблено та виготовлено в Україні з гарантією якості
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};