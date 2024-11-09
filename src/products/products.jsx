// products.jsx
import React from "react";
import "./products.css";

export function Products({ addToCart }) {
    const products = [
        { id: 1, name: "Pineapple Hair Growth Oil", price: 25.00, image: "/pineapple_900x.jpeg" },
        { id: 2, name: "Coconut Oil", price: 30.00, image: "/pineapple_900x.jpeg" },
        { id: 3, name: "Avocado Oil", price: 25.00, image: "/pineapple_900x.jpeg" },
        { id: 4, name: "Jelly Face Cleanser", price: 25.00, image: "/pineapple_900x.jpeg" },
        { id: 5, name: "Biotin Gummies", price: 25.00, image: "/pineapple_900x.jpeg"},
        { id: 6, name: "Sun Screen", price: 25.00, image: "/pineapple_900x.jpeg"}
        // Add more products with image paths here
    ];

    return (
        <main className="products-container">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>${product.price.toFixed(2)}</p>
                    <button onClick={() => addToCart(product)}>Add to Cart</button>
                </div>
            ))}
        </main>
    );
}
