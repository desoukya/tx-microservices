import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/customers';

@Injectable()
export class PrismaConnector extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
