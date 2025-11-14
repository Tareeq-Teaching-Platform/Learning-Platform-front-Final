import React, { useEffect, useState } from 'react'
import {CartContext} from './CartContext'
export const CartProvider = ({children}) => {
    const [cartItems,setCartItems] = useState([]);
    const [isLoaded,setIsLoaded] = useState(false);
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            const parsedCart = JSON.parse(savedCart);
            // Clean up prices when loading from localStorage
            const cleanedCart = parsedCart.map(item => ({
                ...item,
                price: parseFloat(item.price) || 0
            }));
            setCartItems(cleanedCart);
        }
        setIsLoaded(true)
    }, [])

    useEffect(()=>{
        if(isLoaded){
            localStorage.setItem('cart',JSON.stringify(cartItems))
        }
    },[cartItems,isLoaded])


    const addToCart = (item)=>{
        setCartItems((prevItems)=>{
            const existingItem = prevItems.find((i)=>i.id === item.id);

            if(existingItem){
                return prevItems;
            }else {
                return [...prevItems,item];
            }
        });
    };
    const removeFromCart = (itemId) => {
        setCartItems((prevItems)=> prevItems.filter((item)=>item.id !== itemId));
    };

    const clearCart = ()=>{
        setCartItems([]);
    };
    
    const getTotalItems = ()=>{
        return cartItems.length;
    };

    const getTotalPrice = ()=> {
        const total = cartItems.reduce((total,item)=>{
            const price = parseFloat(item.price) || 0;
            return total +price;
        }, 0)
        return total;
    };

    const isInCart = (itemId)=>{
        return cartItems.some((item)=>item.id === itemId)
    }

    const value = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
  };

  return (
    <CartContext.Provider value = {value}>
        {children}
    </CartContext.Provider>
  )
}
