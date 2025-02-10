


//has url and title
export function TopRedditMentions({ redditMentions }) {
    if (redditMentions.length === 0) return null;
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold">Menciones Principales en Reddit</h2>
            <div className="space-y-4 mt-4">
                {redditMentions.map((mention, index) => (
                    <div key={index} className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-orange-600 rounded-full"></div>
                        <a href={mention.url} target="_blank" className="text-orange-600 hover:cursor-pointer">{mention.title}</a>
                    </div>
                ))}
            </div>
        </div>
    )
}