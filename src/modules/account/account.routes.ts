import { FastifyInstance } from 'fastify';
import { createAccountHandler, getAccountHandler } from './account.controller';

async function accountRoutes(server: FastifyInstance) {
  // POST /api/v1/accounts - Create a new account (public, no auth required)
  server.post('/', createAccountHandler);

  // GET /api/v1/accounts/me - Get current authenticated account
  server.get('/me', {
    preHandler: [server.authenticate],
  }, getAccountHandler);
}

export default accountRoutes;
