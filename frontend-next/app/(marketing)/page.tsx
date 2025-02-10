import { RedditIcon } from "@/components/icons/RedditIcon"
import { BlueskyIcon } from "@/components/icons/BlueskyIcon";
import MockTweet from "@/components/MockTweet"

export default function Home() {
  return (
    <div className="relative overflow-hidden min-h-screen">
      <MockTweet position="left-24 top-32 -rotate-6" avatar="https://i.pravatar.cc/300" username="@usuario123" time="hace 2h" text="Me encanta el servicio de Ikea! La atención al cliente es excepcional 🌟" />
      <MockTweet position="right-24 top-64 rotate-6" avatar="https://i.pravatar.cc/300" username="@cliente_feliz" time="hace 5h" text="Los productos de @sentinel son increíbles. Definitivamente volveré a comprar! 💯" />
      <MockTweet position="left-32 bottom-80 -rotate-3" avatar="https://i.pravatar.cc/301" username="@marketingpro" time="hace 1h" text="La nueva colección de Nike es justo lo que necesitaba. ¡Excelente calidad! 👌" />
      <MockTweet position="left-1/2 -translate-x-1/2 bottom-56" avatar="https://i.pravatar.cc/303" username="@shopaholic" time="hace 4h" text="La experiencia de compra en Zara es increíble. ¡El personal siempre tan amable! 🛍️✨" />
      <MockTweet position="right-32 bottom-80 rotate-3" avatar="https://i.pravatar.cc/302" username="@tech_lover" time="hace 3h" text="No puedo creer lo rápido que llegó mi pedido de Amazon. El servicio al cliente es 10/10 ⚡️" />

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl text-balance font-bold text-gray-800">
            Descubre qué opina la gente sobre <span className="text-red-500">tu marca</span>
          </h1>

          <p className="mt-5 text-gray-600">
            Recibe un resumen semanal de las opiniones de tus clientes en redes sociales.
            <br />
            <span className="text-gray-600">Encuentra publicaciones destacadas, usuarios influyentes y mucho más.</span>
          </p>


          <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
            <div className="relative z-10 flex gap-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100">
              <div className="w-full">
                <label htmlFor="hs-search-article-1" className="block text-sm text-gray-700 font-medium"><span className="sr-only">Tu marca</span></label>
                <input type="email" name="hs-search-article-1" id="hs-search-article-1" className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-red-500 focus:ring-red-500" placeholder="Ikea, Apple, BlueMigrate..." />
              </div>
              <div>
                <a className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-red-600 text-white hover:bg-red-700 focus:outline-none focus:bg-red-700 disabled:opacity-50 disabled:pointer-events-none" href="/dashboard">
                  <svg className="shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
                </a>
              </div>
            </div>


            <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
              <svg className="w-16 h-auto text-orange-500" width="100" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
                <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
              </svg>
            </div>

            <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
              <svg className="w-40 h-auto text-red-500" width="347" height="188" viewBox="0 0 347 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <div className="mt-10 flex gap-6 justify-center">
            <BlueskyIcon className="size-6" />

            <svg className="size-6" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Reddit</title><path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-2.286 2.286C.775 23.225 1.097 24 1.738 24H12c6.627 0 12-5.373 12-12S18.627 0 12 0Zm4.388 3.199c1.104 0 1.999.895 1.999 1.999 0 1.105-.895 2-1.999 2-.946 0-1.739-.657-1.947-1.539v.002c-1.147.162-2.032 1.15-2.032 2.341v.007c1.776.067 3.4.567 4.686 1.363.473-.363 1.064-.58 1.707-.58 1.547 0 2.802 1.254 2.802 2.802 0 1.117-.655 2.081-1.601 2.531-.088 3.256-3.637 5.876-7.997 5.876-4.361 0-7.905-2.617-7.998-5.87-.954-.447-1.614-1.415-1.614-2.538 0-1.548 1.255-2.802 2.803-2.802.645 0 1.239.218 1.712.585 1.275-.79 2.881-1.291 4.64-1.365v-.01c0-1.663 1.263-3.034 2.88-3.207.188-.911.993-1.595 1.959-1.595Zm-8.085 8.376c-.784 0-1.459.78-1.506 1.797-.047 1.016.64 1.429 1.426 1.429.786 0 1.371-.369 1.418-1.385.047-1.017-.553-1.841-1.338-1.841Zm7.406 0c-.786 0-1.385.824-1.338 1.841.047 1.017.634 1.385 1.418 1.385.785 0 1.473-.413 1.426-1.429-.046-1.017-.721-1.797-1.506-1.797Zm-3.703 4.013c-.974 0-1.907.048-2.77.135-.147.015-.241.168-.183.305.483 1.154 1.622 1.964 2.953 1.964 1.33 0 2.47-.81 2.953-1.964.057-.137-.037-.29-.184-.305-.863-.087-1.795-.135-2.769-.135Z" /></svg>
          </div>



        </div>



      </div>
    </div>




  );
}
