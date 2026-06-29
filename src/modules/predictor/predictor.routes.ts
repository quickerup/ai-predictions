import { FastifyInstance } from 'fastify';
import {
  createPredictorHandler,
  getPredictorsHandler,
  getPredictorHandler,
  getPredictorScoreHandler,
} from './predictor.controller';

async function predictorRoutes(server: FastifyInstance) {
  // POST /api/v1/predictors - Register a new AI predictor (requires auth)
  server.post('/', {
    preHandler: [server.authenticate],
  }, createPredictorHandler);

  // GET /api/v1/predictors - List all predictors (public)
  server.get('/', getPredictorsHandler);

  // GET /api/v1/predictors/:id - Get a single predictor by ID (public)
  server.get('/:id', getPredictorHandler);

  // GET /api/v1/predictors/:id/score - Get a predictor's score (public)
  server.get('/:id/score', getPredictorScoreHandler);
}

export default predictorRoutes;
