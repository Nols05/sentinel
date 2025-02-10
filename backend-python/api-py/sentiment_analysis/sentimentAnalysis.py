from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import json

model_name = "tabularisai/multilingual-sentiment-analysis"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

def predict_sentiment(texts):
    inputs = tokenizer(texts, return_tensors="pt", truncation=True, padding=True, max_length=512)
    with torch.no_grad():
        outputs = model(**inputs)
    probabilities = torch.nn.functional.softmax(outputs.logits, dim=-1)
    return probabilities

def calculate_score(entry):
    # Pesos para cada categoría
    weights = [0, 25, 50, 75, 100]
    score = sum(weight * prob for weight, prob in zip(weights, entry[1:]))
    return round(score, 2)

def analyze_sentiments(posts_parsed):
    
    texts = [post["text"] for post in posts_parsed if "text" in post]
    
    # Obtener las probabilidades
    probabilities = predict_sentiment(texts)

    individual_sentiments = []

    positive_count = 0
    neutral_count = 0
    negative_count = 0
    total_score = 0

    # Iterar sobre las publicaciones y sus probabilidades
    for post, probs in zip(posts_parsed, probabilities):
        probs_list = [round(prob.item(), 4) for prob in probs]
        score = calculate_score([post["text"]] + probs_list)
        
        total_score += score

        if score > 65:
            positive_count += 1
        elif 35 < score <= 65:
            neutral_count += 1
        else:
            negative_count += 1
    
        # Crear el diccionario con los detalles de la publicación
        individual_sentiment = {
            "text": post["text"],
            "user": post.get("user", "N/A"),
            "upvotes": post.get("upvotes", 0),
            "comments": post.get("comments", 0),
            "url": post.get("url", "N/A"),
            "MeanSentiment": score,
            "SentimentDistribution" : {
                "VeryNegative": round(probs[0].item(),4),
                "Negative": round(probs[1].item(),4),
                "Neutral": round(probs[2].item(),4),
                "Positive": round(probs[3].item(),4),
                "VeryPositive": round(probs[4].item(),4)
            }  
        }
    
        individual_sentiments.append(individual_sentiment)
    
    mean_of_sentiments = round(total_score / len(individual_sentiments), 2) if individual_sentiments else 0

    sentiment_distribution = {
        "positive": round(positive_count / len(individual_sentiments), 2),
        "neutral": round(neutral_count / len(individual_sentiments), 2),
        "negative": round(negative_count / len(individual_sentiments), 2),
    }
    
    return mean_of_sentiments, sentiment_distribution


