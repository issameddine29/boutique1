import { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import Cart from '../components/Layout/Cart';
import ProductCard from '../components/Products/ProductCard';
import FilterSidebar from '../components/Products/FilterSidebar';
import { products } from '../data/products';

export default function Hommes() {
  const [filters, setFilters] = useState({ priceRange: [0, 200], sizes: [], features: [] });
  const [sortBy, setSortBy] = useState('name');

  const menProducts = useMemo(() => products.filter(product => product.category === 'Hommes'), []);

  const filteredProducts = useMemo(() => {
    let result = [...menProducts];
    result = result.filter(product => product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]);

    if (filters.sizes.length > 0) {
      result = result.filter(product => (product.sizes || []).some(size => filters.sizes.includes(size)));
    }
    if (filters.features.length > 0) {
      result = result.filter(product => (product.features || []).every(feature => filters.features.includes(feature)));
    }
    switch (sortBy) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result.sort((a, b) => b.price - a.price); break;
      default: result.sort((a, b) => a.name.localeCompare(b.name));
    }
    return result;
  }, [menProducts, filters, sortBy]);

  return (
    <div>
      <Head>
        <title>Chaussures de Sécurité pour Hommes | SecureStep</title>
        <meta name="description" content="Découvrez notre collection de chaussures de sécurité pour hommes. Confort optimal, protection certifiée et livraison rapide." />
      </Head>

      <Header />
      <Cart />

      <main className="products-page">
        <div className="container">
          <div className="page-header">
            <h1>Chaussures de Sécurité Hommes</h1>
            <p>Découvrez notre collection complète de chaussures de sécurité conçues pour les hommes</p>
          </div>

          <div className="products-layout">
            <FilterSidebar filters={filters} setFilters={setFilters} products={menProducts} />
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
                  <p>Aucun produit ne correspond à vos critères de recherche.</p>
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
