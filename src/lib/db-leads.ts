import { PrismaClient } from '../node_modules/.prisma/client-leads';

const globalForPrismaLeads = globalThis as unknown as {
  prismaLeads: PrismaClient | undefined;
};

export const prismaLeads = globalForPrismaLeads.prismaLeads ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrismaLeads.prismaLeads = prismaLeads;
