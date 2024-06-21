import { inject, injectable } from 'inversify';
import Web3 from 'web3';
import {
  LOTTERIES_ABI,
  LOTTERIES_CONTRACT,
  LOTTERIES_CONTRACT_PRODUCTION,
} from '../../../constants/contracts';
import { TYPES } from '../../../infrastructure/ioc2/types';
import { logger } from '../../../utils/Logger';
const contract =
  process.env.NODE_ENV === 'production'
    ? LOTTERIES_CONTRACT_PRODUCTION
    : LOTTERIES_CONTRACT;
const OWNER_PK =process.env.OWNER_PK as string
const OWNER =process.env.OWNER as string

export interface ILotteriesService {
    sendPrize(minutes: number): Promise<boolean>;
}
@injectable()
export class LotteriesService implements ILotteriesService {
  private web3: Web3;
  private contract: any;

  constructor(@inject(TYPES.Web3) web3: Web3) {
    this.web3 = web3;
    this.contract = new this.web3.eth.Contract(LOTTERIES_ABI, contract);
  }


  public async sendPrize(minutes: number): Promise<boolean> {
    try {
      logger.info('sendPrize');

      const gasLimit = 3000000;
      const txData = this.contract.methods.sendPrizeToWinners(minutes).encodeABI();

      const chainId = await this.web3.eth.getChainId();
      const nonce = await this.web3.eth.getTransactionCount(OWNER);
      const gasPrice = this.web3.utils.toWei("0.01", 'gwei');

      const txParams = {
        nonce: this.web3.utils.toHex(nonce),
        gasPrice: gasPrice,
        gasLimit: gasLimit,
        to: contract,
        data: txData,
        chainId,
      };

      const signedTx = await this.signTransaction(txParams);
      const txHash = await this.sendSignedTransaction(signedTx);

      logger.info('sendPrize tx hash:', txHash);
      return true;
    } catch (error) {
      logger.error(error);
      return false;
    }
  }

  private async signTransaction(txParams: any): Promise<any> {
    const privateKey = Buffer.from(OWNER_PK, 'hex');
    return await this.web3.eth.accounts.signTransaction(txParams, privateKey);
  }

  private async sendSignedTransaction(signedTx: any): Promise<string> {

      const receipt = await this.web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
      );
      return receipt.transactionHash.toString();

  }
}
