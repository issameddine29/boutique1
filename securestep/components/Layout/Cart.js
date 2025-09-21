import { useCart } from "../../utils/cartContext";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, isCartOpen, toggleCart } = useCart();

  return (
    <div className={`cart-drawer ${isCartOpen ? "open" : ""}`}>
      <div className="cart-header">
        <h2>Votre Panier</h2>
        <button className="close" onClick={toggleCart} aria-label="Fermer le panier">✕</button>
      </div>

      <div className="cart-items">
        {cartItems.length === 0 ? (
          <p>Votre panier est vide</p>
        ) : (
          cartItems.map(item => (
            <div key={item.uniqueId} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <h4>{item.name}</h4>
                {item.selectedSize && <p>Taille: {item.selectedSize}</p>}
                <p>{item.price} €</p>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.uniqueId, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.uniqueId, item.quantity + 1)}>+</button>
                </div>
                <button className="remove" onClick={() => removeFromCart(item.uniqueId)}>Retirer</button>
              </div>
            </div>
          ))
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="cart-footer">
          <p>Total: <strong>{getCartTotal().toFixed(2)} €</strong></p>
          <a className="cta-primary" href="/paiement">Passer au paiement</a>
        </div>
      )}
    </div>
  );
}
