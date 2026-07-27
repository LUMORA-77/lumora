"use client";

import { createContext, useContext, useState } from "react";


const CartContext = createContext<any>(null);



export function CartProvider({
  children
}: {
  children: React.ReactNode;
}) {


  const [cart, setCart] = useState<any[]>([]);



  function addToCart(item:any){

    setCart((prev)=>[
      ...prev,
      item
    ]);

  }




  function removeFromCart(index:number){

    setCart((prev)=>
      prev.filter((_,i)=>i !== index)
    );

  }





  function clearCart(){

    setCart([]);

  }





  function total(){

    return cart.reduce(
      (sum,item)=>sum + item.price,
      0
    );

  }





  return (

    <CartContext.Provider

      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        total
      }}

    >

      {children}

    </CartContext.Provider>

  );


}






export function useCart(){

  return useContext(CartContext);

}