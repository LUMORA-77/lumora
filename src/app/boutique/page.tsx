export default function Boutique() {
  const wallpapers = [
    { id: 1, title: "Midnight Porsche", price: "8€", image: "/images/hero.jpg" },
    { id: 2, title: "Cyber BMW", price: "8€", image: "/images/hero.jpg" },
    { id: 3, title: "Tokyo Night", price: "8€", image: "/images/hero.jpg" },
    { id: 4, title: "Golden Ferrari", price: "8€", image: "/images/hero.jpg" },
    { id: 5, title: "Neon Lamborghini", price: "8€", image: "/images/hero.jpg" },
    { id: 6, title: "Luxury Mercedes", price: "8€", image: "/images/hero.jpg" },
  ];

  return (
    <main className="min-h-screen bg-black text-white">

      <div className="max-w-7xl mx-auto px-8 py-16">

        <h1 className="text-6xl font-black text-center mb-4">
          Boutique
        </h1>

        <p className="text-center text-gray-400 mb-16">
          Télécharge instantanément des wallpapers premium.
        </p>

        <div className="grid md:grid-cols-3 gap-8">

          {wallpapers.map((wallpaper) => (

            <div
              key={wallpaper.id}
              className="rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-yellow-400 transition duration-300"
            >

              <img
                src={wallpaper.image}
                alt={wallpaper.title}
                className="w-full h-80 object-cover hover:scale-110 transition duration-700"
              />

              <div className="p-6">

                <h2 className="text-2xl font-bold">
                  {wallpaper.title}
                </h2>

                <div className="flex justify-between items-center mt-6">

                  <span className="text-yellow-400 text-2xl font-bold">
                    {wallpaper.price}
                  </span>

                  <button className="bg-yellow-400 text-black px-5 py-2 rounded-full font-bold hover:scale-105 transition">
                    Acheter
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}