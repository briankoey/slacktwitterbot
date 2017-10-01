import Twitter from 'twitter';
import SlackBot from 'slackbots';
import _ from 'lodash';

const bot = new SlackBot({
  token: '', // Add a bot https://my.slack.com/services/new/bot and put the token
  name: 'twitter_bot',
});

// Insert your own oauth-v1.0 keys
const client = new Twitter({
  consumer_key: '',
  consumer_secret: '',
  access_token_key: '',
  access_token_secret: '',
});

// Set interval and post message to specific channel "twitter_timeline"
bot.on('start', () => {
  setInterval(() => {
    client.get('statuses/home_timeline', (error, tweets) => {
      if (error) {
        throw error;
      }
      _.map(tweets, (tweet) => {
        const profileImageUrl = tweet.user.profile_image_url;
        const params = {
          icon_url: profileImageUrl || 'twitter_bot',
        };

        bot.postMessageToChannel('twitter_timeline', tweet.text, params);
      });
    });
  }, 10000);
});
