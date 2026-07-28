import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Compte() {

  const user = await currentUser();


  if (!user) {

    redirect("/");

  }


  return (

    <main className="min-h-screen bg-[#050505] text-white pt-40">

      <div className="max-w-5xl mx-auto px-8">


        <h1 className="text-6xl font-black">
          Mon compte
        </h1>


        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-10">


          <h2 className="text-3xl font-bold">
            Profil
          </h2>


          <div className="mt-8 space-y-4 text-gray-300">


            <p>
              Nom :
              <span className="ml-2 text-white font-bold">
                {user.firstName || "Utilisateur"}
              </span>
            </p>


            <p>
              Email :
              <span className="ml-2 text-white font-bold">
                {user.emailAddresses[0].emailAddress}
              </span>
            </p>


          </div>


        </div>



        <div className="mt-10 grid md:grid-cols-2 gap-8">


          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h3 className="text-2xl font-black">
              🛒 Mes achats
            </h3>

            <p className="mt-4 text-gray-400">
              Tes wallpapers achetés apparaîtront ici.
            </p>

          </div>



          <div className="rounded-3xl border border-white/10 bg-white/5 p-8">

            <h3 className="text-2xl font-black">
              🎨 Mes créations
            </h3>

            <p className="mt-4 text-gray-400">
              Tes créations IA seront sauvegardées ici.
            </p>

          </div>


        </div>


      </div>

    </main>

  );
}