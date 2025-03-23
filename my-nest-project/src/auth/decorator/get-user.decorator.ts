import { createParamDecorator, ExecutionContext } from '@nestjs/common';

type RequestUser = { sub: number; email: string };

export const GetUser = createParamDecorator(
  (data: keyof RequestUser | undefined, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: RequestUser }>();

    if (data) {
      return request.user[data];
    }

    return request.user;
  },
);
