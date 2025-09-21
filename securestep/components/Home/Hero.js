import { useRef, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const { gsap } = window;
      gsap.fromTo(heroRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
    }
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-content">
        <h1>VOTRE SÉCURITÉ, NOTRE PRIORITÉ</h1>
        <p>Découvrez nos chaussures de sécurité alliant protection, style et confort</p>
        <div className="hero-buttons">
          <Link href="/hommes" className="cta-primary">Acheter maintenant</Link>
          <Link href="/hommes" className="cta-secondary">Voir la collection</Link>
        </div>
      </div>
      <div className="hero-image">
        <img src="/images/hero-shoes.jpg" alt="Chaussures de sécurité professionnelles" />
      </div>
    </section>
  );
}
