import { StoresModule } from './app.module';
import { createServer } from 'tx-shared-server';

console.log('process.env.POSTGRES_URL', process.env.POSTGRES_URL)
createServer(StoresModule, 3020);
