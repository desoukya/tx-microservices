import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client';
// import { PrismaClient as PrismaClientCustomer } from '../../../gql/customers/src/prisma/generated/client';
// import { PrismaClient as PrismaClientStore } from '../../../gql/stores/src/prisma/generated/client';
import { PrismaClient as PrismaClientCustomer } from '../../../gql/node_modules/@prisma/customers';
import { PrismaClient as PrismaClientStore } from '../../../gql/node_modules/@prisma/stores';

@Injectable()
export class PrismaConnector implements OnModuleInit {
  private serviceName;
  private prismaClients = {
    stores: PrismaClientStore,
    customers: PrismaClientCustomer,
  };
  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }
  async onModuleInit() {
    console.log('this.serviceName', this.serviceName);
    const prismaClient = new this.prismaClients[this.serviceName];
    await prismaClient.$connect();
  }
}
