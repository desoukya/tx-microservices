import { StoresModule } from './app.module';
import { createServer } from 'tx-shared-server';

createServer(StoresModule, process.env.PORT);
