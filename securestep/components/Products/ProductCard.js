import { useState } from 'react';
import { useCart } from '../../utils/cartContext';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert("Veuillez sélectionner une taille");
      return;
    }
    addToCart({ ...product, selectedSize, uniqueId: `${product.id}-${selectedSize || 'std'}` });
  };

  return (
    <div className="product-card" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="product-image">
        <img src={product.image} alt={product.name} className={isHovered ? 'image-hover' : ''} />
        {product.isNew && <span className="new-badge">Nouveau</span>}
        {product.discount && <span className="discount-badge">-{product.discount}%</span>}
      </div>

      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="product-category">{product.category}</p>

        {product.sizes && (
          <div className="size-selector">
            <label>Taille:</label>
            <select value={selectedSize || ''} onChange={(e) => setSelectedSize(e.target.value)}>
              {product.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
        )}

        <div className="price-container">
          <span className="price">{product.price} €</span>
          {product.originalPrice && <span className="original-price">{product.originalPrice} €</span>}
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart} aria-label={`Ajouter ${product.name} au panier`}>
          Ajouter au panier
        </button>
      </div>
    </div>
  );
}
