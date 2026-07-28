import Stripe from "stripe";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

const stripe = new Stripe(
  process.env.STRIPE_SECRET_KEY!
);


export async function POST(req: Request) {

  try {

    const { userId } = await auth();

    const { cart } = await req.json();


    if (!cart || cart.length === 0) {

      return NextResponse.json(
        {
          error: "Panier vide"
        },
        {
          status: 400
        }
      );

    }


    const session = await stripe.checkout.sessions.create({

      mode: "payment",


      metadata: {

        userId: userId || "guest",

      },


      payment_method_types: [

        "card"

      ],


      line_items: cart.map((item: any) => ({

        price_data: {

          currency: "eur",


          product_data: {

            name: item.title,


            images: [

              `${process.env.NEXT_PUBLIC_BASE_URL}${item.image}`

            ],

          },


          unit_amount: Math.round(

            Number(item.price) * 100

          ),

        },


        quantity: 1,


      })),


      success_url:

        `${process.env.NEXT_PUBLIC_BASE_URL}/success`,


      cancel_url:

        `${process.env.NEXT_PUBLIC_BASE_URL}/panier`,


    });



    console.log(
      "Stripe URL :",
      session.url
    );


    return NextResponse.json({

      url: session.url,

    });



  } catch (err: any) {


    console.error(

      "ERREUR STRIPE :",

      err

    );


    return NextResponse.json(

      {

        error: err.message || "Erreur Stripe"

      },


      {

        status: 500

      }

    );


  }

}