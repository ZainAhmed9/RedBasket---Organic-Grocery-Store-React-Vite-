import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import "../styles.css";

export default function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");

  useEffect(() => {
    // Sync cart with localStorage on mount and when storage changes
    const handleStorageChange = () => {
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const updateQuantity = (title, change) => {
    setCart((prev) => {
      const newCart = prev.map((item) =>
        item.title === title
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter((item) => item.quantity > 0);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const removeItem = (title) => {
    setCart((prev) => {
      const newCart = prev.filter((item) => item.title !== title);
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
  };

  const totalPrice = cart.reduce(
    (sum, item) => sum + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  ).toFixed(2);

  const handleCheckout = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentSelection = (method) => {
    setSelectedPaymentMethod(method);
  };

  const handlePaymentSubmit = () => {
    if (!selectedPaymentMethod) {
      setPaymentStatus("Please select a payment method.");
      return;
    }

    // Simulate payment processing
    setPaymentStatus(`Processing payment via ${selectedPaymentMethod}...`);
    setTimeout(() => {
      setPaymentStatus(`Payment successful via ${selectedPaymentMethod}!`);
      setCart([]); // Clear cart after successful payment
      localStorage.setItem("cart", JSON.stringify([]));
      setTimeout(() => {
        setShowPaymentModal(false);
        setSelectedPaymentMethod("");
        setPaymentStatus("");
      }, 2000);
    }, 1500);
  };

  return (
    <>
      <nav className="navbar bg-light">
        <div className="container">
          <a className="navbar-brand text-danger fw-bold" href="/">
            <img src="/images/logo.jpg" alt="Logo" width="40" height="40" /> RedBasket
          </a>
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link menu-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-link" href="/product">Products</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/cart">
                <i className="bi bi-cart-fill"></i> Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container my-5">
        <h2 className="text-danger mb-4 text-center">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center">Your cart is empty. <Link to="/product">Shop now!</Link></p>
        ) : (
          <>
            <div className="row g-4">
              {cart.map((item) => (
                <div className="col-md-4" key={item.title}>
                  <div className="card h-100">
                    <img src={item.img} className="card-img-top" alt={item.title} />
                    <div className="card-body">
                      <h5 className="card-title">{item.title}</h5>
                      <p className="card-text">{item.price} x {item.quantity}</p>
                      <div className="d-flex align-items-center mb-2">
                        <button
                          className="btn btn-outline-danger btn-sm me-2"
                          onClick={() => updateQuantity(item.title, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => updateQuantity(item.title, 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeItem(item.title)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-4">
              <h4>Total: ${totalPrice}</h4>
              <button className="btn btn-danger btn-lg mt-3" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      {showPaymentModal && (
        <div className="modal" style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Select Payment Method</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPaymentModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                {paymentStatus && (
                  <div className="alert alert-info">{paymentStatus}</div>
                )}
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="debitCard"
                    value="Debit Card"
                    onChange={() => handlePaymentSelection("Debit Card")}
                  />
                  <label className="form-check-label" htmlFor="debitCard">
                    Debit Card
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="jazzCash"
                    value="JazzCash"
                    onChange={() => handlePaymentSelection("JazzCash")}
                  />
                  <label className="form-check-label" htmlFor="jazzCash">
                    JazzCash
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="easyPaisa"
                    value="EasyPaisa"
                    onChange={() => handlePaymentSelection("EasyPaisa")}
                  />
                  <label className="form-check-label" htmlFor="easyPaisa">
                    EasyPaisa
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowPaymentModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handlePaymentSubmit}
                >
                  Confirm Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}