import React from "react";
import { Instagram, Instagram as Telegram, Youtube, Facebook, Send, Phone } from "lucide-react";

const paymentIcons = {
  // Мини SVG без внешних ассетов
  visa: (
    <svg aria-label="VISA" viewBox="0 0 48 16" className="h-6 w-auto">
      <rect width="48" height="16" rx="3" className="fill-white/10" />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" className="fill-white font-semibold" fontSize="8">VISA</text>
    </svg>
  ),
  mc: (
    <svg aria-label="Mastercard" viewBox="0 0 48 16" className="h-6 w-auto">
      <rect width="48" height="16" rx="3" className="fill-white/10" />
      <circle cx="20" cy="8" r="5" className="fill-white/60" />
      <circle cx="28" cy="8" r="5" className="fill-white/30" />
    </svg>
  ),
};

export function Footer() {
  console.log("Footer component is attempting to render!");
  return (
    <footer className="w-full bg-black text-white/90">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Верхняя сетка */}
        <div className="grid gap-8 md:grid-cols-4">
          {/* 1. Каталог */}
          <nav aria-labelledby="catalog" className="space-y-3">
            <h3 id="catalog" className="text-xl font-semibold text-white">Каталог</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="/catalog/autocases" className="hover:text-white">Автокейси</a></li>
              <li><a href="/catalog/covers" className="hover:text-white">Накидки в салон</a></li>
              <li><a href="/catalog/back-protect" className="hover:text-white">Накидки для захисту спинки</a></li>
            </ul>
          </nav>

          {/* 2. Покупцеві */}
          <nav aria-labelledby="buyers" className="space-y-3">
            <h3 id="buyers" className="text-xl font-semibold text-white">Покупцеві</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="/about" className="hover:text-white">Про нас</a></li>
              <li><a href="/delivery" className="hover:text-white">Доставка</a></li>
              <li><a href="/payment" className="hover:text-white">Оплата</a></li>
              <li><a href="/returns" className="hover:text-white">Обмін та повернення</a></li>
            </ul>
          </nav>

          {/* 3. Carzo bonus */}
          <nav aria-labelledby="carzo-bonus" className="space-y-3">
            <h3 id="carzo-bonus" className="text-xl font-semibold text-white">Carzo bonus</h3>
            <ul className="space-y-2 text-white/80">
              <li><a href="/bonus/deals" className="hover:text-white">Акція "Разом дешевше"</a></li>
              <li><a href="/bonus/program" className="hover:text-white">Клієнтська програма</a></li>
            </ul>
          </nav>

          {/* 4. Гаряча лінія + підписка */}
          <div className="space-y-6">
            <div aria-labelledby="hotline" className="space-y-1">
              <h3 id="hotline" className="text-sm uppercase tracking-wide text-white/70">Гаряча лінія</h3>
              <div className="flex items-center gap-2 text-2xl font-semibold">
                <Phone className="h-5 w-5 text-white/70" />
                <a href="tel:+380661031094" className="hover:text-white">+380 66 103 10 94</a>
              </div>
              <p className="text-white/70">Щоденно з 10:00 до 20:00</p>
            </div>

            <div className="space-y-2">
              <div className="text-white/70">Приймаємо до сплати</div>
              <div className="flex items-center gap-3">{paymentIcons.mc}{paymentIcons.visa}</div>
            </div>

            <form className="mt-4" action="/api/subscribe" method="post" aria-labelledby="subscribe">
              <label id="subscribe" className="sr-only">Підписатись на новини</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  name="email"
                  placeholder="Ваша Email"
                  required
                  className="w-full rounded-2xl bg-white/5 px-4 py-3 text-white placeholder:text-white/40 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-white/30"
                />
                <button
                  type="submit"
                  className="rounded-2xl border border-white/40 px-4 py-3 hover:bg-white/10 transition"
                  aria-label="Надіслати"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Разделители */}
        <div className="mt-10 border-t border-white/10" />

        {/* Нижняя строка: соц + reCAPTCHA */}
        <div className="mt-6 flex flex-col-reverse items-start justify-between gap-6 md:flex-row md:items-center">
          <p className="text-sm text-white/50">
            Цей сайт захищений reCAPTCHA та Google.
            <span className="ml-2">
              <a className="underline hover:text-white/80" href="/privacy">Політика конфіденційності</a>
              {" "}та{" "}
              <a className="underline hover:text-white/80" href="/terms">Умови обслуговування</a>
            </span>
          </p>

          <div className="flex items-center gap-3">
            <a aria-label="Facebook" href="https://facebook.com" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Facebook className="h-5 w-5" /></a>
            <a aria-label="Instagram" href="https://instagram.com" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Instagram className="h-5 w-5" /></a>
            <a aria-label="YouTube" href="https://youtube.com" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Youtube className="h-5 w-5" /></a>
            <a aria-label="Telegram" href="https://t.me" className="rounded-full bg-white/10 p-2 hover:bg-white/20"><Telegram className="h-5 w-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;