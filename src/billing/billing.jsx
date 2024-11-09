import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./billing.css";

export function Billing({ cartItems, calculateTotals }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        address: '',
        email: '',
        phoneNumber: '',
        cardNumber: '',
        expirationDate: '',
        cvv: ''
    });

    const { subtotal, shipping, tax, total } = calculateTotals();

    const handleOrderConfirmation = (e) => {
        e.preventDefault();
        const emptyFields = Object.keys(formData).filter(field => !formData[field]);
    
        if (emptyFields.length > 0) {
            emptyFields.forEach(field => {
                document.getElementsByName(field)[0].style.borderColor = 'red';
            });
            alert("Please fill in all required fields.");
            return;
        }
    
        alert("Order complete!");
        navigate("/");
    };
    
    // Reset field border color on input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        e.target.style.borderColor = value ? '#ccc' : 'red';
    };
    

    const handleCancel = () => {
        navigate("/");
    };

    return (
        <main className="billing-container">
            <h2>Delivery Information</h2>
            <form onSubmit={handleOrderConfirmation}>
                <div>
                    <label>First Name*</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Last Name*</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Address*</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email*</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Phone Number*</label>
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
                </div>

                <h2>Billing Information</h2>
                <div>
                    <label>Card Number*</label>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} required />
                </div>
                <div>
                    <label>Expiration Date*</label>
                    <input type="text" name="expirationDate" placeholder="MM/YY" value={formData.expirationDate} onChange={handleChange} required />
                </div>
                <div>
                    <label>CVV*</label>
                    <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} required />
                </div>

                <h2>Order Review</h2>
                <section className="order-summary">
                    {cartItems.map(item => (
                        <div key={item.id} className="order-item">
                            <p>{item.name}</p>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                    <p>Subtotal: ${subtotal.toFixed(2)}</p>
                    <p>Shipping: ${shipping.toFixed(2)}</p>
                    <p>Tax: ${tax.toFixed(2)}</p>
                    <h3>Total: ${total.toFixed(2)}</h3>
                </section>

                <div className="billing-actions">
                    <button type="submit">Confirm Order</button>
                    <button type="button" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </main>
    );
}
