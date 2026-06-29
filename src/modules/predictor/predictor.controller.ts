import { FastifyReply, FastifyRequest } from 'fastify';
import { createPredictor, getPredictors, getPredictor, getPredictorScore } from './predictor.service';
import { createPredictorSchema, predictorParamsSchema } from './predictor.schema';

export async function createPredictorHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createPredictorSchema.parse(request.body);
  const predictor = await createPredictor(body);
  return reply.status(201).send(predictor);
}

export async function getPredictorsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const predictors = await getPredictors();
  return reply.send(predictors);
}

export async function getPredictorHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = predictorParamsSchema.parse(request.params);
  const predictor = await getPredictor(id);
  if (!predictor) {
    return reply.status(404).send({ error: 'Predictor not found' });
  }
  return reply.send(predictor);
}

export async function getPredictorScoreHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = predictorParamsSchema.parse(request.params);
  const score = await getPredictorScore(id);
  if (!score) {
    return reply.status(404).send({ error: 'Score not found for this predictor' });
  }
  return reply.send(score);
}
