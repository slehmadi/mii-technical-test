import { useEffect, useState } from "react";
import { CartContext } from "../services/createCartContext";

export function CartProvider({ children }) {
    // Load cart dari localStorage saat aplikasi dibuka
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];
    })

    // Simpan cart ke localStorage setiap ada perubahan
    useEffect(() => {
        localStorage.setItem(
            "cart",
            JSON.stringify(cartItems)
        );
    }, [cartItems]);

    // tambah item
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

    // mengurangi jumlah kuantitas dari suatu item
    const decreaseItemQuantity = (productID) => {
        setCartItems((prevItems) =>{
            const existingItems = prevItems.find(
                (item) => item.id === productID
            );
        
            if (!existingItems) {
                return prevItems;
            }

            if (existingItems.quantity > 1) {
                return prevItems.map((item) => {
                    if (item.id === productID) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    }

                    return item;
                });
            }

            return prevItems.filter(
                (item) => item.id !== productID
            );
        
        });
        
    };

    // hapus keseluruhan item
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

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantity, 0
    );

    const getProductQuantity = (productID) => {
        const item = cartItems.find(
            (item) => item.id === productID
        );

        return item ? item.quantity : 0;
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                decreaseItemQuantity,
                removeFromCart,
                clearCart,
                totalPrice,
                totalItems,
                getProductQuantity
            }}
        >
            {children}
        </CartContext.Provider>
    );

}