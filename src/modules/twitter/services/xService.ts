import axios from 'axios';
import { TweetV2, TwitterApi } from 'twitter-api-v2';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../../infrastructure/ioc2/types';
import { logger } from '../../../utils/Logger';

export interface IXService {
  createPost(post: string, imageUrl?: string): Promise<any>;
  getCryptoTrends(): Promise<string[]>;
  getTweetsByAccount(userId: string): Promise<any>;
  uploadMediaFromUrl(imageUrl: string): Promise<string | null>;
  replyToTweet(originalTweetId: string, screenName: string): Promise<boolean>;
  getReplies(): Promise<any[]>
}

@injectable()
export class XService implements IXService {
  @inject(TYPES.TwitterApi) private client!: TwitterApi;

  constructor() {
    this.client = new TwitterApi({
      appKey: process.env.X_APP_KEY as string,
      appSecret: process.env.X_APP_SECRET as string,
      accessToken: process.env.X_ACCESS_TOKEN as string,
      accessSecret: process.env.X_ACCESS_SECRET as string,
    });

    logger.info(`[xService]: Connected successfully!!!`);
  }

  public async createPost(post: string, imageUrl?: string): Promise<any> {
    try {
      let mediaId = null;

      if (imageUrl) {
        mediaId = await this.uploadMediaFromUrl(imageUrl);
      }
      logger.info('post')
      logger.info(post)

      const { textWithoutHashtags, hashtags } =
        this.extractAndRemoveHashtags(post);

      logger.info('hashtags:',hashtags);
      const tweetParts = this.splitIntoTweets(textWithoutHashtags, hashtags);

      const thread = [];
      for (const [index, tweet] of tweetParts.entries()) {
        let post: any = tweet;
        if (index === 0 && mediaId) {
          post = { text: tweet, media: { media_ids: [mediaId] } };
        }
        thread.push(post);
      }

      logger.info(JSON.stringify(thread));

      await this.client.v2.tweetThread(thread);

      logger.info('Thread posted');
      return true;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  public async getCryptoTrends(): Promise<string[]> {
    try {
      const response = await this.client.v1.trendsByPlace(1); // WOEID 1 is for worldwide trends
      const trends = response[0].trends;
      const cryptoTrends = trends.filter(
        (trend) =>
          trend.name.includes('#crypto') || trend.name.includes('crypto'),
      );
      return cryptoTrends.map((trend) => trend.name);
    } catch (error) {
      console.error('Error fetching crypto trends:', error);
      return [];
    }
  }
  public async getTweetsByAccount(userName: string): Promise<any> {
    try {
      const clientRead = this.client.readOnly;
      const user = await clientRead.v2.userByUsername(userName);
      const userId = user.data.id;
      const tweets = await clientRead.v2.userTimeline(userId, {
        max_results: 10,
        'tweet.fields': ['created_at', 'text'],
      });

      const tweetTexts = tweets.data.data.map((tweet) => tweet.text);
      return tweetTexts;
    } catch (error) {
      console.error('Error fetching tweets:', error);
      return [];
    }
  }

  public async uploadMediaFromUrl(imageUrl: string): Promise<string | null> {
    logger.info('Uploading media from: ', imageUrl);
    const imageBuffer = await this.downloadImage(imageUrl);
    if (!imageBuffer) {
      return null;
    }
    try {
      const mimeType = 'image/png';
      const mediaId = await this.client.v1.uploadMedia(imageBuffer, {
        mimeType,
      });
      return mediaId;
    } catch (error) {
      console.error('Error uploading media:', error);
      return null;
    }
  }

  public async replyToTweet(
    originalTweetId: string,
    screenName: string,
  ): Promise<boolean> {
    try {
      const responseText = `Hola @${screenName}, thank you for you message!`;
      await this.client.v2.reply(responseText, originalTweetId);
      return true;
    } catch (error) {
      console.error('Error replying:', error);
      return false;
    }
  }
  public async getReplies(): Promise<any[]> {
    try {
      logger.info('getReplies');
      const userId = process.env.TWITTER_USER_ID;

      const now = new Date();
      const oneMinuteAgo = (new Date(now.getTime() - 60000));
/*
      const replies = await this.client.v2.search(`to:${process.env.TWITTER_USERNAME}`, {
        'tweet.fields': ['in_reply_to_user_id', 'author_id', 'created_at', 'id'],
      }); */

      const user = await this.client.v2.me();
      const tweets = await this.client.v2.userTimeline(user.data.id!, {
        start_time: oneMinuteAgo.toISOString(),
        'tweet.fields': ['in_reply_to_user_id', 'author_id', 'created_at'],
      });


            if (tweets.data.data.length == 0) {
              return [];
            }
      const replies = tweets.data.data.filter(tweet => tweet.in_reply_to_user_id === process.env.TWITTER_USER_ID);

     /*  const relevantReplies = replies.data.data.filter(
          (tweet: any) =>
            tweet.in_reply_to_user_id === userId &&
            (new Date(tweet.created_at)).getMilliseconds() >= oneMinuteAgo
      ); */


       return replies;

    } catch (error) {
      console.error('Error fetching replies:', error);
      return []
    }
  };

  private async downloadImage(imageUrl: string): Promise<any> {
    try {
      const response = await axios({
        url: imageUrl,
        responseType: 'arraybuffer',
      });
      return Buffer.from(response.data, 'binary');
    } catch (error) {
      console.error('Error downloading image:', error);
      return null;
    }
  }

  private splitIntoTweets(text: string, hashtags: string): string[] {
    const tweets = [];
    const maxTweetLength = 280;

    let currentTweet = '';
    const words = text.split(' ');

    for (const word of words) {
      if (
        (currentTweet + ' ' + word).length <=
        maxTweetLength - hashtags.length - 1
      ) {
        // -1 for the space before hashtags
        currentTweet += `${word} `;
      } else {
        break;
      }
    }

    // Add hashtags to the end of the first tweet
    currentTweet = (currentTweet + hashtags).trim();
    tweets.push(currentTweet);

    // Remaining text for the following tweets
    const remainingText = text
      .slice(currentTweet.length - hashtags.length)
      .trim();
    tweets.push(...this.splitIntoTweetsWithoutHashtags(remainingText));

    return tweets;
  }

  private splitIntoTweetsWithoutHashtags(text: string): string[] {
    const tweets = [];
    let currentTweet = '';

    for (const word of text.split(' ')) {
      if ((currentTweet + ' ' + word).length <= 280) {
        currentTweet += `${word} `;
      } else {
        tweets.push(currentTweet.trim());
        currentTweet = `${word} `;
      }
    }

    if (currentTweet.trim().length > 0) {
      tweets.push(currentTweet.trim());
    }

    return tweets;
  }

  private extractAndRemoveHashtags(text: string): {
    textWithoutHashtags: string;
    hashtags: string;
  } {
    const hashtagRegex = /#\w+/g;
    const hashtags = text.match(hashtagRegex) || [];
    const textWithoutHashtags = text.replace(hashtagRegex, '').trim();
    return { textWithoutHashtags, hashtags: hashtags.join(' ') };
  }
}
