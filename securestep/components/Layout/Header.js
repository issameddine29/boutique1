import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../utils/cartContext';

export default function Header() {
  const { cartItems, toggleCart } = useCart();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollPosition(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className={`header ${scrollPosition > 50 ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo">
          <Link href="/">SecureStep</Link>
        </div>

        <nav className={`nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
          <Link href="/hommes">Hommes</Link>
          <Link href="/femmes">Femmes</Link>
          <Link href="/accessoires">Accessoires</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        <div className="header-actions">
          <button className="cart-icon" onClick={toggleCart} aria-label="Ouvrir le panier">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 6a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v1h4a1 1 0 0 1 .986 1.164l-1.5 9A1 1 0 0 1 20.5 18H6a1 1 0 0 1-1-1V6zm2 2v9h11.5l1.333-8H8zm2-2h4a2 2 0 0 0 2-2h-4v2z"/>
            </svg>
            {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
          </button>

          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
