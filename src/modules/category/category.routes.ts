import { FastifyInstance } from 'fastify';
import { createCategoryHandler, getCategoriesHandler } from './category.controller';

async function categoryRoutes(server: FastifyInstance) {
  // POST /api/v1/categories - Create a new category (requires auth)
  server.post('/', {
    preHandler: [server.authenticate],
  }, createCategoryHandler);

  // GET /api/v1/categories - List all top-level categories (public)
  server.get('/', getCategoriesHandler);
}

export default categoryRoutes;
