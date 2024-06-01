import 'mocha';

import { expect } from 'chai';
import * as sinon from 'sinon';

import { Response } from '../../../../core/domain/UseCase';
import { Result, right, wrong } from '../../../../core/logic/Result';
import container from '../../../../infrastructure/ioc2/container.config';
import { Webhook } from '../../domain/Webhook';
import { IStripeRepository } from '../../repos/stripe.repository';
import { WebhookErrors } from './WebhookErrors';
import { WebhookUseCase } from './WebhookUseCase';

const TYPES = {
  PaymentMethodRepository: Symbol.for('PaymentMethodRepository'),
  GeoRepository: Symbol.for('GeoRepository'),
  BlockerRepository: Symbol.for('BlockerRepository'),
  StripeRepository: Symbol.for('StripeRepository'),
  CustomerRepository: Symbol.for('CustomerRepository'),
};
const sandbox = sinon.createSandbox();

describe('UseCase: WebhookUseCase', () => {
  let webhookUseCase: any;
  let stripeRepository: any;

  let invoiceFunc: any;


  afterEach(() => {
    sandbox.resetHistory();
    sandbox.restore();
  });

  beforeEach(() => {
    process.env.NODE_ENV = 'production';

    invoiceFunc = sandbox.stub();


    stripeRepository = {
      invoice: invoiceFunc,
    };


    container.rebind<IStripeRepository>(TYPES.StripeRepository).toConstantValue(stripeRepository);

    webhookUseCase = container.resolve<WebhookUseCase>(WebhookUseCase);
  });

  describe('Method: execute', () => {
    const objectEvent = {
      id: 'string',
      object: 'string',
      active: true,
      aggregateUsage: 'string',
      amount: 1,
      amountDecimal: 'string',
      billingScheme: 'string',
      created: 1,
      currency: 'string',
      interval: 'string',
      intervalCount: 1,
      livemode: true,
      metadata: 'metadata',
      nickname: 'string',
      product: 'string',
      tiersMode: 'string',
      transformUsage: 'string',
      trialPeriodDays: 'string',
      usageType: 'string',
    }
    const dataEvent ={
      object: objectEvent
    }
    const req = {
      id: 'id',
      object: 'object',
      created: 'created',
      api_version: 'api_version',
      data: dataEvent,
      livemode: 'livemode',
      pending_webhooks: 'pending_webhooks',
      request: 'request',
      type: 'type'
    };
    const webhookMap = {
      id: 'id',
      object: 'object',
      created: 'created',
      apiVersion: 'api_version',
      data: dataEvent,
      livemode: 'livemode',
      pendingWebhooks: 'pending_webhooks',
      request: 'request',
      type: 'type'
    };

    afterEach(() => {
      sandbox.resetHistory();
      sandbox.restore();
    });

    it('should return ok response', async () => {

      const res = {
        result: 'ok',
        data: {
          message: 'Webhook successfully completed',
          transaction: true,
        },
      };

      const resultExpected = right(Result.OK<any>(res)) as Response;

      invoiceFunc.withArgs(webhookMap).returns(true);

      const result = await webhookUseCase.execute(req);

      expect(invoiceFunc.callCount).to.be.equal(1);
      expect(result).to.deep.equal(resultExpected);
    });


    it('Error isFailure , should return UnknownError error', async () => {
      const error = Result.Fail<Webhook>('error');
      const resultExpected =wrong(new WebhookErrors.UnknownError('error' as string)) as Response;

      sandbox.stub(Webhook, 'New').returns(error);

      const result = await webhookUseCase.execute(req);

      expect(result).to.deep.equal(resultExpected);
    });
  });
});
