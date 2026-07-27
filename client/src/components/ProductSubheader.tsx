import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CarIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: size, height: size, flexShrink: 0 }}
  >
    <rect width="18" height="18" rx="4" fill="#e02020" />
    <path
      d="M3.5 11.5h11M4.5 11.5l1.2-3.5h6.6l1.2 3.5"
      stroke="white"
      strokeWidth="1.3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="6" cy="12.5" r="1" fill="white" />
    <circle cx="12" cy="12.5" r="1" fill="white" />
  </svg>
);

// Main header is exactly 56px. Subheader sticks only after header scrolls out.
const HEADER_HEIGHT = 56;
const SUBHEADER_HEIGHT_DESKTOP = 48;
const SUBHEADER_HEIGHT_MOBILE = 44;

export const ProductSubheader = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setSticky(window.scrollY >= HEADER_HEIGHT);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const baseStyle: React.CSSProperties = {
    background: '#181818',
    width: '100%',
    borderTop: '1px solid rgba(255,255,255,0.03)',
    borderBottom: '1px solid rgba(255,255,255,0.03)',
    paddingLeft: '16px',
    paddingRight: '16px',
    display: 'flex',
    alignItems: 'center',
    zIndex: 90,
    boxSizing: 'border-box',
  };

  return (
    <>
      {/* The actual subheader — in flow initially, fixed when sticky */}
      <div
        style={{
          ...baseStyle,
          position: sticky ? 'fixed' : 'relative',
          top: sticky ? 0 : undefined,
          left: sticky ? 0 : undefined,
          right: sticky ? 0 : undefined,
          // Responsive height via CSS custom property
        }}
        className="product-subheader"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Left: icon + "2.0" */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="hidden sm:flex" style={{ alignItems: 'center' }}>
              <CarIcon size={18} />
            </span>
            <span className="flex sm:hidden" style={{ alignItems: 'center' }}>
              <CarIcon size={16} />
            </span>
            <span
              className="hidden sm:inline"
              style={{ fontSize: '14px', fontWeight: 500, color: 'rgba(255,255,255,0.92)', lineHeight: 1 }}
            >
              2.0
            </span>
            <span
              className="sm:hidden"
              style={{ fontSize: '13px', fontWeight: 500, color: 'rgba(255,255,255,0.92)', lineHeight: 1 }}
            >
              2.0
            </span>
          </div>

          {/* Desktop button */}
          <button
            className="hidden sm:flex"
            style={{
              height: '32px',
              paddingLeft: '15px',
              paddingRight: '15px',
              fontSize: '14px',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.32)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.92)',
              alignItems: 'center',
              gap: '8px',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Інші дизайни
            <ChevronDown size={14} />
          </button>

          {/* Mobile button */}
          <button
            className="flex sm:hidden"
            style={{
              height: '30px',
              paddingLeft: '13px',
              paddingRight: '13px',
              fontSize: '12px',
              borderRadius: '9999px',
              border: '1px solid rgba(255,255,255,0.32)',
              background: 'transparent',
              color: 'rgba(255,255,255,0.92)',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            Інші дизайни
            <ChevronDown size={12} />
          </button>
        </div>
      </div>

      {/* Placeholder: only rendered when sticky to hold the space in the layout */}
      {sticky && (
        <div
          className="product-subheader-placeholder"
          aria-hidden="true"
          style={{ flexShrink: 0 }}
        />
      )}
    </>
  );
};
