import prisma from '../../config/database';
import { CreatePredictionInput, ResolvePredictionInput } from './prediction.schema';
import { scoreQueue } from '../../config/queue';

export async function createPrediction(data: CreatePredictionInput) {
  return prisma.prediction.create({
    data: {
      claim: data.claim,
      probability: data.probability,
      eventDate: new Date(data.eventDate),
      predictorId: data.predictorId,
      categoryId: data.categoryId,
    },
    include: {
      predictor: true,
      category: true,
    },
  });
}

export async function getPredictions() {
  return prisma.prediction.findMany({
    include: {
      predictor: true,
      category: true,
      resolutionEdits: { orderBy: { createdAt: 'desc' }, take: 1 },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function resolvePrediction(predictionId: string, input: ResolvePredictionInput) {
  const prediction = await prisma.prediction.findUnique({
    where: { id: predictionId },
  });

  if (!prediction) {
    throw Object.assign(new Error('Prediction not found'), { statusCode: 404 });
  }

  const resolution = await prisma.resolutionEdit.create({
    data: {
      predictionId,
      outcome: input.outcome,
      sourceUrl: input.sourceUrl,
    },
  });

  // Enqueue a background job to recalculate the predictor's score
  try {
    await scoreQueue.add('recalculate', { predictorId: prediction.predictorId }, {
      removeOnComplete: true,
      removeOnFail: 100,
    });
  } catch (err) {
    // Log but don't fail the request if Redis/queue is unavailable
    console.error('Failed to enqueue score recalculation:', err);
  }

  return resolution;
}
