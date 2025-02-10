"use client"

import { useEffect, useState } from "react";
import SentimentTrendChart from "../sentiment-trend-chart";
import { SentimentCard } from "./SentimentCard";
import { WeeklySummary } from "./WeeklySummary";
import { Result } from "@prisma/client";
import { Loader } from "../Loader";

export function RedditData({ queryId, result }) {
    const [data, setData] = useState(result);

    useEffect(() => {
        async function checkStatus() {
            const res = await fetch(`/api/status`, { method: 'POST', body: JSON.stringify({ queryId }) });
            const data = await res.json();

            if (data.success) {
                setData(data.result);
            }
        }

        // Initial check
        checkStatus();

        // Set up interval to check every 10 seconds
        const interval = setInterval(checkStatus, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [queryId]);

    if (!data) {
        return <Loader />;
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-4 w-full">
                <SentimentCard
                    title="Resumen General"
                    imageSrc="/smiley.webp"
                    imageAlt="smiley"
                    distribution={data.fullDistribution}
                    summary={`${data.fullSentiment * 100}%`}
                />

                <SentimentCard
                    title="Bluesky"
                    imageSrc="/blueskyIcon.png"
                    imageAlt="X"
                    distribution={data.blueskyDistribution}
                    summary="¡Se ve genial! :)"
                    imageClassName="rounded-full"
                />

                <SentimentCard
                    title="Reddit"
                    imageSrc="/reddit.png"
                    imageAlt="reddit"
                    distribution={data.redditDistribution}
                    summary="¡Se ve genial! :)"
                    imageClassName="rounded-lg"
                />
            </div>

            <WeeklySummary summary={data.fullSummary} />
            <SentimentTrendChart />
        </div >
    );
}
