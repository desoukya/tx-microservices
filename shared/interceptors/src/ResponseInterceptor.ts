import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
// import { isEmpty } from 'lodash';
// import { AppResponse } from 'tx-shared-interfaces';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor() {}
  public intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    // get the express request object
    // const req = context.switchToHttp().getRequest();
    // console.log('req.headers', req?.headers);

    // transform the response body
    return next.handle().pipe(
      map((body) => {
        // console.log('intercept body', body);
        // const data = Array.isArray(body) && !isEmpty(body) ? [...body] : body;
        // // const data = isNil(body) ? null : body;

        // const response: AppResponse = {
        //   extensions: { pagination: { page: 1, perPage: 100 } },
        //   data,
        // };

        // console.log('response', response);

        // return transformed response
        return body;
      }),
    );
  }
}
