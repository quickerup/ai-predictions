import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import { ZodError } from 'zod';

export default async function errorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: Error, request: FastifyRequest, reply: FastifyReply) => {
    request.log.error(error);

    // Handle data validation errors from Zod
    if (error instanceof ZodError) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Validation failed',
        issues: error.errors,
      });
    }

    // Handle errors with a statusCode property (e.g., from thrown errors)
    const statusCode = (error as any).statusCode;
    if (statusCode) {
      return reply.status(statusCode).send({
        statusCode,
        error: error.message,
      });
    }

    // Handle all other unexpected runtime errors
    return reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'An unexpected error occurred',
    });
  });
}
