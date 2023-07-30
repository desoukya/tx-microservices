import { OrderModule } from './app.module';
import { createServer } from 'tx-shared-server';

createServer(OrderModule, process.env.PORT);
