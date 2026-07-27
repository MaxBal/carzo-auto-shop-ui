import { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import { MobileMenu } from './MobileMenu';
import carzoLogo from '@/assets/carzo-logo-tight.svg';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '56px',
          background: '#000',
          zIndex: 100,
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={carzoLogo}
              alt="Carzo"
              style={{ width: '82px', height: 'auto', objectFit: 'contain' }}
            />
          </Link>

          {/* Desktop navigation */}
          <nav
            className="hidden lg:flex"
            style={{
              gap: '32px',
              alignItems: 'center',
            }}
          >
            <Link
              href="/"
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.92)',
                textDecoration: 'none',
              }}
              className="hover:text-white transition-colors"
            >
              Головна
            </Link>

            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsCatalogOpen(!isCatalogOpen);
                }}
                style={{
                  fontSize: '14px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.92)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: 0,
                }}
              >
                Каталог
                <ChevronDown
                  size={14}
                  style={{
                    transition: 'transform 0.2s',
                    transform: isCatalogOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </button>

              {isCatalogOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    left: 0,
                    background: '#111',
                    border: '1px solid rgba(255,255,255,0.12)',
                    borderRadius: '6px',
                    padding: '6px 0',
                    minWidth: '200px',
                    zIndex: 200,
                  }}
                  onClick={() => setIsCatalogOpen(false)}
                >
                  {['Автокейси', 'Автокилимки', 'Накидки в салон', 'Захист спинки сидіння'].map((item) => (
                    <Link
                      key={item}
                      href="/"
                      style={{
                        display: 'block',
                        padding: '8px 16px',
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.85)',
                        textDecoration: 'none',
                      }}
                      className="hover:bg-white/10 transition-colors"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="#"
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.92)',
                textDecoration: 'none',
              }}
              className="hover:text-white transition-colors"
            >
              B2B
            </Link>
            <Link
              href="#"
              style={{
                fontSize: '14px',
                fontWeight: 400,
                color: 'rgba(255,255,255,0.92)',
                textDecoration: 'none',
              }}
              className="hover:text-white transition-colors"
            >
              Контакти
            </Link>
          </nav>

          {/* Mobile: burger only */}
          <button
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
            }}
            aria-label="Меню"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              stroke="white"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              <line x1="2" y1="5.5" x2="20" y2="5.5" />
              <line x1="2" y1="11" x2="20" y2="11" />
              <line x1="2" y1="16.5" x2="20" y2="16.5" />
            </svg>
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};
