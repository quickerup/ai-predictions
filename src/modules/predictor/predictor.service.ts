import prisma from '../../config/database';
import { CreatePredictorInput } from './predictor.schema';

export async function createPredictor(data: CreatePredictorInput) {
  return prisma.predictor.create({
    data: {
      name: data.name,
      provider: data.provider,
      description: data.description,
    },
  });
}

export async function getPredictors() {
  return prisma.predictor.findMany({
    include: { score: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getPredictor(id: string) {
  return prisma.predictor.findUnique({
    where: { id },
    include: { score: true, predictions: true },
  });
}

export async function getPredictorScore(id: string) {
  return prisma.predictorScore.findUnique({
    where: { predictorId: id },
  });
}
