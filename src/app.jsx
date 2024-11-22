// src/App.jsx

import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { LoginForm } from './login/LoginForm';
import { Home } from './home/home';
import { Products } from './products/products';
import { Cart } from './cart/cart';
import { Billing } from './billing/billing';

import './App.css';

export default function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const isAuthenticated = Boolean(userName);
  const [cartItems, setCartItems] = useState([]);

  const contactRef = useRef(null);

  const scrollToContact = (e) => {
    e.preventDefault();
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleLogin = (name) => {
    // Decode token to get username if needed
    localStorage.setItem('userName', name);
    setUserName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('token'); // Remove the JWT token
    setUserName('');
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const calculateTotals = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = 7.00;
    const tax = subtotal * 0.066;
    const total = subtotal + shipping + tax;
    return { subtotal, shipping, tax, total };
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== productId));
  };

  const incrementQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrementQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );
  };

  useEffect(() => {
    // Optionally, verify token on app load
    const token = localStorage.getItem('token');
    if (token) {
      // You can implement token verification here
      // For simplicity, we'll assume the token is valid and extract the username
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUserName(payload.username);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <header className="navigation">
          <h1 className="top_left">Beauty By EB</h1>
          <nav>
            <ul className="top_right">
              <ul className="navbar-brand">
                {!isAuthenticated && (
                  <li className="nav-item">
                    <NavLink className="nav-link" to="login">
                      Login
                    </NavLink>
                  </li>
                )}
                {isAuthenticated && (
                  <li className="nav-item">
                    <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                      Logout
                    </span>
                  </li>
                )}
                <li className="nav-item">
                  <NavLink className="nav-link" to="">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="products">
                    Products
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="cart">
                    Your Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <a href="#contact" className="nav-link" onClick={scrollToContact}>
                    Contact
                  </a>
                </li>
              </ul>
            </ul>
          </nav>
        </header>

        <Routes>
          <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <Cart
                cartItems={cartItems}
                calculateTotals={calculateTotals}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                incrementQuantity={incrementQuantity}
                decrementQuantity={decrementQuantity}
              />
            }
          />
          <Route
            path="/billing"
            element={
              <Billing
                cartItems={cartItems}
                calculateTotals={calculateTotals}
              />
            }
          />
        </Routes>

        <footer className="footer" id="contact_info" ref={contactRef}>
          <ul>
            <li className="github">
              <strong>Github</strong>
              <a href="https://github.com/Irabago55/Startup_CS_260.git" target="_blank" rel="noopener noreferrer">
                Visit our GitHub
              </a>
            </li>
            <li className="social_media">
              <strong>Follow us</strong>
              <a href="https://www.facebook.com/profile.php?id=100063623010158" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
              <br />
              <a href="https://www.tiktok.com/@beautybyeb" target="_blank" rel="noopener noreferrer">
                TikTok
              </a>
              <br />
              <a href="https://www.instagram.com/original_beautyeb/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
            <li className="email">
              <strong>Email</strong>
              <a href="mailto:info@beautybyeb.com">info@beautybyeb.com</a>
            </li>
          </ul>
        </footer>
      </div>
    </BrowserRouter>
  );
}



