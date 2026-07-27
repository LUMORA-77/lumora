import "./globals.css";
import { CartProvider } from "@/context/CartContext";


export const metadata = {

  title:"Lumora AI",

  description:
  "Transforme tes photos en œuvres d'art premium"

};




export default function RootLayout({

children,

}:{

children:React.ReactNode

}){


return (

<html lang="fr">

<body>


<CartProvider>

{children}

</CartProvider>


</body>

</html>

);


}