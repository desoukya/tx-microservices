import { InventoryModule } from './app.module';
import { createServer } from 'tx-shared-server';

createServer(InventoryModule, process.env.PORT);
