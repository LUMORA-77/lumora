export default function Testimonials() {
  const reviews = [
    {
      name: "Lucas",
      text: "Incroyable qualité. Mon fond d'écran est magnifique sur mon Mac.",
    },
    {
      name: "Emma",
      text: "Très simple à utiliser et le rendu IA est vraiment impressionnant.",
    },
    {
      name: "Nathan",
      text: "Je ne pensais pas qu'une photo pouvait devenir un wallpaper aussi stylé.",
    },
  ];

  return (
    <section className="bg-[#090909] py-28">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[0.4em] text-yellow-400 mb-4">
            ILS NOUS FONT CONFIANCE
          </p>

          <h2 className="text-5xl font-black">
            Ce que disent nos clients
          </h2>

        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {reviews.map((review) => (

            <div
              key={review.name}
              className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-yellow-400 transition"
            >

              <div className="text-yellow-400 text-3xl mb-5">
                ★★★★★
              </div>

              <p className="text-gray-300 leading-8">
                "{review.text}"
              </p>

              <h3 className="mt-8 font-bold text-xl">
                {review.name}
              </h3>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}