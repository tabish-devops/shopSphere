import { useState } from "react";

function Cart({
  cart,
  onBack,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  const [showCheckout, setShowCheckout] = useState(false);

  const total = cart.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // CHECKOUT SCREEN
  if (showCheckout) {
    return (
      <section className="cart-section">

        <div className="checkout-success">

          <div className="empty-cart-icon">
            ✅
          </div>

          <p className="product-category">
            CHECKOUT
          </p>

          <h2>Ready for Checkout</h2>

          <p>
            Your cart has been successfully prepared for checkout.
          </p>

          <div className="checkout-total">
            <span>Total Amount</span>

            <strong>
              ₹{total.toLocaleString("en-IN")}
            </strong>
          </div>

          <p className="checkout-note">
            Payment and order processing will be added in a
            future version of ShopSphere.
          </p>

          <button
            className="primary-btn"
            onClick={onBack}
          >
            ← Continue Shopping
          </button>

        </div>

      </section>
    );
  }

  return (
    <section className="cart-section">

      <button className="back-btn" onClick={onBack}>
        ← Continue Shopping
      </button>

      <div className="section-heading">
        <p>YOUR SHOPPING CART</p>
        <h2>Cart</h2>
      </div>

      {cart.length === 0 ? (
        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h3>Your cart is empty</h3>

          <p>
            Add some products to your cart to continue.
          </p>

          <button
            className="primary-btn"
            onClick={onBack}
          >
            Start Shopping →
          </button>

        </div>
      ) : (
        <div className="cart-container">

          {/* CART ITEMS */}
          <div className="cart-items">

            {cart.map((product) => (
              <div
                className="cart-item"
                key={product.id}
              >

                <div className="cart-item-image">
                  <img
                    src={product.image}
                    alt={product.name}
                  />
                </div>

                <div className="cart-item-info">

                  <p className="product-category">
                    {product.category}
                  </p>

                  <h3>{product.name}</h3>

                  <strong>
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </strong>

                  {/* QUANTITY CONTROLS */}
                  <div className="quantity-controls">

                    <button
                      onClick={() =>
                        onDecrease(product.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {product.quantity}
                    </span>

                    <button
                      onClick={() =>
                        onIncrease(product.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  {/* REMOVE BUTTON */}
                  <button
                    className="remove-btn"
                    onClick={() =>
                      onRemove(product.id)
                    }
                  >
                    Remove
                  </button>

                </div>

              </div>
            ))}

          </div>

          {/* ORDER SUMMARY */}
          <div className="cart-summary">

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items</span>

              <span>
                {cart.reduce(
                  (sum, product) =>
                    sum + product.quantity,
                  0
                )}
              </span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>

              <span>
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>

              <span>FREE</span>
            </div>

            <hr />

            <div className="summary-total">

              <span>Total</span>

              <strong>
                ₹{total.toLocaleString("en-IN")}
              </strong>

            </div>

            <button
              className="primary-btn checkout-btn"
              onClick={() => setShowCheckout(true)}
            >
              Proceed to Checkout →
            </button>

          </div>

        </div>
      )}

    </section>
  );
}

export default Cart;

