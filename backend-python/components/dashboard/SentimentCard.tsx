import Image from "next/image";



interface SentimentCardProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    distribution: { positive: number; neutral: number; negative: number };
    summary: string;
    imageClassName?: string;
}

export function SentimentCard({ title, imageSrc, imageAlt, distribution, summary, imageClassName }: SentimentCardProps) {
    return (
        <div className="space-y-2 border p-4 rounded-lg bg-white flex-grow shadow-md hover:shadow-lg transition-shadow">
            <h2 className="font-bold">{title}</h2>
            <Image src={imageSrc} alt={imageAlt} width={70} height={70} className={imageClassName} />
            <p className="font-semibold">{summary}</p>

            <div className="flex items-center gap-2">
                <p className="text-green-500 text-3xl">·</p>
                {Math.round(distribution.positive * 100)}% Positivo
            </div>

            <div className="flex items-center gap-2">
                <p className="text-yellow-500 text-3xl">·</p>
                {Math.round(distribution.neutral * 100)}% Neutral
            </div>

            <div className="flex items-center gap-2">
                <p className="text-red-500 text-3xl">·</p>
                {Math.round(distribution.negative * 100)}% Negativo
            </div>
        </div>
    );
}
