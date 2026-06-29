import { pino } from 'pino';
import { env } from '../config/env.schema';

// Configure Pino logger
// In development, we use pino-pretty for human-readable output
// In production, we output raw JSON for log aggregation services
export const loggerConfig = {
  level: env.NODE_ENV === 'development' ? 'debug' : 'info',
  transport: env.NODE_ENV === 'development' 
    ? {
        target: 'pino-pretty',
        options: {
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
};

export const logger = pino(loggerConfig);
