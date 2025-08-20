import React from "react";
import { Instagram, Youtube, Facebook, Send, Phone } from "lucide-react";

const paymentIcons = {
  // Мини SVG без внешних ассетов
  visa: (
    <svg aria-label="VISA" viewBox="0 0 48 16" className="h-6 w-auto">
      <rect width="48" height="16" rx="3" className="fill-gray-600" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-white font-semibold" fontSize="8">VISA</text>
    </svg>
  ),
  mc: (
    <svg aria-label="Mastercard" viewBox="0 0 48 16" className="h-6 w-auto">
      <rect width="48" height="16" rx="3" className="fill-gray-600" />
      <circle cx="20" cy="8" r="5" className="fill-white/60" />
      <circle cx="28" cy="8" r="5" className="fill-white/30" />
    </svg>
  ),
};

export function Footer() {
  return (
    <footer className="w-full bg-[#181818] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Основная сетка */}
        <div className="grid gap-8 md:grid-cols-5">
          {/* 1. Про нас */}
          <nav aria-labelledby="about" className="space-y-3">
            <h3 id="about" className="text-lg font-semibold text-white">Про нас</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about/company" className="hover:text-white transition-colors">Про компанію</a></li>
              <li><a href="/about/brocard" className="hover:text-white transition-colors">Обіцянки BROCARD</a></li>
              <li><a href="/about/stores" className="hover:text-white transition-colors">Магазини BROCARD</a></li>
              <li><a href="/about/online" className="hover:text-white transition-colors">Інтернет-магазин BROCARD.UA</a></li>
              <li><a href="/about/original" className="hover:text-white transition-colors">#КупуйОРИГІНАЛ</a></li>
              <li><a href="/contacts" className="hover:text-white transition-colors">Контакти</a></li>
            </ul>
          </nav>

          {/* 2. Допомога */}
          <nav aria-labelledby="help" className="space-y-3">
            <h3 id="help" className="text-lg font-semibold text-white">Допомога</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/help/delivery" className="hover:text-white transition-colors">Доставка</a></li>
              <li><a href="/help/payment" className="hover:text-white transition-colors">Оплата</a></li>
              <li><a href="/help/conditions" className="hover:text-white transition-colors">Умови продажу</a></li>
              <li><a href="/help/exchange" className="hover:text-white transition-colors">Обмін і повернення</a></li>
              <li><a href="/help/questions" className="hover:text-white transition-colors">Питання та відповіді</a></li>
              <li><a href="/help/sitemap" className="hover:text-white transition-colors">Мапа сайту</a></li>
            </ul>
          </nav>

          {/* 3. Для вас */}
          <nav aria-labelledby="for-you" className="space-y-3">
            <h3 id="for-you" className="text-lg font-semibold text-white">Для вас</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/programs/discount" className="hover:text-white transition-colors">Дисконтна програма</a></li>
              <li><a href="/programs/referral" className="hover:text-white transition-colors">Реферальна програма</a></li>
              <li><a href="/programs/gift-cards" className="hover:text-white transition-colors">Подарункові картки</a></li>
              <li><a href="/programs/perfume" className="hover:text-white transition-colors">Нішева парфумерія</a></li>
              <li><a href="/programs/certificates" className="hover:text-white transition-colors">Електронні сертифікати</a></li>
              <li><a href="/news" className="hover:text-white transition-colors">Новини</a></li>
              <li><a href="/expert" className="hover:text-white transition-colors">Б'юті експерт</a></li>
            </ul>
          </nav>

          {/* 4. Гаряча лінія */}
          <div className="space-y-4">
            <div aria-labelledby="hotline" className="space-y-2">
              <h3 id="hotline" className="text-lg font-semibold text-white">Гаряча лінія</h3>
              <div className="text-2xl font-bold text-white">
                <a href="tel:0800508880" className="hover:text-gray-300 transition-colors">0 800 508 880</a>
              </div>
              <p className="text-gray-300 text-sm">Щоденно з 9:00 до 22:00</p>
            </div>

            <div className="space-y-3">
              <div className="text-gray-300 text-sm">Приймаємо до сплати</div>
              <div className="flex items-center gap-3">{paymentIcons.mc}{paymentIcons.visa}</div>
            </div>
          </div>

          {/* 5. Підписатися на розсилку */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Підписатися на розсилку</h3>
            
            <form className="space-y-3" action="/api/subscribe" method="post" aria-labelledby="subscribe">
              <label htmlFor="email-input" className="sr-only">Підписатись на новини</label>
              <div className="relative">
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  placeholder="Електронна адреса"
                  required
                  className="w-full rounded-lg bg-gray-700 px-4 py-3 text-white placeholder:text-gray-400 outline-none border border-gray-600 focus:border-gray-400 transition-colors"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Надіслати"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>

            <div className="space-y-3">
              <div className="text-gray-300 text-sm">Приєднатися до нас</div>
              <div className="flex items-center gap-3">
                <a aria-label="Facebook" href="https://facebook.com" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a aria-label="Instagram" href="https://instagram.com" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a aria-label="YouTube" href="https://youtube.com" className="text-gray-400 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
                <a aria-label="Telegram" href="https://t.me" className="text-gray-400 hover:text-white transition-colors">
                  <Send className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-gray-300 text-sm">Мобільний застосунок</div>
              <div className="flex flex-col gap-2">
                <a href="#" className="inline-block">
                  <div className="bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg px-3 py-2 text-xs text-white">
                    Google Play
                  </div>
                </a>
                <a href="#" className="inline-block">
                  <div className="bg-gray-700 hover:bg-gray-600 transition-colors rounded-lg px-3 py-2 text-xs text-white">
                    App Store
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя строка */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="text-center text-sm text-gray-400">
            Цей сайт захищений reCAPTCHA та Google.{" "}
            <a className="underline hover:text-gray-300 transition-colors" href="/privacy">Політика конфіденційності</a>
            {" "}та{" "}
            <a className="underline hover:text-gray-300 transition-colors" href="/terms">Умови обслуговування</a>
          </div>
          <div className="text-center text-xs text-gray-500 mt-2">
            © ТОВ «Брокард-Україна», 1997 м. Київ, вул. Кирилівська, 134-А
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;