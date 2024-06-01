
import {
  Result,
  Validator,
} from '../../../core/logic';
import { Entity } from '../../../core/domain';

interface WebhookProps {
  id: string;
  originalTweetId: string;
  user: string;
}

export class Webhook extends Entity<WebhookProps> {
  get id(): string {
    return this.props.id;
  }
  get originalTweetId(): string {
    return this.props.originalTweetId;
  }
  get user(): string {
    return this.props.user;
  }

  constructor(props: WebhookProps) {
    super(props);
  }

  // tslint:disable-next-line: function-name
  static New(props: WebhookProps): Result<Webhook> {
    const validator = Validator.notNullOrUndefinedBulk([
      { arg: props.id, argName: 'id' },
      { arg: props.originalTweetId, argName: 'originalTweetId' },
      { arg: props.user, argName: 'user' },
    ]);

    if (false === validator.succeeded) {
      return Result.Fail<Webhook>(validator.message);
    }

    const payment = new Webhook(props);
    return Result.OK<Webhook>(payment);
  }
}
