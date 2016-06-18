#v1.17.1
import os
import cPickle

import twitter
import json

from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk import tokenize
#import json

# First: Go to http://twitter.com/apps/new to create an app and get values
# for these credentials that you'll need to provide in place of these
# empty string values that are defined as placeholders.
# See https://dev.twitter.com/docs/auth/oauth for more information
# on Twitter's OAuth implementation.

#FILL IN HERE
#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
CONSUMER_KEY = "..."
CONSUMER_SECRET = "..."
OAUTH_TOKEN = "..."
OAUTH_TOKEN_SECRET = "..."
#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

#WORLD_WOE_ID = 1
#US_WOE_ID = 23424977
#JP_WOE_ID = 23424856

def oauth_login():
    twitter_api = twitter.Twitter(auth=twitter.oauth.OAuth(OAUTH_TOKEN, OAUTH_TOKEN_SECRET, CONSUMER_KEY, CONSUMER_SECRET))
    return twitter_api

def gather_tweets_scores(twitter_api, topic="", data_path="data.dump"):
    if os.path.exists(data_path):
        result = cPickle.load(open(data_path, "r"))
    else:
        result = {}

    sid = SentimentIntensityAnalyzer()

    tweets = twitter_api.search.tweets(q=topic, count=100)
    for tweet in tweets["statuses"]:
        date = tweet["created_at"]
        sentences = tweet["text"]
        score = sid.polarity_scores(sentences)['compound']
        if date not in result:
            result[date] = [score]
        else:
            result[date].append(score)

    cPickle.dump(result, open(data_path, "w+"))

    return result

if __name__ == "__main__":
    twitter_api = oauth_login()
    gather_tweets_scores(twitter_api, topic="...")