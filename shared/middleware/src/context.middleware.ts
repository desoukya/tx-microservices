import { Injectable, NestMiddleware } from '@nestjs/common';
// import * as axios from 'axios';
import { NextFunction, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { AppContext } from 'tx-shared-interfaces';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor() {}
  async use(req: AppContext, _res: Response, next: NextFunction) {
    if (req?.body?.operationName === 'IntrospectionQuery') {
      return next();
    }
    // Assign a unique id to this request for logging purposes
    req.id = uuidv4();
    // Assign unleash to request
    req.isEnabled = (toggleName) => toggleName && true;
    // Create Connector Instances
    req.connectors = {
      // postgres: axios.default,
    };
    // Proceed with request
    next();
  }
}
