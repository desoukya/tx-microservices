import { Injectable, NestMiddleware } from '@nestjs/common';
// import * as axios from 'axios';
import { NextFunction, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
// import { ExtendedRequest } from '';
// import { i18NextService } from '';
import { AppContext } from 'tx-shared-interfaces';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: AppContext, _res: Response, next: NextFunction) {
    if (req?.body?.operationName === 'IntrospectionQuery') {
      console.log('Introspection Query');
      return next();
    }
    console.log('Inside ContextMiddleware!', req.body);
    // Assign a unique id to this request for logging purposes
    req.id = uuidv4();
    // Assign unleash to request
    req.isEnabled = (toggleName) => toggleName && true;
    // Create Connector Instances
    req.connectors = {
      // postgres: axios.default,
    };
    // Assign translations to request
    // req.t = language ? this.i18NService.getFixedT(language) : this.i18NService.getT();

    // Proceed with request
    next();
  }
}
