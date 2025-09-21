import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Cart from '../components/Layout/Cart';
import { useCart } from '../utils/cartContext';
import Link from 'next/link';

export default function PanierPage() {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();

  return (
    <div>
      <Head>
        <title>Votre Panier | SecureStep</title>
        <meta name="description" content="Vérifiez vos articles avant le paiement." />
      </Head>

      <Header />
      <Cart />

      <main className="container" style={{ padding: '2rem 0' }}>
        <h1>Votre Panier</h1>

        {cartItems.length === 0 ? (
          <p>Votre panier est vide. <Link className="cta-secondary" href="/">Continuer mes achats</Link></p>
        ) : (
          <div className="cart-page-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
            <div>
              {cartItems.map(item => (
                <div key={item.uniqueId} className="cart-item-row" style={{ display: 'grid', gridTemplateColumns: '100px 1fr 150px 100px 40px', gap: '1rem', alignItems: 'center', marginBottom: '1rem', background: '#fff', padding: '1rem', boxShadow: 'var(--shadow)', borderRadius: 8 }}>
                  <img src={item.image} alt={item.name} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 6 }} />
                  <div>
                    <h3 style={{ marginBottom: 6 }}>{item.name}</h3>
                    {item.selectedSize && <p style={{ color: 'var(--gray)' }}>Taille : {item.selectedSize}</p>}
                  </div>
                  <div>
                    <div className="quantity-control" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <button onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div><strong>{(item.price * item.quantity).toFixed(2)} €</strong></div>
                  <button onClick={() => removeFromCart(item.uniqueId)} aria-label="Retirer">✕</button>
                </div>
              ))}
            </div>

            <aside style={{ background: '#fff', padding: '1rem', borderRadius: 8, boxShadow: 'var(--shadow)', height: 'fit-content' }}>
              <h3>Récapitulatif</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', margin: '1rem 0' }}>
                <span>Sous-total</span>
                <strong>{getCartTotal().toFixed(2)} €</strong>
              </div>
              <p style={{ color: 'var(--gray)' }}>Frais de livraison calculés à l’étape suivante.</p>
              <Link className="cta-primary" href="/paiement" style={{ display: 'block', textAlign: 'center', marginTop: 12 }}>
                Passer au paiement
              </Link>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
