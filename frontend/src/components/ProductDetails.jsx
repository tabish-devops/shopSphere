function ProductDetails({ product, onBack, onAddToCart }) {
  return (
    <section className="product-details">
      <button className="back-btn" onClick={onBack}>
        ← Back to Products
      </button>

      <div className="product-details-container">
        
        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        <div className="product-details-info">
          
          <p className="product-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <div className="product-rating">
            ⭐ {product.rating} / 5
          </div>

          <h2>
            ₹{product.price.toLocaleString("en-IN")}
          </h2>

          <p className="product-details-description">
            Experience quality technology with the{" "}
            {product.name}. Designed for everyday use with
            reliable performance, modern design and great value.
          </p>

          <div className="product-features">
            <p>✓ Premium quality</p>
            <p>✓ Fast delivery</p>
            <p>✓ Secure payment</p>
            <p>✓ Easy returns</p>
          </div>

          <button
            className="primary-btn"
            onClick={() => onAddToCart(product)}
          >
            🛒 Add to Cart
          </button>

        </div>
      </div>
    </section>
  );
}

export default ProductDetails;