import { FastifyReply, FastifyRequest } from 'fastify';
import { createCategory, getCategories } from './category.service';
import { createCategorySchema } from './category.schema';

export async function createCategoryHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createCategorySchema.parse(request.body);
  const category = await createCategory(body);
  return reply.status(201).send(category);
}

export async function getCategoriesHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const categories = await getCategories();
  return reply.send(categories);
}
