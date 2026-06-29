import prisma from '../../config/database';
import { randomBytes } from 'crypto';

export async function createAccount(email: string) {
  const apiKey = randomBytes(32).toString('hex');

  return prisma.account.create({
    data: {
      email,
      apiKey,
    },
    select: {
      id: true,
      email: true,
      apiKey: true,
      createdAt: true,
    },
  });
}

export async function getAccount(id: string) {
  return prisma.account.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      createdAt: true,
    },
  });
}
