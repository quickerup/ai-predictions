import { FastifyReply, FastifyRequest } from 'fastify';
import { createAccount, getAccount } from './account.service';
import { createAccountSchema } from './account.schema';

export async function createAccountHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createAccountSchema.parse(request.body);
  const account = await createAccount(body.email);
  return reply.status(201).send(account);
}

export async function getAccountHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const account = await getAccount(request.account!.id);
  return reply.send(account);
}
