
import {  coinGeckoService, openAiService, xService } from '../../services';
import { AutoPostUseCase } from './autoPostUSeCase';

const autoPostUseCase = new AutoPostUseCase(openAiService, xService, coinGeckoService);


export { autoPostUseCase };
