import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Payload = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return request.payload;
  },
);
