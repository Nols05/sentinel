import { getResultByQueryId } from "@/lib/queryActions";
import Image from "next/image";
import SentimentTrendChart from "./sentiment-trend-chart";


const mockData = {
    "id": "1",
    "week": "2025-W01",
    "blueskyDistribution": {
        "positive": 58,
        "neutral": 30,
        "negative": 12
    },
    "redditDistribution": {
        "positive": 58,
        "neutral": 30,
        "negative": 12
    },
    "blueskyMeanSentiment": 0.68,
    "redditMeanSentiment": 0.68,
    "fullSentiment": 0.68,
    "blueskySummary": "¡Se ve genial! :)",
    "redditSummary": "¡Se ve genial! :)",
    "fullSummary": "Esta semana, hay mucho entusiasmo en torno a la interfaz de usuario limpia y moderna, que muchos usuarios elogian por su diseño intuitivo y estética elegante. Las características recién introducidas también han generado emoción, y los usuarios destacan cómo agregan un valor significativo a la experiencia general. Sin embargo, no todos los comentarios han sido positivos. Han surgido algunas preocupaciones sobre la estructura de precios, y los usuarios cuestionan su competitividad y asequibilidad.",
    "blueskyVolume": 500,
    "redditVolume": 300,
    "createdAt": "2025-01-02T00:00:00Z",
    "updatedAt": "2025-01-08T00:00:00Z"
}




export function DashboardData({ queryId }: { queryId: string }) {

    let result;

    try {
        // result = await getResultByQueryId(queryId);
    }
    catch (error) {
        console.error('Error finding result:', error)
    }

    if (!result) {
        result = mockData;
    }



    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4 w-full">
                <div className="space-y-2 border rounded-lg p-4 bg-white flex-grow">
                    <h2 className="font-bold">Resumen General</h2>

                    <div className="flex items-center gap-2">
                        <Image src="/smiley.webp" width={70} height={70} alt="smiley" />
                        <p className="font-bold text-2xl">
                            {result.fullSentiment * 100}%
                        </p>
                    </div>

                    <p className="font-semibold">¡Se ve genial! :)</p>


                    {/* TODO: ESTO DEBERIA SER FULL DISTRIBUTION */}
                    <div className="flex items-center gap-2">
                        <p className="text-green-500 text-3xl">·</p>
                        {/* 58% Positivo */}
                        {result.blueskyDistribution.positive}% Positivo
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-yellow-500 text-3xl">·</p>
                        {/* 30% Neutral */}
                        {result.blueskyDistribution.neutral}% Neutral
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-red-500 text-3xl">·</p>
                        {/* 12% Negativo */}
                        {result.blueskyDistribution.negative}% Negativo
                    </div>
                </div>

                <div className="space-y-2 border p-4 rounded-lg bg-white flex-grow">
                    <h2 className="font-bold">Bluesky</h2>
                    <Image src="/Xlogo.png" alt="X" width={65} height={70} className="rounded-full" />
                    <p className="font-semibold">¡Se ve genial! :)</p>

                    <div className="flex items-center gap-2">
                        <p className="text-green-500 text-3xl">·</p>
                        {/* 58% Positivo */}
                        {result.blueskyDistribution.positive}% Positivo
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-yellow-500 text-3xl">·</p>
                        {/* 30% Neutral */}
                        {result.blueskyDistribution.neutral}% Neutral
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-red-500 text-3xl">·</p>
                        {/* 12% Negativo */}
                        {result.blueskyDistribution.negative}% Negativo

                    </div>
                </div>

                <div className="border space-y-2 p-4 rounded-lg bg-white flex-grow">
                    <h2 className="font-bold">Reddit</h2>
                    <Image src="/reddit.png" alt="reddit" width={70} height={70} className="rounded-lg" />
                    <p className="font-semibold">¡Se ve genial! :)</p>

                    <div className="flex items-center gap-2">
                        <p className="text-green-500 text-3xl">·</p>
                        {/* 58% Positivo */}
                        {result.redditDistribution.positive}% Positivo
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-yellow-500 text-3xl">·</p>
                        {/* 30% Neutral */}
                        {result.redditDistribution.neutral}% Neutral
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-red-500 text-3xl">·</p>
                        {/* 12% Negativo */}
                        {result.redditDistribution.negative}% Negativo
                    </div>
                </div>
            </div>

            <div className="w-full border rounded-lg p-6 bg-white">
                <h2 className="font-bold">Resumen de la Semana</h2>
                <p className="text-gray-500 max-w-4xl my-4">
                    {/* Esta semana, hay mucho entusiasmo en torno a la interfaz de usuario limpia y moderna, que muchos usuarios elogian por su diseño intuitivo y estética elegante. Las características recién introducidas también han generado emoción, y los usuarios destacan cómo agregan un valor significativo a la experiencia general. Sin embargo, no todos los comentarios han sido positivos. Han surgido algunas preocupaciones sobre la estructura de precios, y los usuarios cuestionan su competitividad y asequibilidad. */}
                    {result.fullSummary}
                </p>
                {/* 
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
                </div> */}
            </div>
            <SentimentTrendChart />

        </div>
    )
}