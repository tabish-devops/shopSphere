import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FETCH PRODUCTS FROM BACKEND
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        return response.json();
      })
      .then((data) => {
        const productsWithImages = data.map((product) => {
          const imageMap = {
            1: "/images/laptop.jpg",
            2: "/images/headphones.jpg",
            3: "/images/keyboard.jpg",
            4: "/images/smartwatch.jpg",
            5: "/images/mouse.jpg",
            6: "/images/monitor.jpg",
          };

          return {
            ...product,
            image: imageMap[product.id],
          };
        });

        setProducts(productsWithImages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Unable to load products from server.");
        setLoading(false);
      });
  }, []);

  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  };

  const cartItemCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  const openCart = () => {
    setShowCart(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeCart = () => {
    setShowCart(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openProductDetails = (product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // CATEGORY FILTERING
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  const filterByCategory = (category) => {
    setSelectedCategory(category);

    setTimeout(() => {
      document
        .getElementById("products")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // CART PAGE
  if (showCart) {
    return (
      <div className="app">

        <nav className="navbar">
          <div className="logo">
            Shop<span>Sphere</span>
          </div>

          <div className="nav-links">
            <a href="#" onClick={closeCart}>
              Home
            </a>

            <a href="#products" onClick={closeCart}>
              Products
            </a>

            <a href="#categories" onClick={closeCart}>
              Categories
            </a>

            <a href="#about" onClick={closeCart}>
              About
            </a>
          </div>

          <div className="nav-actions">
            <button className="cart-btn">
              🛒 Cart ({cartItemCount})
            </button>

            <button className="login-btn">
              Login
            </button>
          </div>
        </nav>

        <Cart
          cart={cart}
          onBack={closeCart}
          onIncrease={increaseQuantity}
          onDecrease={decreaseQuantity}
          onRemove={removeFromCart}
        />

      </div>
    );
  }

  // PRODUCT DETAILS PAGE
  if (selectedProduct) {
    return (
      <div className="app">

        <nav className="navbar">
          <div className="logo">
            Shop<span>Sphere</span>
          </div>

          <div className="nav-links">
            <a href="#" onClick={closeProductDetails}>
              Home
            </a>

            <a href="#" onClick={closeProductDetails}>
              Products
            </a>

            <a href="#" onClick={closeProductDetails}>
              Categories
            </a>

            <a href="#" onClick={closeProductDetails}>
              About
            </a>
          </div>

          <div className="nav-actions">
            <button
              className="cart-btn"
              onClick={() => {
                setSelectedProduct(null);
                setShowCart(true);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
            >
              🛒 Cart ({cartItemCount})
            </button>

            <button className="login-btn">
              Login
            </button>
          </div>
        </nav>

        <ProductDetails
          product={selectedProduct}
          onBack={closeProductDetails}
          onAddToCart={addToCart}
        />

      </div>
    );
  }

  return (
    <div className="app">

      {/* NAVBAR */}
      <nav className="navbar">

        <div className="logo">
          Shop<span>Sphere</span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#products">Products</a>
          <a href="#categories">Categories</a>
          <a href="#about">About</a>
        </div>

        <div className="nav-actions">

          <button
            className="cart-btn"
            onClick={openCart}
          >
            🛒 Cart ({cartItemCount})
          </button>

          <button className="login-btn">
            Login
          </button>

        </div>

      </nav>

      {/* HERO */}
      <section className="hero" id="home">

        <div className="hero-content">

          <p className="eyebrow">
            SMART TECHNOLOGY. SMART SHOPPING.
          </p>

          <h1>
            Upgrade Your
            <span>Technology</span>
          </h1>

          <p className="hero-description">
            Discover laptops, headphones, keyboards, smartwatches,
            monitors and more — all in one place.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Shop Now →
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
            >
              Explore Products
            </button>

          </div>

          <div className="hero-stats">

            <div>
              <strong>500+</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>10K+</strong>
              <span>Customers</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Support</span>
            </div>

          </div>

        </div>

        <div className="hero-product">

          <div className="floating-card">
            <span>🔥 Trending</span>
            <h3>Next Generation Tech</h3>
            <p>Built for your everyday digital life.</p>
          </div>

          <div className="hero-device">
            💻
          </div>

        </div>

      </section>

      {/* CATEGORIES */}
      <section
        className="categories"
        id="categories"
      >

        <div className="section-heading">
          <p>SHOP BY CATEGORY</p>
          <h2>Find What You Need</h2>
        </div>

        <div className="category-grid">

          <div
            className="category-card"
            onClick={() =>
              filterByCategory("Laptops")
            }
          >
            <div>💻</div>
            <h3>Laptops</h3>
            <p>Powerful computers</p>
          </div>

          <div
            className="category-card"
            onClick={() =>
              filterByCategory("Audio")
            }
          >
            <div>🎧</div>
            <h3>Audio</h3>
            <p>Sound & headphones</p>
          </div>

          <div
            className="category-card"
            onClick={() =>
              filterByCategory("Accessories")
            }
          >
            <div>⌨️</div>
            <h3>Accessories</h3>
            <p>Essential gear</p>
          </div>

          <div
            className="category-card"
            onClick={() =>
              filterByCategory("Wearables")
            }
          >
            <div>⌚</div>
            <h3>Wearables</h3>
            <p>Smart technology</p>
          </div>

        </div>

      </section>

      {/* PRODUCTS */}
      <section
        className="products-section"
        id="products"
      >

        <div className="products-header">

          <div className="section-heading">

            <p>OUR COLLECTION</p>

            <h2>
              {selectedCategory === "All"
                ? "Featured Products"
                : `${selectedCategory} Products`}
            </h2>

          </div>

          <button
            className="view-all"
            onClick={() =>
              setSelectedCategory("All")
            }
          >
            View All →
          </button>

        </div>

        {/* LOADING */}
        {loading && (
          <div className="loading-message">
            Loading products...
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {/* PRODUCTS */}
        {!loading && !error && (
          <div className="products-grid">

            {filteredProducts.map((product) => (

              <div
                className="product-card"
                key={product.id}
              >

                <div className="product-image">

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                </div>

                <div className="product-info">

                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>{product.name}</h3>

                  <div className="product-rating">
                    ⭐ {product.rating}
                  </div>

                  <div className="product-bottom">

                    <strong>
                      ₹{Number(product.price).toLocaleString("en-IN")}
                    </strong>

                    <button
                      className="add-btn"
                      onClick={() =>
                        addToCart(product)
                      }
                    >
                      Add +
                    </button>

                  </div>

                  <button
                    className="view-details-btn"
                    onClick={() =>
                      openProductDetails(product)
                    }
                  >
                    View Details →
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </section>

      {/* PROMO */}
      <section className="promo">

        <div>

          <p>LIMITED TIME OFFER</p>

          <h2>
            Upgrade your setup.
            <br />
            Save more.
          </h2>

          <button className="primary-btn">
            Shop Deals →
          </button>

        </div>

        <div className="promo-icon">
          🛍️
        </div>

      </section>

      {/* FOOTER */}
      <footer id="about">

        <div className="footer-content">

          <div>

            <div className="logo">
              Shop<span>Sphere</span>
            </div>

            <p>
              Technology made simple.
              <br />
              Quality products, better shopping.
            </p>

          </div>

          <div>

            <h4>Shop</h4>
            <p>Laptops</p>
            <p>Audio</p>
            <p>Accessories</p>

          </div>

          <div>

            <h4>Company</h4>
            <p>About Us</p>
            <p>Contact</p>
            <p>Support</p>

          </div>

        </div>

        <div className="copyright">
          © 2026 ShopSphere. All rights reserved.
        </div>

      </footer>

    </div>
  );
}

export default App;