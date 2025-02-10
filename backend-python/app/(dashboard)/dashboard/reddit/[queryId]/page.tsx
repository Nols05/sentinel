import { getUser } from "@/lib/auth";
import { getResultByQueryId, getUserQueries } from "@/lib/queryActions";
import { Result } from "@prisma/client";
import { redirect } from "next/navigation";
import { DashboardData } from "@/components/dashboard/DashboardData";
import { QuerySelector } from "@/components/QuerySelector";

const mockData = {
    "id": "1",
    "week": "2025-W01",
    "redditDistribution": {
        "positive": 58,
        "neutral": 30,
        "negative": 12
    },
    "redditMeanSentiment": 0.68,
    "redditSummary": "¡Se ve genial! :)",
    "redditVolume": 300,
    "createdAt": "2025-01-02T00:00:00Z",
    "updatedAt": "2025-01-08T00:00:00Z"
};

export default async function DashboardPage({ params }) {
    const user = await getUser();
    if (!user) { redirect('/login') }
    const queries = await getUserQueries(user?.id);

    const { queryId } = await params;

    if (!queryId) { redirect('/dashboard') }


    let result = mockData;

    try {
        result = await getResultByQueryId(queryId) as Result;
    }
    catch (error) {
        console.error('Error finding result:', error)
    }


    return (
        <div className="p-10 space-y-6">
            <div>
                <h1 className="text-2xl font-bold">¡Bienvenido de nuevo, {user.name}!</h1>
                <p className="text-gray-500">{"Esto es lo que está pasando con tu marca esta semana."}</p>
            </div>


            <QuerySelector queries={queries} />
            <DashboardData result={result} queryId={queryId} />


        </div>
    );
}