
import { logger } from '../../utils/Logger';
import { ExpressServer } from './ExpressServer';
import { Server } from 'http';

// eslint-disable-next-line no-shadow
enum ProcessClose {
  UncaughtException = 'uncaughtException',
  UnhandledRejection = 'unhandledRejection',
  SignalInterrupt = 'SIGINT',
  SignalTerminate = 'SIGTERM',
  Exit = 'exit',
}

export class Application {
  private app: ExpressServer;
  private server?: Server;
  constructor() {
    this.app = new ExpressServer();
  }

  public start() {
    this.server = this.app.build();
    this.handleExit()
  }

  private handleExit(): void {
    process.on(ProcessClose.UncaughtException, (err: Error) => {
      logger.error(
        `[Application][handleExit] Process error ${ProcessClose.UncaughtException}`,
        err,
      );
      this.shutdownGracefully(1);
    });

    process.on(
      ProcessClose.UnhandledRejection,
      // eslint-disable-next-line @typescript-eslint/ban-types
      (reason: {} | null | undefined) => {
        logger.error(
          `[Application][handleExit] Process error ${ProcessClose.UnhandledRejection}`,
          reason,
        );
        this.shutdownGracefully(2);
      },
    );

    process.on(ProcessClose.SignalInterrupt, () => {
      logger.info(
        `[Application][handleExit] Process exit ${ProcessClose.SignalInterrupt}`,
      );
      this.shutdownGracefully(128 + 2);
    });

    process.on(ProcessClose.SignalTerminate, () => {
      logger.info(
        `[Application][handleExit] Process exit ${ProcessClose.SignalTerminate}`,
      );
      this.shutdownGracefully(128 + 2);
    });

    process.on(ProcessClose.Exit, () => {
      logger.info(
        `[Application][handleExit] Process exit ${ProcessClose.Exit}`,
      );
    });
  }

  private shutdownGracefully(code: number): void {
    try {
      this.app.kill();
      process.exit(code);
    } catch (e) {
      logger.error(
        `[Application][shutdownGracefully] Error during shut down`,
        e,
      );
      process.exit(1);
    }
  }
}
