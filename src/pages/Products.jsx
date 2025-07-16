import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const PRODUCTS = [
  { title: "Organic Apples", price: "$10.99", img: "/images/apple.jpg", category: "fruits" },
  { title: "Juicy Oranges", price: "$7.25", img: "/images/oranges.jpg", category: "fruits" },
  { title: "Fresh Bananas", price: "$5.50", img: "/images/banana.jpg", category: "fruits" },
  { title: "Fresh Milk", price: "$15.49", img: "/images/milk.jpg", category: "dairy" },
  { title: "Hen Eggs", price: "$4.29", img: "/images/eggs.jpg", category: "dairy" },
  { title: "Cheddar Cheese", price: "$9.99", img: "/images/cheese.jpg", category: "dairy" },
  { title: "Wheat Bread", price: "$8.25", img: "/images/bread.jpg", category: "others" },
  { title: "Red Onions", price: "$1.49", img: "/images/onions.jpg", category: "others" },
  { title: "Basmati Rice", price: "$12.49", img: "/images/rice.jpg", category: "others" },
];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
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

  const filteredProducts =
    activeCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeCategory);

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
              <a className="nav-link menu-link" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link menu-link active" href="/product">Products</a>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart-fill"></i> Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="container my-5">
        <ul className="nav nav-pills mb-3 justify-content-center">
          {["all", "fruits", "dairy", "others"].map((cat) => (
            <li className="nav-item" key={cat}>
              <button
                className={`nav-link ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            </li>
          ))}
        </ul>

        <div className="row g-4">
          {filteredProducts.map((product) => (
            <div className="col-md-4" key={product.title}>
              <div className="card h-100">
                <img src={product.img} className="card-img-top" alt={product.title} />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">{product.price}</p>
                  <button
                    className={`btn ${clicked[product.title] ? "btn-success" : "btn-danger"} add-to-cart`}
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