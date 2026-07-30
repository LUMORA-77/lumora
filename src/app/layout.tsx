import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/app/components/Navbar";
import SiteEffects from "@/app/components/SiteEffects";

export const metadata = {
  title: {
    default: "Lumora AI",
    template: "%s | Lumora AI",
  },
  description:
    "Transformez vos photos en œuvres d’art premium et découvrez des wallpapers uniques créés par intelligence artificielle.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body>
          <CartProvider>
            <SiteEffects />

            <Navbar />

            <div className="pt-28">
              {children}
            </div>
          </CartProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}