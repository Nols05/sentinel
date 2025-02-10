from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import asyncio
from reddit import fetch_reddit_data
from bluesky import fetch_bluesky_data
from utils.utils import analyze_sentiment, generate_summary, fusion_summaries
import httpx
from typing import Optional


app = FastAPI()
queue = asyncio.Queue()


class SearchQuery(BaseModel):
    queryId: str
    included_words: list[str]
    excluded_words: list[str]
    start_date: Optional[str] = None
    end_date: Optional[str] = None





async def process_query(query: SearchQuery):
    

    try:
        reddit_task = fetch_reddit_data(query.included_words, query.start_date, query.end_date)
        bluesky_task = fetch_bluesky_data(query.included_words, query.start_date, query.end_date)

        (reddit_data, topMentionsReddit), (bluesky_data, topMentionsBluesky) = await asyncio.gather(
            reddit_task, bluesky_task
        )

        mean_sentiment_reddit, sentiment_distribution_reddit = analyze_sentiment(reddit_data)
        mean_sentiment_bluesky, sentiment_distribution_bluesky = analyze_sentiment(bluesky_data)

        reddit_summary = await generate_summary(topMentionsReddit, query.included_words)
        bluesky_summary = await generate_summary(topMentionsBluesky, query.included_words)

        topMentionsReddit = [{"url": x["url"], "title": x["title"]} for x in topMentionsReddit]
        topMentionsBluesky = [{"url": x["url"], "title": x["title"]} for x in topMentionsBluesky]



        fullSentiment = (mean_sentiment_reddit + mean_sentiment_bluesky) / 2
        fullDistribution = {
            "positive": (sentiment_distribution_reddit["positive"] + sentiment_distribution_bluesky["positive"]) / 2,
            "neutral": (sentiment_distribution_reddit["neutral"] + sentiment_distribution_bluesky["neutral"]) / 2,
            "negative": (sentiment_distribution_reddit["negative"] + sentiment_distribution_bluesky["negative"]) / 2,
        }

        result = {
            "queryId": query.queryId,
            "fullSummary": await fusion_summaries(reddit_summary, bluesky_summary),
            "fullSentiment": fullSentiment,
            "fullDistribution": fullDistribution,
            "reddit": {
                "volume": len(reddit_data),
                "meanSentiment": mean_sentiment_reddit,
                "sentimentDistribution": sentiment_distribution_reddit,
                "summary": reddit_summary,
                "topMentions": topMentionsReddit
            },
            "bluesky": {
                "volume": len(bluesky_data),
                "meanSentiment": mean_sentiment_bluesky,
                "sentimentDistribution": sentiment_distribution_bluesky,
                "summary": bluesky_summary,
                "topMentions": topMentionsBluesky
            },
        }

        # ? Devuelve el resultado
        async with httpx.AsyncClient() as client:
            print("Sending results to main API")
            response = await client.post(
                "http://localhost:3000/api/result", json=result
            )
            if response.status_code >= 400:
                raise HTTPException(
                    status_code=response.status_code, detail="Failed to send results"
                )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Recibe un array de queries y las añade a la cola
@app.post("/start_search")
async def start_search(query: SearchQuery):
    await queue.put(query)
    return {"status": "queries added to queue"}


# ? Activa el servidor
async def worker():
    while True:
        query = await queue.get()
        await process_query(query)
        queue.task_done()


# Iniciar el worker
@app.on_event("startup")
async def startup_event():
    asyncio.create_task(worker())
