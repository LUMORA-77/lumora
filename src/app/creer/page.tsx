"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { products } from "@/config/products";
import { motion } from "framer-motion";

export default function Creer() {

  const inputRef = useRef<HTMLInputElement>(null);

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [category, setCategory] = useState<any>(null);
  const [option, setOption] = useState<any>(null);

  const [generated, setGenerated] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  function handleImage(file: File) {
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setGenerated(null);
  }

  async function generate() {

    if (!image || !option) {
      alert("Choisis une image et un format");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("image", image);
    formData.append("size", option.size);
    formData.append("format", option.format);

    try {

      const res = await fetch("/api/generate", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setGenerated(data.imageUrl);
      } else {
        alert(data.error);
      }

    } catch (e) {

      console.log(e);
      alert("Erreur génération");

    }

    setLoading(false);

  }

  return (

<main className="min-h-screen bg-[#050505] text-white overflow-hidden">

<div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#facc1520,transparent_45%)]"/>

<div className="relative max-w-7xl mx-auto px-8 py-20">

<div className="mb-16">

<span className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-6 py-2 uppercase tracking-[0.35em] text-xs text-yellow-300">
LUMORA AI
</span>

<h1 className="mt-8 text-6xl md:text-7xl font-black">
Crée ton œuvre
</h1>

<p className="mt-6 text-xl text-gray-400 max-w-3xl leading-9">
Transforme une simple photo en véritable œuvre d'art grâce à
l'intelligence artificielle.
</p>

</div>

<div className="grid xl:grid-cols-[1.5fr_420px] gap-12">
  <div>

<motion.div
whileHover={{ scale: 1.01 }}
onClick={() => inputRef.current?.click()}
className="group relative overflow-hidden rounded-[36px] border border-yellow-400/20 bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl cursor-pointer"
>

<div className="absolute inset-0 bg-[radial-gradient(circle,#facc1515,transparent_70%)] opacity-0 group-hover:opacity-100 transition duration-500"/>

{

preview ?

<Image
src={preview}
alt="preview"
width={1600}
height={900}
className="w-full h-[560px] object-contain bg-black"
/>

:

<div className="h-[560px] flex flex-col items-center justify-center">

<div className="text-8xl">
📸
</div>

<h2 className="mt-8 text-4xl font-black">
Dépose ta photo
</h2>

<p className="mt-4 text-xl text-gray-400">
Clique ici ou glisse une image
</p>

<div className="mt-10 rounded-full bg-yellow-400 px-8 py-4 text-black font-bold">
Choisir une image
</div>

</div>

}

</motion.div>

<input
ref={inputRef}
type="file"
accept="image/*"
hidden
onChange={(e)=>{
if(e.target.files?.[0]){
handleImage(e.target.files[0]);
}
}}
/>

<h2 className="text-4xl font-black mt-16">
Choisis ton support
</h2>

<div className="grid md:grid-cols-3 gap-6 mt-8">

{

products.map((p)=>(

<motion.button

key={p.id}

whileHover={{y:-6}}

whileTap={{scale:.98}}

onClick={()=>{
setCategory(p);
setOption(null);
}}

className={`
rounded-[30px]
border
p-7
text-left
transition

${
category?.id===p.id
?

"border-yellow-400 bg-yellow-400 text-black"

:

"border-white/10 bg-white/5"

}

`}

>

<h3 className="text-2xl font-black">
{p.name}
</h3>

<p className="mt-3 opacity-70 leading-7">
{p.description}
</p>

</motion.button>

))

}

</div>
{

category && (

<>

<h2 className="text-4xl font-black mt-16">
Choisis ton modèle
</h2>

<p className="mt-3 text-gray-400">
Sélectionne le format qui correspond à ton appareil.
</p>

<div className="grid md:grid-cols-3 gap-6 mt-8">

{

category.options.map((o:any)=>(

<motion.button

key={o.name}

whileHover={{y:-6}}

whileTap={{scale:.98}}

onClick={()=>setOption(o)}

className={`
relative
overflow-hidden
rounded-[30px]
border
p-7
text-left
transition

${
option?.name===o.name

?

"border-yellow-400 bg-yellow-400 text-black"

:

"border-white/10 bg-white/5"

}

`}

>

{

option?.name===o.name && (

<div className="absolute top-4 right-4 text-2xl">
✓
</div>

)

}

<h3 className="text-2xl font-black">

{o.name}

</h3>

<p className="mt-3 opacity-70">

{o.format}

</p>

<div className="mt-8 flex items-center justify-between">

<span className="text-4xl font-black">

{o.price}€

</span>

<span className="text-sm uppercase tracking-[0.25em]">

Premium

</span>

</div>

</motion.button>

))

}

</div>

{

generated && (

<div className="mt-20">

<h2 className="text-4xl font-black mb-8">

Ton résultat

</h2>

<div className="overflow-hidden rounded-[36px] border border-yellow-400/20 bg-white/5">

<img

src={generated}

className="w-full object-cover"

/>

</div>

</div>

)

}

</>

)

}

</div>
<aside className="sticky top-10 h-fit rounded-[36px] border border-white/10 bg-gradient-to-b from-white/10 to-white/5 p-8 backdrop-blur-xl">

  <span className="inline-flex rounded-full border border-yellow-400/20 bg-yellow-400/10 px-5 py-2 text-xs uppercase tracking-[0.35em] text-yellow-300">
    Récapitulatif
  </span>

  <div className="mt-10 space-y-7">

    <div className="flex items-center justify-between">

      <span className="text-gray-400">
        Support
      </span>

      <span className="font-bold">
        {category?.name || "-"}
      </span>

    </div>

    <div className="flex items-center justify-between">

      <span className="text-gray-400">
        Modèle
      </span>

      <span className="font-bold">
        {option?.name || "-"}
      </span>

    </div>

    <div className="flex items-center justify-between">

      <span className="text-gray-400">
        Résolution
      </span>

      <span className="font-bold">
        {option?.format || "-"}
      </span>

    </div>

    <div className="flex items-center justify-between">

      <span className="text-gray-400">
        Livraison
      </span>

      <span className="font-bold text-green-400">
        Instantanée
      </span>

    </div>

  </div>

  <div className="my-10 h-px bg-white/10" />

  <div className="flex items-end justify-between">

    <span className="text-xl text-gray-400">
      Total
    </span>

    <span className="text-6xl font-black text-yellow-400">
      {option ? `${option.price}€` : "--"}
    </span>

  </div>

  <button

    onClick={generate}

    disabled={!image || !option || loading}

    className="mt-10 w-full rounded-full bg-yellow-400 py-5 text-xl font-black text-black transition hover:scale-[1.02] disabled:opacity-40"

  >

    {loading ? "Création en cours..." : "Créer mon œuvre"}

  </button>

  <div className="mt-10 rounded-3xl border border-white/10 bg-black/30 p-6">

    <h3 className="font-bold text-xl">
      Inclus
    </h3>

    <ul className="mt-5 space-y-4 text-gray-300">

      <li>✓ Qualité Ultra HD</li>

      <li>✓ Téléchargement immédiat</li>

      <li>✓ Optimisé pour ton appareil</li>

      <li>✓ Généré par IA</li>

      <li>✓ Licence personnelle</li>

    </ul>

  </div>

</aside>

</div>

</div>

</main>

  );
}