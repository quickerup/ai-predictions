import { FastifyReply, FastifyRequest } from 'fastify';
import { createPrediction, getPredictions, resolvePrediction } from './prediction.service';
import {
  createPredictionSchema,
  resolvePredictionSchema,
  predictionParamsSchema,
} from './prediction.schema';

export async function createPredictionHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const body = createPredictionSchema.parse(request.body);
  const prediction = await createPrediction(body);
  return reply.status(201).send(prediction);
}

export async function getPredictionsHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const predictions = await getPredictions();
  return reply.send(predictions);
}

export async function resolvePredictionHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { id } = predictionParamsSchema.parse(request.params);
  const body = resolvePredictionSchema.parse(request.body);
  const resolution = await resolvePrediction(id, body);
  return reply.status(201).send(resolution);
}
