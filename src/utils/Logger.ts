import winston from 'winston';
import { messageBuilder } from './message.builder';
const myFormat = messageBuilder();
const timeZoned = () => {
  return new Date().toLocaleString('es-ES', {
      timeZone: 'Europe/Berlin'
  });
}
class Logger {
    private logger: winston.Logger;

    constructor() {
      this.logger = winston.createLogger({
        level: 'info',
        format: winston.format.combine(
          winston.format.timestamp({ format: timeZoned }),
          winston.format.colorize(),
            myFormat
        ),
        transports: [
            new winston.transports.Console()
        ]
    });
    }


  public error(...meta: any[]): void {
    this.logger.error('', meta);
  }

  public warn(...meta: any[]): void {
    this.logger.warn('', meta);
  }

  public info (...meta: any[]): void {
    this.logger.info('', meta);
  }

  public debug(...meta: any[]): void {
    this.logger.debug('', meta);
  }
}


export const logger = new Logger();


