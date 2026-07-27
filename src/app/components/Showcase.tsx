import Image from "next/image";

export default function Showcase() {
  return (
    <section className="bg-black py-32">
      <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-20 items-center">

        <div>
          <p className="uppercase tracking-[0.4em] text-yellow-400 mb-4">
            Transformez vos photos
          </p>

          <h2 className="text-6xl font-black leading-tight">
            Une simple photo devient une œuvre d'art.
          </h2>

          <p className="text-gray-400 text-xl mt-8 leading-9">
            Envoyez votre image, choisissez un style, laissez notre IA créer un wallpaper unique en quelques secondes.
          </p>

          <button className="mt-12 bg-yellow-400 text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition">
            Créer mon wallpaper
          </button>
        </div>

        <div className="relative">

          <div className="absolute -inset-4 bg-yellow-400/20 blur-3xl rounded-3xl"></div>

          <Image
            src="/images/wallpaper1.jpg"
            alt="Wallpaper"
            width={700}
            height={900}
            className="relative rounded-3xl shadow-2xl"
          />

        </div>

      </div>
    </section>
  );
}