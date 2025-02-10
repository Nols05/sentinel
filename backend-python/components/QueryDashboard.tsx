import Image from "next/image";
import { getResult } from "@/lib/queryActions";





export async function QueryDashboard({ id }: { id: string }) {

    const result = await getResult(new Date());

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4 w-full">
                <div className="space-y-2 border rounded-lg p-4 bg-white flex-grow">
                    <h2 className="font-bold">Resumen General</h2>

                    <div className="flex items-center gap-2">
                        <Image src="/smiley.webp" width={70} height={70} alt="smiley" />
                        <p className="font-bold text-2xl">
                            68/100
                        </p>
                    </div>

                    <p className="font-semibold">¡Se ve genial! :)</p>

                    <div className="flex items-center gap-2">
                        <p className="text-green-500 text-3xl">·</p>
                        58% Positivo
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-yellow-500 text-3xl">·</p>
                        30% Neutral
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-red-500 text-3xl">·</p>
                        12% Negativo
                    </div>
                </div>

                <div className="space-y-2 border p-4 rounded-lg bg-white flex-grow">
                    <h2 className="font-bold">X (Bluesky)</h2>
                    <Image src="/Xlogo.png" alt="X" width={65} height={70} className="rounded-full" />
                    <p className="font-semibold">¡Se ve genial! :)</p>

                    <div className="flex items-center gap-2">
                        <p className="text-green-500 text-3xl">·</p>
                        58% Positivo
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-yellow-500 text-3xl">·</p>
                        30% Neutral
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-red-500 text-3xl">·</p>
                        12% Negativo
                    </div>
                </div>

                <div className="border space-y-2 p-4 rounded-lg bg-white flex-grow">
                    <h2 className="font-bold">Reddit</h2>
                    <Image src="/reddit.png" alt="reddit" width={70} height={70} className="rounded-lg" />
                    <p className="font-semibold">¡Se ve genial! :)</p>

                    <div className="flex items-center gap-2">
                        <p className="text-green-500 text-3xl">·</p>
                        58% Positivo
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-yellow-500 text-3xl">·</p>
                        30% Neutral
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-red-500 text-3xl">·</p>
                        12% Negativo
                    </div>
                </div>
            </div>

            <div className="w-full border rounded-lg p-6 bg-white">
                <h2 className="font-bold">Resumen de la Semana</h2>
                <p className="text-gray-500 max-w-4xl my-4">
                    Esta semana, hay mucho entusiasmo en torno a la interfaz de usuario limpia y moderna, que muchos usuarios elogian por su diseño intuitivo y estética elegante. Las características recién introducidas también han generado emoción, y los usuarios destacan cómo agregan un valor significativo a la experiencia general. Sin embargo, no todos los comentarios han sido positivos. Han surgido algunas preocupaciones sobre la estructura de precios, y los usuarios cuestionan su competitividad y asequibilidad.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <h3 className="font-semibold text-green-600">Puntos Destacados</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">▲</span>
                                <span>Interfaz de usuario limpia e intuitiva</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-green-500">▲</span>
                                <span>Buena recepción de nuevas funciones</span>
                            </li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-semibold text-red-600">Áreas de Preocupación</h3>
                        <ul className="space-y-2">
                            <li className="flex items-center gap-2">
                                <span className="text-red-500">▼</span>
                                <span>Precios de funciones premium</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-red-500">▼</span>
                                <span>Problemas técnicos en la app móvil</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-full border rounded-lg p-6 bg-white">
                <h2 className="font-bold mb-4">Sentimiento a lo largo del tiempo</h2>
                <div className="w-full h-[400px] bg-gray-50 rounded-lg p-4">
                    <div className="w-full h-full relative flex items-end">
                        <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-sm text-gray-600">
                            <span>100%</span>
                            <span>75%</span>
                            <span>50%</span>
                            <span>25%</span>
                            <span>0%</span>
                        </div>
                        <div className="absolute bottom-0 left-12 right-0 h-6 flex justify-between text-sm text-gray-600">
                            <span>Ene</span>
                            <span>Feb</span>
                            <span>Mar</span>
                            <span>Abr</span>
                            <span>May</span>
                            <span>Jun</span>
                        </div>
                        <svg className="w-full h-[calc(100%-24px)] ml-12" viewBox="0 0 100 100" preserveAspectRatio="none">
                            <path
                                d="M 0,50 Q 25,20 50,50 T 100,50"
                                fill="none"
                                stroke="#22c55e"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    )
}