import Head from 'next/head';
import { useState } from 'react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Cart from '../components/Layout/Cart';

export default function Contact() {
  const [status, setStatus] = useState({ loading: false, ok: null, message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: null, message: '' });

    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setStatus({ loading: false, ok: res.ok, message: data.message || 'Message envoyé.' });
      if (res.ok) e.currentTarget.reset();
    } catch (err) {
      setStatus({ loading: false, ok: false, message: "Erreur réseau. Réessayez." });
    }
  };

  return (
    <div>
      <Head>
        <title>Contact | SecureStep</title>
        <meta name="description" content="Contactez l'équipe SecureStep pour toute question ou demande pro." />
      </Head>

      <Header />
      <Cart />

      <main className="container" style={{ padding: '2rem 0' }}>
        <h1>Contact</h1>
        <p>Une question sur un produit, une commande ou un devis pro ? Écrivez-nous.</p>

        <form onSubmit={handleSubmit} className="contact-form" style={{ maxWidth: 640, marginTop: '1.5rem' }}>
          <div className="field"><label>Nom</label><input name="name" type="text" required placeholder="Votre nom" /></div>
          <div className="field"><label>Email</label><input name="email" type="email" required placeholder="vous@exemple.com" /></div>
          <div className="field"><label>Sujet</label><input name="subject" type="text" required placeholder="Sujet de votre message" /></div>
          <div className="field"><label>Message</label><textarea name="message" rows="6" required placeholder="Votre message..." /></div>
          <button className="cta-primary" disabled={status.loading}>{status.loading ? 'Envoi...' : 'Envoyer'}</button>
          {status.ok === true && <p style={{ color: 'var(--success-color)', marginTop: 10 }}>{status.message}</p>}
          {status.ok === false && <p style={{ color: 'var(--secondary-color)', marginTop: 10 }}>{status.message}</p>}
        </form>
      </main>

      <Footer />
    </div>
  );
}
