export default function FilterSidebar({ filters, setFilters, products }) {
  const allSizes = [...new Set(products.flatMap(p => p.sizes || []))];
  const allFeatures = [...new Set(products.flatMap(p => p.features || []))];

  const toggleFilter = (type, value) => {
    setFilters(prev => {
      const newValues = prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value];
      return { ...prev, [type]: newValues };
    });
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filtres</h3>

      <div className="filter-section">
        <h4>Prix</h4>
        <input
          type="range"
          min="0"
          max="200"
          value={filters.priceRange[1]}
          onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [0, +e.target.value] }))}
        />
        <p>Jusqu’à {filters.priceRange[1]} €</p>
      </div>

      <div className="filter-section">
        <h4>Tailles</h4>
        {allSizes.map(size => (
          <label key={size}>
            <input
              type="checkbox"
              checked={filters.sizes.includes(size)}
              onChange={() => toggleFilter("sizes", size)}
            />
            {size}
          </label>
        ))}
      </div>

      <div className="filter-section">
        <h4>Caractéristiques</h4>
        {allFeatures.map(f => (
          <label key={f}>
            <input
              type="checkbox"
              checked={filters.features.includes(f)}
              onChange={() => toggleFilter("features", f)}
            />
            {f}
          </label>
        ))}
      </div>
    </aside>
  );
}
