import { z } from 'zod';

export const createAccountSchema = z.object({
  email: z.string().email(),
});

export type CreateAccountInput = z.infer<typeof createAccountSchema>;
