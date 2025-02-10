from atproto import Client
from datetime import datetime
import asyncio

# Configuración de la API
BLUESKY_USERNAME = "sentinelupv2025.bsky.social"
BLUESKY_PASSWORD = "sentinelupv"


async def fetch_bluesky_data(included_words, start_date=None, end_date=None, limit=100):
    client = Client()
    client.login(BLUESKY_USERNAME, BLUESKY_PASSWORD) 

    # Prepare search parameters
    search_params = {"q": included_words[0], "limit": limit, "sort": "latest"}
    
    # Add date filters if provided
    if start_date:
        search_params["since"] = start_date.strftime("%Y-%m-%dT%H:%M:%SZ")
    if end_date:
        search_params["until"] = end_date.strftime("%Y-%m-%dT%H:%M:%SZ")

    # Search using parameters
    search_results = client.app.bsky.feed.search_posts(params=search_params)  

    posts_parsed = []
    for post in search_results.posts:
        # Check if post contains all keywords (case-insensitive)
        text_lower = post.record.text.lower()
        if all(word.lower() in text_lower for word in included_words):
            comments = []
            # Fetch comments for the post
            post_thread = client.app.bsky.feed.get_post_thread(params={"uri": post.uri})  # Await the thread fetch
            for reply in post_thread.thread.replies or []:
                if hasattr(reply, "post") and reply.post:  # Check if the reply has a post
                    comment_text_lower = reply.post.record.text.lower()
                    if all(word.lower() in comment_text_lower for word in included_words):
                        comments.append({
                            "text": reply.post.record.text,
                            "user": reply.post.author.handle,
                            "likes": reply.post.like_count,
                        })
            posts_parsed.append({
                "title": post.record.text[:50],
                "text": post.record.text,
                "user": post.author.handle,
                "likes": post.like_count,
                "comments": comments,
                "url": f"https://bsky.app/profile/{post.author.handle}/post/{post.uri.split('/')[-1]}"

            })

    # Sort by likes and get top mentions
    top_mentions = sorted(posts_parsed, key=lambda x: x["likes"], reverse=True)[:10]
    return posts_parsed, top_mentions


