import materialsImg from '@assets/photo (1)_1752773566279.jpg';
import magneticImg from '@assets/IMG_5902_1752773566287.jpg';
import handlesImg from '@assets/_230903_1752773566287.jpg';
import edgingImg from '@assets/IMG_5903_1752773566288.jpg';

export const FeatureSection = () => {
  const features = [
    {
      image: materialsImg,
      title: "Основні матеріали",
      subtitle: "Автомобільна еко-шкірка",
      description: "Основним матеріалом автокейсу являється преміальна автомобільна еко-шкіра німецького виробництва, максимальна стійка до механічних пошкоджень.",
      additionalInfo: {
        title: "Міцний корпус",
        text: "Корпус виготовлений з італьянського кожкартону, завдяки чому кейс буде зберігати форму довгі роки."
      }
    },
    {
      image: magneticImg,
      title: "Магнітна система",
      subtitle: "Функціональність та зручність",
      description: "З легкістю відкривайте кришку кейсу однією рукою завдяки спеціальній магнітній системі фіксації.",
      additionalInfo: {
        title: "Магніти чи ліпучка?",
        text: "Окрім функціональності про яку зазначено вище, магніти мають перевагу над ліпучкою в наступних аспектах:",
        list: [
          "В порівнянні з магнітами, ліпучка будь-якої якості має обмежений термін експлуатації, тобто функція зщеплення кришки кейсу поступово буде погіршуватись.",
          "Заміна ліпучки на кришці кейсу являється досить проблемним питанням по причині трудомісткої технології відшивання.",
          "Окрім цього, на відміну від магнітів, багаторазове використання ліпучки впливає на її естетичний вигляд."
        ]
      }
    },
    {
      image: handlesImg,
      title: "Ручки автокейсу",
      subtitle: "Надійність та довговічність",
      description: "Ручки на кейсах прошиті армованою ниткою, укріплені від зносу, кріпляться до кейсу заклепками. На наших кейсах фурнітура високої якості, що являється ще однією характерною відмінністю від інших виробників."
    },
    {
      image: edgingImg,
      title: "Якісна окантовка",
      subtitle: "Естетична складова",
      description: "Окантовка кейсу виконана з преміум еко-шкіри. В свою чергу хочемо зазначити, що основна більшість виробників для полегшення процесу виготовлення автокейсу, використовує в якості окантовки тканину, що в свою чергу значно погіршує естетичний вигляд виробу.",
      additionalInfo: {
        title: "Порівняння для більшого розуміння",
        text: "\"Окантовка з тканини на автокейсах з еко-шкіри - це як одягнути класичні туфлі під спортивні штани\""
      }
    }
  ];

  return (
    <div className="py-16 mt-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-16">
          {features.map((feature, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-8 lg:gap-12`}>
              {/* Image */}
              <div className="w-full lg:w-1/2">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                  <img 
                    src={feature.image} 
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="w-full lg:w-1/2 space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                  <div className="inline-block bg-[#00d5b5] text-white text-sm px-3 py-1 rounded-full mb-4">
                    {feature.subtitle}
                  </div>
                  <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
                
                {feature.additionalInfo && (
                  <div className="bg-[#181818] rounded-lg p-6 shadow-sm border border-gray-800">
                    <h5 className="font-semibold text-white mb-3">{feature.additionalInfo.title}</h5>
                    <p className="text-gray-300 leading-relaxed mb-3">{feature.additionalInfo.text}</p>
                    
                    {feature.additionalInfo.list && (
                      <ul className="space-y-2">
                        {feature.additionalInfo.list.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-400 flex items-start">
                            <span className="w-2 h-2 bg-[#00d5b5] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Signature */}
        <div className="text-center mt-16 pt-8 border-t border-gray-800">
          <p className="text-gray-400 italic">З повагою, команда Carzo</p>
        </div>
      </div>
    </div>
  );
};