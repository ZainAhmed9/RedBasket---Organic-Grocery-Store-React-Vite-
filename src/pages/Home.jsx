import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const FEATURED_PRODUCTS = [
  { title: "Organic Apples", price: "$2.99", img: "/images/apple.jpg", category: "fruits" },
  { title: "Fresh Milk", price: "$1.49", img: "/images/milk.jpg", category: "dairy" },
  { title: "Whole Wheat Bread", price: "$2.49", img: "/images/bread.jpg", category: "others" },
];

export default function Home() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [clicked, setClicked] = useState({});

  useEffect(() => {
    // Sync cart with localStorage on mount and when storage changes
    const handleStorageChange = () => {
      setCart(JSON.parse(localStorage.getItem("cart")) || []);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.title === product.title);
      const newCart = existingItem
        ? prev.map((item) =>
            item.title === product.title
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(newCart));
      return newCart;
    });
    setClicked((prev) => ({ ...prev, [product.title]: true }));
    setTimeout(() => {
      setClicked((prev) => ({ ...prev, [product.title]: false }));
    }, 1000);
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
              <a className="nav-link menu-link active" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-link" href="/product">Products</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart-fill"></i> Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <header className="hero text-white text-center d-flex align-items-center" style={{
        height: "400px",
        backgroundImage: "url('/images/cover.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}>
        <div className="container">
          <h1 className="display-4 fw-bold">Welcome to RedBasket</h1>
          <p className="lead">Fresh groceries delivered to your door, fast and easy!</p>
          <a href="/product" className="btn btn-light btn-lg mt-3">Shop Now</a>
        </div>
      </header>

      <section className="products py-5">
        <div className="container">
          <h2 className="text-center mb-4">Featured Products</h2>
          <div className="row g-4">
            {FEATURED_PRODUCTS.map((product) => (
              <div className="col-md-4" key={product.title}>
                <div className="card">
                  <img src={product.img} className="card-img-top" alt={product.title} />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.price}</p>
                    <button
                      className={`btn ${clicked[product.title] ? "btn-success" : "btn-danger"}`}
                      onClick={() => handleAddToCart(product)}
                      disabled={clicked[product.title]}
                    >
                      {clicked[product.title] ? "Added!" : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="mb-4 fw-bold text-danger">Why Choose RedBasket?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm">
                <img src="/images/delivery.png" alt="Delivery" width="60" />
                <h5 className="mt-3">Fast Delivery</h5>
                <p className="text-danger">Quick, safe, and hassle-free delivery service.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm">
                <img src="/images/fresh.jpg" alt="Fresh" width="60" />
                <h5 className="mt-3">Fresh & Organic</h5>
                <p className="text-danger">Only the best pesticide-free products.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm">
                <img src="/images/secure.jpg" alt="Secure" width="60" />
                <h5 className="mt-3">Secure Checkout</h5>
                <p className="text-danger">Safe and easy payment system.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-danger text-center text-white py-4 mt-5 border-top">
        <div className="container">
          <p>© 2025 RedBasket. All rights reserved.</p>
          <p>
            <a href="#" className="text-white me-3">Privacy Policy</a>
            <a href="#" className="text-white">Terms of Service</a>
          </p>
        </div>
      </footer>
    </>
  );
}