import { FastifyInstance } from 'fastify';
import {
  createPredictionHandler,
  getPredictionsHandler,
  resolvePredictionHandler,
} from './prediction.controller';

async function predictionRoutes(server: FastifyInstance) {
  // POST /api/v1/predictions - Create a new prediction (requires auth)
  server.post('/', {
    preHandler: [server.authenticate],
  }, createPredictionHandler);

  // GET /api/v1/predictions - List all predictions (public)
  server.get('/', getPredictionsHandler);

  // POST /api/v1/predictions/:id/resolve - Resolve a prediction (requires auth)
  server.post('/:id/resolve', {
    preHandler: [server.authenticate],
  }, resolvePredictionHandler);
}

export default predictionRoutes;
