"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { products } from "@/config/products";


export default function Creer() {


  const inputRef = useRef<HTMLInputElement>(null);


  const [image,setImage] = useState<File|null>(null);
  const [preview,setPreview] = useState<string|null>(null);

  const [category,setCategory] = useState<any>(null);
  const [option,setOption] = useState<any>(null);

  const [generated,setGenerated] = useState<string|null>(null);

  const [loading,setLoading] = useState(false);




  function handleImage(file:File){

    setImage(file);
    setPreview(URL.createObjectURL(file));
    setGenerated(null);

  }







  async function generate(){


    if(!image || !option){

      alert("Choisis une image et un format");
      return;

    }


    setLoading(true);



    const formData = new FormData();


    formData.append(
      "image",
      image
    );


    formData.append(
      "size",
      option.size
    );


    formData.append(
      "format",
      option.format
    );




    try{


      const res = await fetch(
        "/api/generate",
        {
          method:"POST",
          body:formData
        }
      );



      const data = await res.json();



      if(data.success){

        setGenerated(data.imageUrl);

      }

      else{

        alert(data.error);

      }



    }

    catch(e){

      console.log(e);
      alert("Erreur génération");

    }



    setLoading(false);


  }









  return (

<main className="min-h-screen bg-black text-white px-8 py-20">


<div className="max-w-6xl mx-auto">



<p className="text-yellow-400 tracking-[0.5em]">
LUMORA AI
</p>



<h1 className="text-6xl font-black mt-5">
Crée ton œuvre
</h1>


<p className="text-gray-400 text-xl mt-4">
Transforme ta photo en peinture premium.
</p>






<div

onClick={()=>inputRef.current?.click()}

className="
mt-12
h-[450px]
rounded-3xl
border-2
border-dashed
border-yellow-400
flex
items-center
justify-center
cursor-pointer
overflow-hidden
"

>



{
preview ?


<Image

src={preview}

alt="preview"

width={1000}

height={600}

className="w-full h-full object-contain"

/>



:


<div className="text-center">

<div className="text-7xl">
📸
</div>


<h2 className="text-3xl font-bold mt-5">
Ajoute ta photo
</h2>


<p className="text-gray-400">
JPG / PNG
</p>


</div>



}



</div>





<input

ref={inputRef}

type="file"

accept="image/*"

hidden

onChange={(e)=>{

if(e.target.files?.[0])
handleImage(e.target.files[0])

}}

/>









<h2 className="text-3xl font-bold mt-14">
Choisis ton support
</h2>





<div className="grid md:grid-cols-3 gap-5 mt-8">


{

products.map((p)=>


<button

key={p.id}

onClick={()=>{

setCategory(p);
setOption(null);

}}


className={`
p-6
rounded-3xl
text-left
border
${category?.id===p.id
?
"border-yellow-400 bg-yellow-400 text-black"
:
"border-gray-700"
}
`}


>


<h3 className="text-2xl font-bold">
{p.name}
</h3>


<p className="mt-2 opacity-70">
{p.description}
</p>


</button>


)

}



</div>








{

category &&

<div className="mt-12">


<h2 className="text-3xl font-bold">
Choisis ton modèle
</h2>



<div className="grid md:grid-cols-3 gap-5 mt-6">



{

category.options.map((o:any)=>



<button

key={o.name}

onClick={()=>setOption(o)}


className={`
p-5
rounded-3xl
border
text-left

${option?.name===o.name
?
"border-yellow-400 bg-yellow-400 text-black"
:
"border-gray-700"
}

`}


>


<h3 className="font-bold text-xl">
{o.name}
</h3>


<p>
{o.format}
</p>


<p className="mt-3 text-yellow-400 font-bold">
{o.price} €
</p>


</button>


)


}



</div>



</div>

}







<button

onClick={generate}

disabled={!image || !option || loading}

className="
mt-12
bg-yellow-400
text-black
px-12
py-5
rounded-full
text-xl
font-bold
disabled:opacity-40
"


>


{

loading
?
"Création..."
:
option
?
`Créer mon wallpaper - ${option.price}€`
:
"Choisir un format"

}


</button>









{

generated &&

<div className="mt-16">


<h2 className="text-4xl font-bold mb-6">
Ton résultat 🎨
</h2>


<img

src={generated}

className="rounded-3xl"

/>


</div>


}





</div>


</main>


  );

}