import { getQueryById } from "@/lib/queryActions";

export default async function QueryPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const query = await getQueryById(id);

    return (
        <div className="p-10 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Query: {query?.name}</h1>
            </div>
            <div className="flex flex-wrap gap-4 w-full">
                <div className="space-y-2 border rounded-lg p-4 bg-white flex-grow">
                    <h2 className="font-bold">Included Words</h2>
                    <ul>
                        {query?.included_words.map(word => (
                            <li key={word}>{word}</li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-2 border p-4 rounded-lg bg-white flex-grow">
                    <h2 className="font-bold">Excluded Words</h2>
                    <ul>
                        {query?.excluded_words.map(word => (
                            <li key={word}>{word}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}