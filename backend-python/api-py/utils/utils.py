import json
import os
from openai import AsyncOpenAI
from sentiment_analysis.sentimentAnalysis import analyze_sentiments
import requests


def write_json(path, iterable):
    """
    Writes an iterable to a JSON file.

    Args:
        path (str): The file path where the JSON will be saved.
        iterable (iterable): Data to be written (must be JSON-serializable).
    """
    with open(path, "w", encoding="utf-8") as file:
        json.dump(iterable, file, indent=4, ensure_ascii=False)


language = "Spanish"

async def generate_summary(data, included_words):
    openai_client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    texts = []
    for item in data:
        post_text = f"Post: {item['text']}\nComentarios:\n"
        comments_text = "\n".join([comment['text'] for comment in item['comments']])
        texts.append(post_text + comments_text)

    all_texts = "\n".join(texts)

    chat_completion = await openai_client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are an assistant summarizing Reddit mentions. You must write a comprehensive summary of the following texts and provide the main positive and negative points. Use prose, do not add too much bullet points or lists."},
            {"role": "user", "content": f"You must focus on the following keywords: " + ", ".join(included_words) + ". Summarize the following mentions. The answer must be in {language}: \n" + all_texts}
        ],
        model="gpt-4o-mini",
        temperature=0.5,
        max_tokens=200
    )

    return chat_completion.choices[0].message.content


async def fusion_summaries(reddit_summary, bluesky_summary):
    openai_client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    
    chat_completion = await openai_client.chat.completions.create(
        messages=[
            {"role": "system", "content": "You are an assistant summarizing Reddit and Bluesky summaries. You must write a comprehensive summary of the following texts and provide the main positive and negative points. Use prose, do not add too much bullet points or lists."},
            {"role": "user", "content": f"Summarize the following Reddit and Bluesky summaries. The answer must be in {language}: \nReddit: {reddit_summary}\nBluesky: {bluesky_summary}"}
        ],
        model="gpt-4o-mini",
        temperature=0.5,
        max_tokens=200
    )

    return chat_completion.choices[0].message.content

def analyze_sentiment(data):
    mean_sentiment, sentiment_distribution = analyze_sentiments(data)
    return mean_sentiment, sentiment_distribution
    


async def send_to_main_api(result):
    response = requests.post("https://your-nextjs-api-endpoint.com/api/save_results", json=result)
    response.raise_for_status()