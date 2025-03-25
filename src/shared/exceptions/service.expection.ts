import { Logger } from '@nestjs/common';

export class ServiceExceptions {
  static logger = new Logger('ServiceExceptions');

  static handle(e: any, serviceName: string, methodName: string) {
    this.logger.error(
      `Service: [${serviceName}], method: [${methodName}], Error: ${e}`,
    );
    throw e;
  }
}
