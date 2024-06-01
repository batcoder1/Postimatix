import 'mocha';

import { expect } from 'chai';

import { Entity } from '../../../core/domain/Entity';
import { Result } from '../../../core/logic';
import { ResultError } from '../../../tests/fixtures/Result';
import { WebhookMap } from '../mappers/WebhookMap';
import { Webhook } from './Webhook';

describe('Module: Webhook', () => {
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
  describe('Domain: Webhook', () => {
    it('Should create instance', () => {


      const props = {
        id: 'id',
        object: 'object',
        apiVersion: 'apiVersion',
        created: 1,
        data: dataEvent,
        livemode: false,
        pendingWebhooks: 1,
        request: 'request',
        type: 'type',
        nonExistent: 'non_existent'
      };

      const m = new Webhook(props);
      expect(m).to.be.an.instanceOf(Webhook);
      expect(m).to.be.an.instanceOf(Entity);

      expect(m).to.have.property('id', 'id');
      expect(m).to.have.property('object', 'object');
      expect(m).to.have.property('apiVersion', 'apiVersion');
      expect(m).to.have.property('created', 1);
      expect(m).to.have.property('request', 'request');
      expect(m).to.have.property('livemode', false);
      expect(m).to.have.property('pendingWebhooks', 1);
      expect(m).to.have.property('type', 'type');

      expect(m).to.not.have.property('non-existent');
    });

    describe('Response: Message', () => {
      let props: any;

      let dto: any;
      before(() => {
        props = {
          id: 'id',
        object: 'object',
        apiVersion: 'apiVersion',
        created: 1,
        data: dataEvent,
        livemode: false,
        pendingWebhooks: 1,
        request: 'request',
        type: 'type',
        };

        dto = {
          id: 'id',
          object: 'object',
          apiVersion: 'apiVersion',
          created: 1,
          data: dataEvent,
          livemode: false,
          pendingWebhooks: 1,
          request: 'request',
          type: 'type',
        };
      });

      it('Should Result.Ok', () => {
        const m = new Webhook(dto);
        const r = Result.OK<Webhook>(m);

        expect(r.getValue()).to.be.deep.equal(m);
      });

      it('Should Result.Fail', () => {
        const m = new Webhook(props);
        const r = Result.Fail<Webhook>(m);

        expect(() => {
          r.getValue();
        }).to.throw(Error, ResultError.ErrorValue);
        expect(r.errorValue()).to.be.deep.equal(m);
      });

      it('Result with validator. Ok', () => {
        const m = WebhookMap.toBackend(dto);
        const r = Webhook.New(m);
        expect(r.isSuccess).to.be.equals(true);
        expect(r.isFailure).to.be.equals(false);
      });

      it('Result with validator. False,', () => {
        const m = WebhookMap.toBackend(dto);
        m.id = undefined;
        const r = Webhook.New(m);
        expect(r.isFailure).to.be.equals(true);
        expect(r.isSuccess).to.be.equals(false);
      });

      it('Should not be equals', () => {
        const m = new Webhook(props);
        expect(m.equals()).to.be.equals(false);
      });

      it('Should result.Ok', () => {
        const m = new Webhook(props);
        expect(m.equals(m)).to.be.equals(true);
      });

      it('Should result.Fail', () => {
        const m = new Webhook(props);
        const r = new Webhook(dto);
        expect(m.equals(r)).to.be.equals(false);
      });
    });
  });
});
