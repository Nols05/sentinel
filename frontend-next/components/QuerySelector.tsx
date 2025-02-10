"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export function QuerySelector({ queries }) {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        // Extract query id from the URL params (e.g., "/dashboard/data/:queryId")
        const queryId = pathname.split("/").pop();
        setQuery(queryId || "");  // Set the query based on the URL or default to empty
    }, [pathname]);

    useEffect(() => {
        if (!query) return;
        router.push("/dashboard/data/" + query);
    }, [query, router]);

    return (
        <div className="space-y-2 max-w-md">
            <h2 className="font-bold">Datos de la Consulta</h2>
            <select
                className="w-full border rounded-lg p-2 bg-white"
                value={query} // Set the selected query
                onChange={(e) => { setQuery(e.target.value) }}
            >
                {queries.map(query => (
                    <option key={query.id} value={query.id}>
                        {query.name}
                    </option>
                ))}
            </select>
        </div>
    );
}
