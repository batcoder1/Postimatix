/**
 * InversifyJS need to use the type as identifiers at runtime.
 * We use symbols as identifiers but you can also use classes and or string literals.
 */
export const TYPES = {
  Controller: Symbol.for('Controller'),
  MainController: Symbol.for('Controller'),
  WebhookController: Symbol.for('WebhookController'),
  SystemController: Symbol.for('SystemController'),
  PingController: Symbol.for('PingController'),

  // UseCases
  PingUseCase: Symbol.for('PingUseCase'),
  WebhookUseCase: Symbol.for('WebhookUseCase'),
  SendPrizeUseCase: Symbol.for('SendPrizeUseCase'),
  CreateLotteryUseCase: Symbol.for('CreateLotteryUseCase'),
  AutoPostUseCase: Symbol.for('AutoPostUseCase'),

  // Services
  OpenAiService: Symbol.for('OpenAiService'),
  XService: Symbol.for('XService'),
  LotteryService: Symbol.for('LotteryService'),
  CronService: Symbol.for('CronService'),
  CoinGeckoService: Symbol.for('CoinGeckoService'),

  //Libraries
  Api: Symbol.for('Api'),
  TwitterApi: Symbol.for('TwitterApi'),
  Web3: Symbol.for('Web3'),
  OpenAi: Symbol.for('OpenAi'),

};
