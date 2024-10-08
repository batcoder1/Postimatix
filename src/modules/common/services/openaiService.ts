import { inject, injectable } from 'inversify';
import OpenAI from 'openai';
import { TYPES } from '../../../infrastructure/ioc2/types';
import { logger } from '../../../utils/Logger';

export interface IOpenAiService {
  prompt(): Promise<any>;
  trendingPrompt(): Promise<any>
  generateImage(prompt: string): Promise<string | undefined>;
}

@injectable()
export class OpenAiService implements IOpenAiService {
  @inject(TYPES.OpenAi) private openAi!: OpenAI;

  public async prompt(): Promise<any> {
    try {
      const response = await this.openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are the community manager for web3software. Every day, you create engaging posts for the company's X account. Your tone is friendly and confident, designed to attract followers. Follow these guidelines for your posts:
    - Use up to 3 emoticons.
    - Format each sentence with a return line (\n).
    - Occasionally promote our website: web3software.net and out new project postimatix.com.

    - The content from web3software.net to include in your posts:
    Web3Software is dedicated to turning ideas into reality in the field of blockchain technology. The company specialises in customised Web3 project development at affordable costs, fund recovery, training courses, consultancy and smart contract auditing. Its mission is to promote innovation, efficiency and happiness in all its projects, ensuring exceptional results for its clients. Web3Software also distinguishes itself by offering continuous support and tailor-made solutions for every business need related to the blockchain world.

    - The content from Postimatix.com to include in your posts:
    Postimatix offers automated solutions for social media management. Its core product, Posti, is a bot that automates the creation and response to social media posts, allowing users to configure the bot in a few clicks. Posti can create daily posts with AI-generated images, respond to direct messages and follower comments in a user-friendly and efficient manner. The company focuses on simplifying social media management for its customers by providing 24/7 ongoing support.

    Each post should be around 600 words, with a clear structure, including an introduction, body, and conclusion. Use simple language and provide real-world examples to illustrate key points.

    - Add hashtags at the end.
    - Do not start with: Welcome to web3software!
    - Do not start with: "Ready"
    - Ensure minimum 600 characters per post
    - Ensure every sentence end with \n\n


    `,
          },
          {
            role: 'user',
            content: 'Create a post',
          },
        ],
        temperature: 1,
      });

      if (response.choices.length === 0) {
        return null;
      }

      const content: any = response.choices[0].message?.content;

      return content;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
  public async trendingPrompt(): Promise<any> {
    try {
      const response = await this.openAi.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are the community manager for web3software. Every day, you create engaging posts for the company's X account. Your tone is friendly and confident, designed to attract followers. Follow these guidelines for your posts:

    - Generate a series of blog posts about cryptocurrencies, focusing on Bitcoin and Ethereum and another trending tokens. Each post should be informative, engaging, and suitable for both beginners and enthusiasts. Cover a variety of topics including:

    1. Introduction to Bitcoin: Explain what Bitcoin is, its history, and how it works.
    2. Introduction to Ethereum: Explain what Ethereum is, its history, and how it works.
    3. The technology behind cryptocurrencies: Describe blockchain technology and its significance.
    4. How to buy and store Bitcoin and Ethereum: Provide a guide on purchasing and securely storing these cryptocurrencies.
    5. The future of Bitcoin and Ethereum: Discuss potential developments and their impacts on the market.
    6. Security and risks: Outline the security measures users should take and the risks involved in trading cryptocurrencies.
    7. Recent trends and news: Highlight the latest trends and news in the world of Bitcoin and Ethereum.

    Each post should be around 600 words, with a clear structure, including an introduction, body, and conclusion. Use simple language and provide real-world examples to illustrate key points.
    - Use up to 3 emoticons.
    - Add hashtags at the end.
    - Do not start with: Welcome to web3software!
    - Do not start with: "Ready"
    - Ensure minimum 500 characters per post
    - Ensure every sentence end with \n\n


    `,
          },
          {
            role: 'user',
            content: 'Create a post',
          },
        ],
        temperature: 1,
      });

      if (response.choices.length === 0) {
        return null;
      }

      const content: any = response.choices[0].message?.content;

      return content;
    } catch (error) {
      logger.error(error);
      return null;
    }
  }
  public getConnection(): OpenAI {
    return this.openAi;
  }

  public async generateImage(prompt: string): Promise<string | undefined> {
    try {
      const response = await this.openAi.images.generate({
        model: 'dall-e-3',
        prompt: `${prompt}. Ensure the image is generated without text`,
        n: 1, // Número de imágenes a generar
        size: '1024x1024',
      });

      return response.data[0].url;
    } catch (error) {
      console.error('Error generating the image:', error);
    }
  }
}
