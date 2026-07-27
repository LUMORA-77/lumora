export default function Features() {
  const features = [
    {
      title: "Qualité 4K",
      text: "Chaque wallpaper est exporté en très haute résolution pour tous vos appareils.",
    },
    {
      title: "Créé par IA",
      text: "Des créations uniques générées avec l'intelligence artificielle.",
    },
    {
      title: "Téléchargement instantané",
      text: "Recevez votre wallpaper immédiatement après votre achat.",
    },
  ];

  return (
    <section className="bg-[#080808] py-28">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.4em] text-yellow-400 mb-3">
            POURQUOI LUMORA
          </p>

          <h2 className="text-5xl font-black">
            Une expérience premium
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature) => (

            <div
              key={feature.title}
              className="bg-white/5 border border-white/10 rounded-3xl p-10 hover:border-yellow-400 transition"
            >
              <h3 className="text-2xl font-bold mb-5">
                {feature.title}
              </h3>

              <p className="text-gray-400 leading-8">
                {feature.text}
              </p>
            </div>

          ))}

        </div>

      </div>
    </section>
  );
}