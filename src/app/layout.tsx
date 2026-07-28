import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Lumora AI",
  description: "Transforme tes photos en œuvres d'art premium",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body>
          <CartProvider>

            <Navbar />

            <main className="pt-28">
              {children}
            </main>

          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}