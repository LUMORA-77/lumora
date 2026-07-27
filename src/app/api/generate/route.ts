import OpenAI from "openai";
import { NextResponse } from "next/server";


const openai = new OpenAI({

  apiKey: process.env.OPENAI_API_KEY,

});





export async function POST(req: Request) {


  try {


    const formData = await req.formData();



    const image = formData.get("image") as File;

    const sizeChosen = formData.get("size") as string;

    const format = formData.get("format") as string;




    if(!image){


      return NextResponse.json({

        success:false,

        error:"Aucune image envoyée"

      });

    }





    let size:
    "1024x1024"
    |
    "1024x1536"
    |
    "1536x1024";




    // OpenAI accepte uniquement ces tailles
    if(sizeChosen === "1024x1024"){

      size = "1024x1024";

    }

    else if(sizeChosen === "1024x1536"){

      size = "1024x1536";

    }

    else{

      size = "1536x1024";

    }







    const result = await openai.images.edit({



      model:"gpt-image-1",



      image:image,



      size:size,




      prompt:`

You are LUMORA AI, a luxury digital art studio.

Transform this photo into a premium oil painting wallpaper.

IMPORTANT:
- Keep the original person/object/location exactly the same.
- Preserve the identity and composition.
- Do not change the subject.
- Do not add new objects.

ART STYLE:

- realistic oil painting
- museum quality artwork
- luxury canvas texture
- visible professional brush strokes
- cinematic lighting
- deep realistic colors
- premium gallery feeling
- masterpiece painting style

The final image should look like a famous artist painted the original photo on a high-end canvas.

Wallpaper format:
${format}

Requirements:
- clean composition
- high detail
- no text
- no logo
- no watermark
- professional wallpaper quality

`


    });







    const base64 =
    result.data[0]?.b64_json;





    if(!base64){


      return NextResponse.json({

        success:false,

        error:"Pas d'image générée"

      });


    }





    return NextResponse.json({


      success:true,


      imageUrl:
      `data:image/png;base64,${base64}`


    });






  }

  catch(error:any){



    console.error(
      "Erreur génération :",
      error
    );



    return NextResponse.json({

      success:false,

      error:
      error.message ||
      "Erreur inconnue"

    });



  }



}