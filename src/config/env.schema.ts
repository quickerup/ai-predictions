import { z } from 'zod';
import { config } from 'dotenv';

// Load environment variables from the .env file into process.env
config();

// Define the expected schema for our environment variables
// Note: DATABASE_URL and REDIS_URL are connection strings, not standard URLs,
// so we validate them as non-empty strings rather than using z.string().url()
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  HOST: z.string().default('0.0.0.0'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  REDIS_URL: z.string().min(1, 'REDIS_URL is required'),
  API_KEY_SECRET: z.string().min(10, 'API_KEY_SECRET must be at least 10 characters long'),
});

export type EnvConfig = z.infer<typeof envSchema>;

// Validate process.env against the schema
const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('❌ Invalid environment variables detected on startup:');
  console.error(JSON.stringify(parsedEnv.error.format(), null, 2));
  process.exit(1);
}

// Export the parsed and strictly typed environment variables
export const env = parsedEnv.data;
