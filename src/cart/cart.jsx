// cart.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './cart.css';

export function Cart({ cartItems, calculateTotals, addToCart, removeFromCart, incrementQuantity, decrementQuantity }) {
    const navigate = useNavigate();

    const { subtotal, shipping, tax, total } = calculateTotals();
    const recommendedProducts = [
        { id: 4, name: "Argan Oil", price: 30.00, image: "/pineapple_900x.jpeg"},
        { id: 5, name: "Jojoba Oil", price: 25.00, image: "/pineapple_900x.jpeg" },
        // Add more recommended products here
    ];
    
    const handleCheckout = () => {
        navigate("/billing"); // Navigate to the billing page
    };

    return (
        <main className="cart-container">
            <section className="cart-items">
                <h2>Your Cart</h2>
                {cartItems.map((item) => (
                    <div key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-info">
                            <h4>{item.name}</h4>
                            <div className="cart-item-quantity">
                                <button onClick={() => decrementQuantity(item.id)}>-</button>
                                <p>Quantity: {item.quantity}</p>
                                <button onClick={() => incrementQuantity(item.id)}>+</button>
                            </div>
                            <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                            <button onClick={() => removeFromCart(item.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </section>
            <section className="summary">
                <h2>Summary</h2>
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                <p>Shipping & Handling: ${shipping.toFixed(2)}</p>
                <p>Estimated Tax: ${tax.toFixed(2)}</p>
                <h3>Total: ${total.toFixed(2)}</h3>
                <button onClick={handleCheckout}>Checkout</button>
            </section>
            <aside className="recommendations">
                <h2>You Might Also Like</h2>
                {recommendedProducts.map((product) => (
                    <div key={product.id} className="recommended-product">
                        <img src={product.image} alt={product.name} />
                        <h4>{product.name}</h4>
                        <p>Price: ${product.price.toFixed(2)}</p>
                        <button onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                ))}
            </aside>
        </main>
    );
}
