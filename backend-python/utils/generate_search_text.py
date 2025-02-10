# Gets the included words & excluded words arrays and returns a search text to use to the api


def generate_search_text(included, excluded, since_date=None):

    result = " ".join(included) + " -" + " -".join(excluded)

    if since_date != None:
        result += " since:" + since_date.strftime("%y-%m-%d")

    return result
