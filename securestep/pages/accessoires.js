import { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Cart from '../components/Layout/Cart';
import ProductCard from '../components/Products/ProductCard';
import FilterSidebar from '../components/Products/FilterSidebar';
import { products } from '../data/products';

export default function Accessoires() {
  const [filters, setFilters] = useState({ priceRange: [0, 200], sizes: [], features: [] });
  const [sortBy, setSortBy] = useState('name');

  const accessories = useMemo(() => products.filter(p => p.category === 'Accessoires'), []);

  const filteredProducts = useMemo(() => {
    let result = [...accessories];
    result = result.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    if (filters.sizes.length > 0) {
      result = result.filter(p => (p.sizes || []).some(s => filters.sizes.includes(s)));
    }
    if (filters.features.length > 0) {
      result = result.filter(p => (p.features || []).every(f => filters.features.includes(f)));
    }

    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      default: result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [accessories, filters, sortBy]);

  return (
    <div>
      <Head>
        <title>Accessoires de Sécurité | SecureStep</title>
        <meta name="description" content="Semelles, chaussettes techniques, lacets renforcés et plus." />
      </Head>

      <Header />
      <Cart />

      <main className="products-page">
        <div className="container">
          <div className="page-header">
            <h1>Accessoires</h1>
            <p>Optimisez votre confort et votre sécurité au quotidien.</p>
          </div>

          <div className="products-layout">
            <FilterSidebar filters={filters} setFilters={setFilters} products={accessories} />
            <div className="products-main">
              <div className="products-controls">
                <div className="results-count">
                  {filteredProducts.length} produit{filteredProducts.length !== 1 ? 's' : ''}
                </div>
                <div className="sort-by">
                  <label>Trier par:</label>
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="name">Nom</option>
                    <option value="price-asc">Prix croissant</option>
                    <option value="price-desc">Prix décroissant</option>
                  </select>
                </div>
              </div>

              <div className="products-grid">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="no-results">
                  <p>Aucun produit ne correspond à vos critères.</p>
                  <button onClick={() => setFilters({ priceRange: [0, 200], sizes: [], features: [] })} className="cta-secondary">
                    Réinitialiser les filtres
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
