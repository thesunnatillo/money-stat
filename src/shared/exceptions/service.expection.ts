import { Logger } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { MyError } from '../utils/errors';

export class ServiceExceptions {
  static logger = new Logger('ServiceExceptions');

  static handle(e: any, serviceName: string, methodName: string) {
    switch (e.constructor) {
      case JsonWebTokenError: {
        return {
          errId: MyError.INVALID_TOKEN.errId,
          data: null,
        };
      }

      default: {
        if (e.errId) {
          return {
            errId: e.errId,
            data: null,
          };
        }
      }
    }

    this.logger.error(
      `Service: [${serviceName}], method: [${methodName}], Error: ${e}`,
    );
    throw e;
  }
}
