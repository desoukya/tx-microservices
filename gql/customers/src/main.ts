import { CustomersModule } from './app.module';
import { createServer } from 'tx-shared-server';

createServer(CustomersModule, process.env.PORT);
