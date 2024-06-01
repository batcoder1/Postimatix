import { IEmailNotifier } from './email.services';
import 'mocha';

import { expect } from 'chai';
import * as sinon from 'sinon';
import container from '../ioc2/container.config';

import nodemailer from 'nodemailer';
import { EmailServices } from './emailServices';

const sandbox = sinon.createSandbox();

describe('UseCase: EmailNotifier', () => {
  let emailNotifier: any;

  let createTransportFunc: any;
  let sendMailFunc: any;
  let transporterFunc: any;

  afterEach(() => {
    sandbox.resetHistory();
    sandbox.restore();
  });

  beforeEach(() => {
    sendMailFunc = sandbox.stub().resolves();
    transporterFunc = { sendMail: sendMailFunc };
    createTransportFunc = sandbox
      .stub(nodemailer, 'createTransport')
      .returns(transporterFunc);

    emailNotifier = container.resolve<IEmailNotifier>(EmailServices);
  });

  describe('Method: notify', () => {
    const req = {
      id: 'fake_id',
      status: 'fake_status',
    };

    afterEach(() => {
      sandbox.resetHistory();
      sandbox.restore();
    });
    it('should call sendMail', async () => {
      const customer = { email: 'example@example.com', name: 'name',
        surname: 'surname', phone: 'phone', comments: 'comments'
       };

      await emailNotifier.notify(customer);
      expect(sendMailFunc.callCount).to.be.equal(1);
    });
  });
});
