import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    // Load cart dari localStorage saat aplikasi dibuka
    useEffect(() => {
        const savedCart = localStorage.getItem("cart");

        if (savedCart) {
            setCartItems(JSON.parse(savedCart));
        }
    }, []);

    // Simpan cart ke localStorage setiap ada perubahan
    useEffect(() => {
        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            const existingItems = prevItems.find(
                (item) => item.id === product.id
            );

            // Jika produk di cart
            if (existingItems) {
                return prevItems.map((item) => 
                    item.id === product.id
                    ? {
                        ...item,
                        quantity: item.quantity + 1
                    }
                    : item
                );
            }

            // Produk baru
            return [
                ...prevItems,
                {
                    ...product,
                    quantity: 1
                }
            ];
        });
    };

    const removeFromCart = (productID) => {
        setCartItems((prevItems) => 
            prevItems.filter(
                (item) => item.id !== productID
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity, 0
    );

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                clearCart,
                totalPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );

}