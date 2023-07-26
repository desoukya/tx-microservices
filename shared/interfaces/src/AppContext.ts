import { Request } from 'express';
import { AppConnectors } from './AppConnectors';

export type AppContext = Request & {
  isEnabled(toggleName: any): boolean;
  connectors?: AppConnectors;
  id: string;
};
