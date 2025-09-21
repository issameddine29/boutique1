import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Cart from '../components/Layout/Cart';
import { useCart } from '../utils/cartContext';
import { useState } from 'react';

export default function PaiementPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [status, setStatus] = useState({ loading: false, ok: null, message: '' });

  const handlePay = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, ok: null, message: '' });

    const form = new FormData(e.currentTarget);
    const order = {
      items: cartItems,
      total: getCartTotal(),
      customer: {
        firstName: form.get('firstName'),
        lastName: form.get('lastName'),
        email: form.get('email'),
        phone: form.get('phone'),
        address: form.get('address'),
        city: form.get('city'),
        zip: form.get('zip'),
        country: form.get('country'),
      },
      payment: {
        cardName: form.get('cardName'),
        cardNumber: form.get('cardNumber'),
        exp: form.get('exp'),
        cvc: form.get('cvc'),
      }
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus({ loading: false, ok: true, message: 'Paiement validé. Merci pour votre commande !' });
        clearCart();
        e.currentTarget.reset();
      } else {
        setStatus({ loading: false, ok: false, message: data.message || 'Échec du paiement.' });
      }
    } catch (err) {
      setStatus({ loading: false, ok: false, message: 'Erreur réseau. Réessayez.' });
    }
  };

  return (
    <div>
      <Head>
        <title>Paiement | SecureStep</title>
        <meta name="description" content="Saisissez vos informations de livraison et de paiement en toute sécurité." />
      </Head>

      <Header />
      <Cart />

      <main className="container" style={{ padding: '2rem 0' }}>
        <h1>Paiement</h1>

        {cartItems.length === 0 ? (
          <p>Votre panier est vide.</p>
        ) : (
          <form onSubmit={handlePay} className="checkout-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
            <section style={{ background: '#fff', padding: '1rem', borderRadius: 8, boxShadow: 'var(--shadow)' }}>
              <h3>Adresse de livraison</h3>
              <div className="grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                <div><label>Prénom</label><input name="firstName" required /></div>
                <div><label>Nom</label><input name="lastName" required /></div>
                <div><label>Email</label><input name="email" type="email" required /></div>
                <div><label>Téléphone</label><input name="phone" required /></div>
                <div style={{ gridColumn: '1 / -1' }}><label>Adresse</label><input name="address" required /></div>
                <div><label>Ville</label><input name="city" required /></div>
                <div><label>Code postal</label><input name="zip" required /></div>
                <div><label>Pays</label><input name="country" required defaultValue="Belgique" /></div>
              </div>

              <h3 style={{ marginTop: 20 }}>Paiement</h3>
              <div className="grid2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                <div style={{ gridColumn: '1 / -1' }}><label>Nom sur la carte</label><input name="cardName" required /></div>
                <div style={{ gridColumn: '1 / -1' }}><label>Numéro de carte</label><input name="cardNumber" inputMode="numeric" required placeholder="4242 4242 4242 4242" /></div>
                <div><label>Expiration (MM/AA)</label><input name="exp" required placeholder="12/27" /></div>
                <div><label>CVC</label><input name="cvc" required placeholder="123" /></div>
              </div>

              <button className="cta-primary" disabled={status.loading} style={{ marginTop: 16 }}>
                {status.loading ? 'Traitement...' : `Payer ${getCartTotal().toFixed(2)} €`}
              </button>

              {status.ok === true && <p style={{ color: 'var(--success-color)', marginTop: 10 }}>{status.message}</p>}
              {status.ok === false && <p style={{ color: 'var(--secondary-color)', marginTop: 10 }}>{status.message}</p>}
            </section>

            <aside style={{ background: '#fff', padding: '1rem', borderRadius: 8, boxShadow: 'var(--shadow)' }}>
              <h3>Récapitulatif</h3>
              <ul style={{ listStyle: 'none', marginTop: 12 }}>
                {cartItems.map(item => (
                  <li key={item.uniqueId} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span>{item.name} × {item.quantity}</span>
                    <strong>{(item.price * item.quantity).toFixed(2)} €</strong>
                  </li>
                ))}
              </ul>
              <hr style={{ margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Total</span>
                <strong>{getCartTotal().toFixed(2)} €</strong>
              </div>
            </aside>
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
