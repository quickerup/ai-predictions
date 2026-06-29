import { z } from 'zod';

export const createPredictionSchema = z.object({
  claim: z.string().min(1, 'Claim is required'),
  probability: z.number().min(0).max(1),
  eventDate: z.string().datetime(),
  predictorId: z.string().uuid(),
  categoryId: z.string().uuid(),
});

export type CreatePredictionInput = z.infer<typeof createPredictionSchema>;

export const resolvePredictionSchema = z.object({
  outcome: z.enum(['TRUE', 'FALSE', 'AMBIGUOUS']),
  sourceUrl: z.string().url(),
});

export type ResolvePredictionInput = z.infer<typeof resolvePredictionSchema>;

export const predictionParamsSchema = z.object({
  id: z.string().uuid(),
});
