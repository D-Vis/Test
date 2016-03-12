## -*- coding: utf-8 -*-
import codecs
try:
    codecs.lookup('cp65001')
except:
    def cp65001(name):
        if name.lower() == 'cp65001':
            return codecs.lookup('utf-8')
    codecs.register(cp65001)

#v1.17.1
import twitter
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

def get_tweets_for_topics(twitter_api, topics):
    """
        Problem of forign language result in Windows:
        Codepage -> utf-8 str to local codec str
        if you don't have a operation system level code base (GBK/JIS), you can only see part of the Chinese/Japanese in console
        Therefore for now we are only using English result
    """
    #jp_trends = twitter_api.trends.place(_id=JP_WOE_ID)
    #trends_set = set([trend['name'] for trend in jp_trends[0]['trends']])
    #for t in trends_set:
    #    print t
    ##!!Problems with str display
    ######################################################################
    """
        Args:
            twitter_api: oauth_login()
            topics: str list
        Return:
            dict: {topic: tweets, ...}
    """
    return {t: twitter_api.search.tweets(q=t) for t in topics}
    
def get_retweets_count_sum(tweets):
    """
        Get the sum of all the retweets for a set of tweets
        Args:
            tweets: {
                search_metadata: {
                    count
                    completed_in
                    max_id_str
                    since_id_str
                    next_results
                    refresh_url
                    since_id
                    query
                    max_id                  
                }
                statuses: [
                    contributors
                    truncated
                    text
                    is_quote_status
                    in_reply_to_status_id
                    id
                    favorite_count
                    source
                    retweeted
                    coordinates
                    entities
                    symbols
                    user_mentions
                    hashtags
                    in_reply_to_screen_name
                    in_reply_to_user_id
                    retweet_count
                    id_str
                    favorited
                    user: {
                        follow_request_sent
                        has_extended_profile
                        profile_use_background_image
                        default_profile_image
                        id
                        profile_background_image_url_https
                        verified
                        profile_text_color
                        profile_image_url_https
                        profile_sidebar_fill_color
                        followers_count
                        profile_sidebar_border_color
                        id_str
                        profile_background_color
                        listed_count
                        is_translation_enabled
                        utc_offset
                        statuses_count
                        description
                        friends_count
                        location
                        profile_link_color
                        profile_image_url
                        following
                        geo_enabled
                        profile_banner_url
                        profile_background_image_url
                        screen_name
                        lang
                        profile_background_tile
                        favourites_count
                        name
                        notifications
                        url
                        created_at
                        contributors_enabled
                        time_zone
                        protected
                        default_profile
                        is_translator
                    }
                    geo
                    in_reply_to_user_id_str
                    possibly_sensitive
                    lang
                    created_at
                    in_reply_to_status_id_str
                    place
                    metadata: {
                        iso_language_code
                        result_type
                    }    
                ]  
            }
    """
    return sum([tweet["retweet_count"] for tweet in tweets["statuses"]])

def generate_data_for_hist(tweets_dict):
    """
        Modify this part to fit for your bar chart dataformat
    """
    result = {k: get_retweets_count_sum(v) for k, v in tweets.iteritems()}
    return result

if __name__ == "__main__":
    twitter_api = oauth_login()
    ##################
    topics = ["Trump", "Cruz", "Rubio", "Clinton"]
    tweets = get_tweets_for_topics(twitter_api, topics)
    data = generate_data_for_hist(tweets)
    print data