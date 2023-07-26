import { NestFactory } from '@nestjs/core';

async function createServer(AppModule, PORT) {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}

export { createServer };
