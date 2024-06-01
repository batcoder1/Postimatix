import { injectable } from 'inversify';
import nodemailer from 'nodemailer';


import { CLOUDINARY, EMAIL } from '../../constants/constant';

export interface IVipChatRequest {
  telegramUser: string | undefined,
  stellarAccount: string | undefined,
  description: string| undefined,
  email: string
}
export interface IEmailService {
  sendEmail(user: any): void;
}

const header = `
<div style="display:flex;background: linear-gradient(0deg, rgba(219,219,219,1) 0%, rgba(255,255,255,1) 100%); border-radius: 10px 10px 0 0;">
  <div style="display:flex;justify-content:center;margin:0 auto;padding:10px 0px;">
    <div style="display:flex">
      <a href="https://web3sofware.net" target="_blank" rel="noreferrer" style="display:flex;width:87px;height:65px;background-size:contain;background-repeat:no-repeat;">
      <img src="${CLOUDINARY.imagesPath}w3s" alt="W3S Logo">
      </a>
    </div>
  </div>
</div>`;

const footer =`
<div style="display:flex;background:linear-gradient(180deg, rgba(219,219,219,1) 0%, rgba(255,255,255,1) 100%);padding:10px;border-radius: 0 0 10px 10px;">
  <div style="display:flex;justify-content:center;margin:0 auto;padding:16px 24px">
    <div style="display:flex">

    <div style="display:flex">
      <a href="https://twitter.com/web3_Software" target="_blank" rel="noreferrer" style="display:flex;background:url('${CLOUDINARY.imagesPath}twitter');width:17px;height:17px;background-size:contain;background-repeat:no-repeat;margin-right:32px"></a>
    </div>

    <div style="display:flex">
      <a href="mailto:info.web3software@gmail.com" rel="noreferrer" style="display:flex;background:url('${CLOUDINARY.imagesPath}/email');width:17px;height:17px;background-size:contain;background-repeat:no-repeat"></a>
    </div>
  </div>
</div>`;
const env = process.env.NODE_ENV;

@injectable()
export class EmailServices implements IEmailService {

  public sendEmail(customer: any): void {
    const mailer = this.getMailer();
    const mailOptions = {
      from: EMAIL.ACCOUNT,
      to: EMAIL.ACCOUNT,
      subject: `New customer`,
      html:`
      <div style="padding:2vh 20vw; margin-bottom: 0; border-radius:10px">
      <div style="border: 1px solid #f6f6f6; border-radius: 10px 10px 0 0;">
        ${header}
        <div style="background-color:#ffffff">
          <div style="padding:2vh 2vw;">

            <div style="padding:2vh 2vw;background-color:white">
              <p>Your referral code is:</p>
              <h3> ${customer.name}</h3>
              <h3> ${customer.surname}</h3>
              <h3> ${customer.company}</h3>
              <h3> ${customer.email}</h3>
              <h3> ${customer.phone}</h3>
              <h3> ${customer.comments}</h3>
              <p></p>
              <p>Best regards,</p>
              <p></p>
              <div style="font-weight:bold">
                <p>Web3Software</p>
              </div>
            </div>
            ${footer}
          </div>
        </div>
      </div>
      </div>
      `,
    };

      void mailer.sendMail(mailOptions);
  }



  private getMailer(): nodemailer.Transporter {
    return nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: EMAIL.ACCOUNT,
        pass: EMAIL.PASSWORD,
      },
    });
  }
}
