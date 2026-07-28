"use client";

import {
createContext,
useContext,
useState
} from "react";

type CartItem={

id:number;
title:string;
price:number;
image:string;

};

type CartContextType={

cart:CartItem[];

addToCart:(item:CartItem)=>void;

removeFromCart:(id:number)=>void;

clearCart:()=>void;

};

const CartContext=createContext<CartContextType>({

cart:[],

addToCart:()=>{},

removeFromCart:()=>{},

clearCart:()=>{}

});

export function CartProvider({

children,

}:{

children:React.ReactNode

}){

const [cart,setCart]=useState<CartItem[]>([]);

function addToCart(item:CartItem){

setCart(prev=>[...prev,item]);

}

function removeFromCart(id:number){

setCart(prev=>prev.filter(i=>i.id!==id));

}

function clearCart(){

setCart([]);

}

return(

<CartContext.Provider

value={{

cart,

addToCart,

removeFromCart,

clearCart

}}

>

{children}

</CartContext.Provider>

);

}

export function useCart(){

return useContext(CartContext);

}