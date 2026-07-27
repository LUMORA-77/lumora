export default function Creer() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-8">

      <div className="max-w-3xl w-full bg-[#111] border border-white/10 rounded-3xl p-12">

        <p className="uppercase tracking-[0.4em] text-yellow-400 mb-4 text-center">
          IA GENERATOR
        </p>

        <h1 className="text-5xl font-black text-center">
          Crée ton wallpaper
        </h1>

        <p className="text-gray-400 text-center mt-6">
          Importe une photo et transforme-la en wallpaper premium grâce à l'IA.
        </p>

        <div className="mt-12">

          <label className="block mb-3 font-bold">
            Choisis une image
          </label>

          <input
            type="file"
            className="w-full border border-white/20 rounded-xl p-4 bg-black"
          />

        </div>

        <div className="mt-8">

          <label className="block mb-3 font-bold">
            Style
          </label>

          <select className="w-full bg-black border border-white/20 rounded-xl p-4">

            <option>Cyberpunk</option>

            <option>Anime</option>

            <option>Luxury</option>

            <option>Minimaliste</option>

            <option>Réaliste</option>

          </select>

        </div>

        <button className="w-full mt-10 bg-yellow-400 text-black py-5 rounded-full text-xl font-bold hover:bg-yellow-300 transition">
          Générer mon wallpaper
        </button>

      </div>

    </main>
  );
}