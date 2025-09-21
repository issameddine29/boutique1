import Head from "next/head";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Cart from "../components/Layout/Cart";
import Hero from "../components/Home/Hero";
import ProductCard from "../components/Products/ProductCard";
import { products } from "../data/products";

export default function HomePage() {
  const featuredProducts = products.slice(0, 3);
  return (
    <div>
      <Head>
        <title>SecureStep | Chaussures de sécurité</title>
        <meta name="description" content="Chaussures de sécurité pour hommes et femmes. Protection, confort et style." />
      </Head>

      <Header />
      <Cart />

      <main>
        <Hero />
        <section className="featured-products container">
          <h2>Produits phares</h2>
          <div className="products-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
