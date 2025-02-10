import praw

reddit = praw.Reddit(
        client_id='gbb-QTf24LVgBy5CMNxxwA',
        client_secret='DBXD4FO3cs9lTfKYkUUt347T9i2BNQ',
        user_agent='sentinelTest',
        check_for_async=False
    )

async def fetch_reddit_data(included_words, start_date=None, end_date=None, limit=200):
    # Construir la query de palabras clave en el título
    query = " ".join([f'title:{word}' for word in included_words])
    
    # Añadir las fechas solo si están presentes
    if start_date and end_date:
        query += f" timestamp:{start_date}..{end_date}"

    subreddit = reddit.subreddit("all")
    posts = subreddit.search(query, sort="new", limit=limit)
    
    posts_parsed = []
    
    # Iterar sobre los posts
    for post in posts:
      
        if not post.selftext:
            continue
        
        print(post.title)
        # Cargar los comentarios antes de acceder a ellos
        post.comments.replace_more(limit=None)  # No necesitamos async para esto
        
        comments = []
        
        for comment in post.comments.list():
            if not comment.body:
                continue
            
            comments.append({
                "text": comment.body,
                "user": comment.author.name if comment.author else "[deleted]",
                "upvotes": comment.score,
            })
        
        posts_parsed.append({
            "title": post.title,
            "text": post.selftext,
            "user": post.author.name if post.author else "[deleted]",
            "upvotes": post.score,
            "comments": comments,
            "url": f"https://www.reddit.com{post.permalink}" if "reddit.com" not in post.url else post.url
        })
    
    topMentions = sorted(posts_parsed, key=lambda x: x["upvotes"], reverse=True)[:10]
    
    return posts_parsed, topMentions


# Ejemplo de uso
# async def main():
#     included_words = ["elon", "musk"]

#     reddit_data, top_mentions = await fetch_reddit_data(included_words)
#     for post in reddit_data:
#         print(post["title"])
#         print(post["text"])
#         print("Comments:")
#         for comment in post["comments"]:
#             print(f"  {comment['text']}")
#         print("\n\n")

#     print("\n#################Top Mentions:###########################", top_mentions)


# if __name__ == "__main__":
#     import asyncio
#     asyncio.run(main())