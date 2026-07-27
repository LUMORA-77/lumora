import Image from "next/image";
import Link from "next/link";

const wallpapers = [
  {
    title: "Midnight Porsche",
    image: "/images/wallpaper1.jpg",
    price: "8€",
    badge: "BEST SELLER",
  },
  {
    title: "Cyber BMW",
    image: "/images/wallpaper2.jpg",
    price: "8€",
    badge: "NEW",
  },
  {
    title: "Tokyo Lights",
    image: "/images/wallpaper3.jpg",
    price: "8€",
    badge: "PREMIUM",
  },
  {
    title: "Dark Lambo",
    image: "/images/wallpaper4.jpg",
    price: "8€",
    badge: "4K",
  },
  {
    title: "Ferrari Night",
    image: "/images/wallpaper5.jpg",
    price: "8€",
    badge: "LIMITED",
  },
  {
    title: "Lightning McQueen",
    image: "/images/wallpaper6.jpg",
    price: "8€",
    badge: "PIXAR",
  },
];

export default function Gallery() {
  return (
    <section className="bg-black text-white py-28 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.4em] text-yellow-400 mb-4">
            PREMIUM COLLECTION
          </p>

          <h2 className="text-6xl font-extrabold">
            Nos Wallpapers
          </h2>

          <p className="text-gray-400 mt-5 text-xl">
            Créés avec l'intelligence artificielle en qualité 4K.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {wallpapers.map((wallpaper) => (
            <div
              key={wallpaper.title}
              className="group bg-[#111] rounded-3xl overflow-hidden border border-white/10 hover:border-yellow-400 hover:scale-105 transition duration-500"
            >
              <div className="relative h-80 overflow-hidden">
                <Image
                  src={wallpaper.image}
                  alt={wallpaper.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute top-5 left-5 bg-yellow-400 text-black px-4 py-2 rounded-full text-sm font-bold">
                  {wallpaper.badge}
                </div>
              </div>

              <div className="p-7">
                <h3 className="text-3xl font-bold">
                  {wallpaper.title}
                </h3>

                <div className="flex justify-between items-center mt-8">
                  <span className="text-yellow-400 text-4xl font-bold">
                    {wallpaper.price}
                  </span>

                  <Link
                    href="/produit"
                    className="bg-yellow-400 text-black px-7 py-3 rounded-full font-bold hover:bg-yellow-300 hover:scale-105 transition"
                  >
                    Acheter
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}