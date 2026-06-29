import { Queue } from 'bullmq';
import IORedis from 'ioredis';
import { env } from './env.schema';

// Lazy-initialize Redis connection and queue so that importing this module
// doesn't immediately crash the app if Redis is unreachable.
let _connection: IORedis | undefined;
let _scoreQueue: Queue | undefined;

function getConnection(): IORedis {
  if (!_connection) {
    _connection = new IORedis(env.REDIS_URL, {
      maxRetriesPerRequest: null,
      lazyConnect: true,
    });
  }
  return _connection;
}

export const scoreQueue: Queue = new Proxy({} as Queue, {
  get(_target, prop, receiver) {
    if (!_scoreQueue) {
      _scoreQueue = new Queue('score-recalculation', {
        connection: getConnection() as any,
        defaultJobOptions: {
          attempts: 3,
          backoff: {
            type: 'exponential',
            delay: 1000,
          },
          removeOnComplete: true,
        },
      });
    }
    return Reflect.get(_scoreQueue, prop, receiver);
  },
});
