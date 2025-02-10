const mockQueries = [
    {
        id: 1,
        query: "Ikea España",
        status: "active",
        mentions: 1234,
        sentiment: 0.8,
        lastUpdated: "2024-01-20",
    },
    {
        id: 2,
        query: "Nike Running",
        status: "paused",
        mentions: 856,
        sentiment: 0.6,
        lastUpdated: "2024-01-19",
    },
    // Add more mock data as needed
];

export default function QueriesPage() {
    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Mis búsquedas</h1>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700">
                    Nueva búsqueda
                </button>
            </div>

            <div className="bg-white rounded-lg shadow">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-600">
                        <thead className="text-xs uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">Búsqueda</th>
                                <th className="px-6 py-3">Estado</th>
                                <th className="px-6 py-3">Menciones</th>
                                <th className="px-6 py-3">Sentimiento</th>
                                <th className="px-6 py-3">Última actualización</th>
                                <th className="px-6 py-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockQueries.map((query) => (
                                <tr key={query.id} className="border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-800">
                                        {query.query}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${query.status === 'active'
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {query.status === 'active' ? 'Activa' : 'Pausada'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">{query.mentions.toLocaleString()}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className={`h-2 w-24 rounded ${query.sentiment > 0.6
                                                ? 'bg-green-500'
                                                : query.sentiment > 0.4
                                                    ? 'bg-yellow-500'
                                                    : 'bg-red-500'
                                                }`}>
                                                <div
                                                    className="h-2 rounded bg-opacity-40 bg-white"
                                                    style={{ width: `${(1 - query.sentiment) * 100}%` }}
                                                />
                                            </div>
                                            <span className="ml-2">{(query.sentiment * 100).toFixed(0)}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{query.lastUpdated}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-gray-600 hover:text-gray-900 mr-2">
                                            <span className="sr-only">Editar</span>
                                            ✏️
                                        </button>
                                        <button className="text-gray-600 hover:text-gray-900">
                                            <span className="sr-only">Eliminar</span>
                                            🗑️
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
