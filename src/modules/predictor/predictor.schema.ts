import { z } from 'zod';

export const createPredictorSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  provider: z.string().min(1, 'Provider is required'),
  description: z.string().optional(),
});

export type CreatePredictorInput = z.infer<typeof createPredictorSchema>;

export const predictorParamsSchema = z.object({
  id: z.string().uuid(),
});
